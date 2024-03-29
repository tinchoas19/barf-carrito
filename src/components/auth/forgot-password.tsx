import * as yup from 'yup';
import type {
  ForgotPasswordUserInput,
} from '@/types';
import { Form } from '@/components/ui/forms/form';
import Input from '@/components/ui/forms/input';
import Button from '@/components/ui/button';

import {
  StateMachineProvider,
  createStore,
  GlobalState,
} from 'little-state-machine';
import { useModalAction } from '@/components/ui/modal/modal.context';
import {
  useForgotPassword,
} from '@/framework/user';
import { useTranslation } from 'next-i18next';
import Logo from '@/components/ui/logo';
import { ArrowNextIcon } from '../icons/arrow-next';

const emailFormValidation = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
});

export const initialState: GlobalState = {
  step: 'Email',
  email: '',
  password: '',
  token: '',
};
//@ts-ignore
createStore(initialState);

export const updateFormState = (
  state: typeof initialState,
  payload: {
    step: 'Email' | 'Token' | 'Password';
    [key: string]: string;
  }
) => {
  return {
    ...state,
    ...payload,
  };
};
export default function ForgotUserPassword() {
  const { t } = useTranslation('common');
  const { openModal } = useModalAction();
  const {mutate : changePassword} = useForgotPassword()


  function onSubmit({ email }) {
    changePassword({email})
  }

  return (
    <StateMachineProvider>
      <div className="flex h-full min-h-screen w-screen flex-col justify-center bg-light py-6 px-5 sm:p-8 md:h-auto md:min-h-0 md:max-w-[480px] md:rounded-xl">
        <div className="flex justify-center">
          <Logo />
        </div>
        <p className="mt-4 text-sm leading-relaxed text-center mb-7 text-body sm:mt-5 sm:mb-10 md:text-base">
          {t('forgot-password-helper')}
        </p>
        
        <Form<Pick<ForgotPasswordUserInput, 'email'>>
      onSubmit={onSubmit}
      validationSchema={emailFormValidation}
      className="text-left"
    >
      {({ register, formState: { errors } }) => (
        <>
          <Input
            variant="outline"
            label={t('text-email')}
            type="email"
            {...register('email')}
            error={t(errors.email?.message!)}
          />
          <Button
            type="submit"
            className="!mt-5 w-full text-sm tracking-[0.2px] lg:!mt-6"
          >
            {t('text-submit-email')}
            <ArrowNextIcon className="w-5" />
          </Button>
        </>
      )}
    </Form>

        <div className="relative flex flex-col items-center justify-center text-sm mt-9 mb-7 text-heading sm:mt-11 sm:mb-8">
          <hr className="w-full" />
          <span className="start-2/4 -ms-4 absolute -top-2.5 bg-light px-2">
            {t('text-or')}
          </span>
        </div>
        <div className="text-sm text-center text-body sm:text-base">
          {t('text-back-to')}{' '}
          <button
            onClick={() => openModal('LOGIN_VIEW')}
            className="font-semibold underline transition-colors duration-200 ms-1 text-accent hover:text-accent-hover hover:no-underline focus:text-accent-hover focus:no-underline focus:outline-none"
          >
            {t('text-login')}
          </button>
        </div>
      </div>
    </StateMachineProvider>
  );
}
