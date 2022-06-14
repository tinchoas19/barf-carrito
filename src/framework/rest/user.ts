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
import { useRouter } from 'next/router';


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
      if (data?.data?.success) {
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
      console.log(data)
      if (data?.data?.success) {
        toast.success(t('text-email-send'));
      } else {
        toast.error(t('error-email-send'));
      }
    },
    onError: (err) => {
      toast.error(t('error-email-send'));
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
  const router = useRouter()
  const { mutate, isLoading } = useMutation(client.users.register, {
    onSuccess: (data) => {
      if (data?.data?.token && data?.status_message === 'autenticado') {
        setToken(data?.data?.token);
        setAuthorized(true);
        closeModal();
        toast.success(t('text-register-success'))
        router.push('/')
        return;
      }
      if (!data?.data?.token) {
        data?.data?.errors.forEach((err:string) => 
          toast.error(t(err))
          )
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
  const router = useRouter()
  const { mutate, isLoading } = useMutation(client.users.changePassword, {
    onSuccess: (data) => {

      if (!data.data) {
        setFormError({
          oldPassword: data?.message ?? '',
        });
        toast.error(t('error-change-password'))
        return;
      }
      toast.success(t('password-successful'));
      router.push('/')
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setFormError(data);
      toast.error(t('error-change-password'))
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export function useForgotPassword() {
  //const { actions } = useStateMachine({ updateFormState });
  let [message, setMessage] = useState<string | null>(null);
  let [formError, setFormError] = useState<any>(null);
  const { t } = useTranslation();

  const { mutate, isLoading } = useMutation(client.users.forgotPassword, {
    onSuccess: (data) => {
      if (!data?.data?.success) {
        setFormError({
          email: data?.status_message ?? '',
        });
        toast.error(t('error-forget-password'));
        return;
      }
      toast.success(t('text-forget-password-success'));
      /* setMessage(data?.message!);
      actions.updateFormState({
        email: variables.email,
        step: 'Token',
      }); */
    },
  });

  return { mutate, isLoading, message, formError, setFormError, setMessage };
}

export function useResetPassword() {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { openModal } = useModalAction();
  const { actions } = useStateMachine({ updateFormState });

  return useMutation(client.users.resetPassword, {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(t('text-reset-password-success'));
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

