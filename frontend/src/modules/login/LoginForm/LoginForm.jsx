import { signIn } from 'next-auth/react'
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';

import LoginFormView from './LoginForm.view';

const LoginForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();

    const handleLogin = async (formData) => {
        const res = await signIn('credentials', {
            username: formData.username,
            password: formData.password,
            callbackUrl: routes.dashboard,
            redirect: false
        });
        console.log(res?.error)
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => () => reset(), []);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
        <FormProvider {...{handleSubmit, register, handleLogin}}>
            <LoginFormView />
        </FormProvider>
    )
})

export default LoginForm;