import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import useAuth from '@Auth/useAuth';

import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';

import LoginFormView from './LoginForm.view';

const LoginForm = forwardRef((props, ref) => {
    const router = useRouter()
    const { handleSubmit, register, reset } = useForm();
    const { isLoggedIn, login } = useAuth();

    const handleLogin = async (formData) => {
        try {
            await login(formData, routes.home);
        } catch (error) {
            error?.response?.data?.detail &&
                toast.error(error.response.data.detail, getToastConfig());
        }
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => {
        isLoggedIn() && router.push(routes.home);

        return () => reset();
    }, []);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
        <FormProvider {...{handleSubmit, register, handleLogin}}>
            <LoginFormView />
        </FormProvider>
    )
})

export default LoginForm;