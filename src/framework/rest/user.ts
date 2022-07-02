import { useModalAction } from '@/components/ui/modal/modal.context';
import { useTranslation } from 'next-i18next';
import {
  useInfiniteQuery,
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
import { RegisterUserInput, ChangePasswordUserInput } from '@/types';
import { useStateMachine } from 'little-state-machine';
import {
  initialState,
  updateFormState,
} from '@/components/auth/forgot-password';
import { clearCheckoutAtom } from '@/store/checkout';
import { Router, useRouter } from 'next/router';
import { useCart } from '@/store/quick-cart/cart.context';
import { ROUTES } from '@/lib/routes';
import { data } from '../static/ordersAndStock';

export function useUser() {
  const [isAuthorized] = useAtom(authorizationAtom);
  const { data, isLoading, error, refetch } = useQuery(
    [API_ENDPOINTS.USERS_ME],
    client.users.me,
    {
      enabled: isAuthorized,
      onError: (err) => {},
    }
  );
  return { me: data, isLoading, error, isAuthorized, refetch };
}

export const useDeleteAddress = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const router = useRouter();
  const {refetch} = useUser()
  return useMutation(client.users.deleteAddress, {
    onSettled: async (data) => {
      try {
      queryClient.invalidateQueries('/me');
      if (data.status === 200) {
        if (data.data.success) {
          refetch()
          toast.success(t('successfully-address-deleted'));
          return;
        }
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};

      toast.error(data?.message);
    },
  });
};

export const useUpdateUser = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { closeModal } = useModalAction();
  const {refetch} = useUser()
  return useMutation(client.users.update, {
    onSettled: async (data) => {
      try {
        console.log(data)
      queryClient.invalidateQueries('/me');
      if (data.status === 200) {
        if (data?.data?.success && data.data.errors?.length === 0) {
          if (data.data.inserted) {
            refetch()
            toast.success(t('profile-update-successful'));
            closeModal();
          } else {
            toast.success(t('profile-update-successful'));
            closeModal();
          }
        } else {
          data?.data.errors.map((err) => {
            toast.error(err);
          })
        }
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error) => {
      toast.error(t('error-something-wrong'));
    },
  });
};

export const useContact = () => {
  const { t } = useTranslation('common');

  return useMutation(client.users.contactUs, {
    onSuccess: (data) => {
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
  const router = useRouter();

  const { mutate, isLoading } = useMutation(client.users.login, {
    onSettled: async (res) => {
      try {
      if (res.status === 200) {
        if (res?.data.token === '' || res?.data.token === null) {
          if (res?.data.errors) {
            res?.data.errors.forEach((err) => {
              toast.error(err);
            });
          } else {
            setServerError('error-credential-wrong');
          }
          return;
        }
        setToken(res?.data.token);
        setAuthorized(true);
        await router.push('/').then(() => {
          closeModal();
        });
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error: Error) => {},
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
  const router = useRouter();
  const { mutate, isLoading } = useMutation(client.users.register, {
    onSettled: async (data) => {
      try {
      if (data.status === 200) {
        if (data?.data?.token && data?.status_message === 'autenticado') {
          setToken(data?.data?.token);
          setAuthorized(true);
          await router.push('/').then(() => {
            closeModal();
            toast.success(t('text-register-success'));
          });
          return;
        }
        if (!data?.data?.token) {
          data?.data?.errors.forEach((err: string) => toast.error(t(err)));
        }
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
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
  const { items, clearItemFromCart } = useCart();
  const router = useRouter()
  const mutate = function () {
    router.push(ROUTES.HOME).then(() => {
      items.forEach((item) => {
        if (item.isPersonalized) clearItemFromCart(item.id);
      });
      setToken('');
      setAuthorized(false);
      resetCheckout();
      openModal('LOGIN_VIEW');
    })
  };
  return { mutate };
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
  const router = useRouter();
  const { mutate, isLoading } = useMutation(client.users.changePassword, {
    onSettled: async (data) => {
      try {
      if (data.status === 200) {
        if (!data.data?.success) {
          setFormError({
            oldPassword: data?.message ?? '',
          });
          toast.error(t('error-change-password'));
          return;
        }
        await router.push('/').then(() => {
          toast.success(t('password-successful'));
        });
      } else toast.error(t('error-something-wrong'));
    } catch {
      toast.error(t('error-something-wrong'));
    }
    },
    onError: (error) => {
      const {
        response: { data },
      }: any = error ?? {};
      setFormError(data);
      toast.error(t('error-change-password'));
    },
  });

  return { mutate, isLoading, formError, setFormError };
}

export function useForgotPassword() {
  //const { actions } = useStateMachine({ updateFormState });
  let [message, setMessage] = useState<string | null>(null);
  let [formError, setFormError] = useState<any>(null);
  const { t } = useTranslation();
  const router = useRouter()
  const { openModal } = useModalAction();

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
        openModal('LOGIN_VIEW');
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
