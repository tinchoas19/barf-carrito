import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from 'react-query';
import { toast } from 'react-toastify';
import client from './client';
import { authorizationAtom } from '@/store/authorization-atom';
import { useAtom } from 'jotai';
import { useToken } from '@/lib/hooks/use-token';
import { API_ENDPOINTS } from './client/api-endpoints';
import { useState } from 'react';
import {
  RegisterUserInput,
  ChangePasswordUserInput,
} from '@/types';
import { initialOtpState, optAtom } from '@/components/otp/atom';
import { useStateMachine } from 'little-state-machine';
import {
  initialState,
  updateFormState,
} from '@/components/auth/forgot-password';
import { clearCheckoutAtom } from '@/store/checkout';


export function useUser() {
  const [isAuthorized] = useAtom(authorizationAtom);
  const { data, isLoading, error } = useQuery(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
      onError: (err) => {
        console.log(err);
      },
    }
  );
  //TODO: do some improvement here
  return { me: data, isLoading, error, isAuthorized };
}

export const useDeleteAddress = () => {
  const { closeModal } = useModalAction();
  const queryClient = useQueryClient();
  return useMutation(client.users.deleteAddress, {
    onSuccess: (data) => {
      if (data) {
        toast.success('successfully-address-deleted');
        closeModal();
        return;
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries('/me');
    },
  });
};

export const useUpdateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  return useMutation(client.users.update, {
    onSuccess: (data) => {
      if (data?.id) {
        toast.success(t('profile-update-successful'));
        closeModal();
      }
    },
    onError: (error) => {
      toast.error(t('error-something-wrong'));
    },
    onSettled: () => {
      queryClient.invalidateQueries('/me');
    },
  });
};

export const useContact = () => {
  const { t } = useTranslation('common');

  return useMutation(client.users.contactUs, {
    onSuccess: (data) => {
      if (data.success) {
        toast.success(t(data.message));
      } else {
        toast.error(t(data.message));
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

export function useLogin() {
  const { t } = useTranslation('common');
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  const { setToken } = useToken();
  let [serverError, setServerError] = useState<string | null>(null);

  const { mutate, isLoading } = useMutation(client.users.login, {
    onSuccess: (res) => {
      console.log(res)
      if (res?.data.token === '') {
        setServerError('error-credential-wrong');
        return;
      }
      setToken(res?.data.token);
      setAuthorized(true);
      closeModal();
    },
    onError: (error: Error) => {
      console.log(error.message);
    },
  });

  return { mutate, isLoading, serverError, setServerError };
}

export function useRegister() {
  const { t } = useTranslation('common');
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const { closeModal } = useModalAction();
  let [formError, setFormError] = useState<Partial<RegisterUserInput> | null>(
    null
  );

  const { mutate, isLoading } = useMutation(client.users.register, {
    onSuccess: (data) => {
      if (data?.token && data?.permissions?.length) {
        setToken(data?.token);
        setAuthorized(true);
        closeModal();
        return;
      }
      if (!data.token) {
        toast.error(t('error-credential-wrong'));
      }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      setFormError(data);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export function useLogout() {
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const [_r, resetCheckout] = useAtom(clearCheckoutAtom);
  const { openModal } = useModalAction();
  const mutate = function () {
    setToken('');
    setAuthorized(false);
    resetCheckout();
    openModal('LOGIN_VIEW');
  }
  return {mutate}
/*   const queryClient = useQueryClient();
  const { setToken } = useToken();
  const [_, setAuthorized] = useAtom(authorizationAtom);
  const [_r, resetCheckout] = useAtom(clearCheckoutAtom);

  return useMutation(client.users.logout, {
    onSuccess: (data) => {
      if (data) {
        setToken('');
        setAuthorized(false);
        resetCheckout();
      }
    },
    onSettled: () => {
      queryClient.clear();
    },
  }); */
}

export function useChangePassword() {
  const { t } = useTranslation('common');
  let [formError, setFormError] =
    useState<Partial<ChangePasswordUserInput> | null>(null);

  const { mutate, isLoading } = useMutation(client.users.changePassword, {
    onSuccess: (data) => {
      if (!data.success) {
        setFormError({
          oldPassword: data?.message ?? '',
        });
        return;
      }
      toast.success(t('password-successful'));
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setFormError(data);
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export function useForgotPassword() {
  const { actions } = useStateMachine({ updateFormState });
  let [message, setMessage] = useState<string | null>(null);
  let [formError, setFormError] = useState<any>(null);
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(client.users.forgotPassword, {
    onSuccess: (data, variables) => {
      if (!data.success) {
        setFormError({
          email: data?.message ?? '',
        });
        return;
      }
      setMessage(data?.message!);
      actions.updateFormState({
        email: variables.email,
        step: 'Token',
      });
    },
  });

  return { mutate, isLoading, message, formError, setFormError, setMessage };
}

export function useResetPassword() {
  const queryClient = useQueryClient();
  const { openModal } = useModalAction();
  const { actions } = useStateMachine({ updateFormState });

  return useMutation(client.users.resetPassword, {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success('Successfully Reset Password!');
        actions.updateFormState({
          ...initialState,
        });
        openModal('LOGIN_VIEW');
        return;
      }
    },
    onSettled: () => {
      queryClient.clear();
    },
  });
}

