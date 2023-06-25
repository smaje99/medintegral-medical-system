import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import routes from '@/helpers/routes';
import getToastConfig from '@/helpers/toast.config';
import type { UserLogin } from '@/types/user/user';

import LoginFormView from './LoginForm.view';

export interface LoginFormValues extends UserLogin {
  readonly rememberMe: boolean;
}

const LoginForm = forwardRef(function LoginFormComponent(props, ref) {
  const formMethods = useForm<LoginFormValues>();
  const router = useRouter();

  const handleError = (error: string) => {
    toast.error(error, getToastConfig());
  };

  const handleLogin = async (formData: LoginFormValues) => {
    const res = await signIn('credentials', {
      ...formData,
      callbackUrl: (router.query?.callbackUrl as string) ?? routes.dashboard.home,
      redirect: false,
    });

    if (res?.error) {
      handleError(res.error);
    } else if (res.url) {
      router.push(res.url);
    }
  };

  /* A cleanup function that is called when the form is unmounted. */
  useEffect(() => () => formMethods.reset(), [formMethods]);

  useImperativeHandle(ref, () => ({ reset: formMethods.reset }), [formMethods.reset]);

  return (
    <FormProvider {...formMethods}>
      <LoginFormView handleLogin={handleLogin} />
    </FormProvider>
  );
});

export default LoginForm;
