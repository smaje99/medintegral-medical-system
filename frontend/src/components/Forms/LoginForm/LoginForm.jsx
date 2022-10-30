import { useRouter } from 'next/router';
import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import { login, testToken } from '@Services/login.service';
import { getLocalRememberMe, saveLocalRememberMe } from '@Utils/rememberMe'
import { getLocalToken, saveLocalToken } from '@Utils/token'

import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';

import LoginFormView from './LoginForm.view';

const LoginForm = forwardRef((props, ref) => {
    const router = useRouter()
    const { handleSubmit, register, reset } = useForm();

    const handleLogin = async (formData) => {
        try {
            const { data: { access_token: token } } = await login(formData);

            saveLocalToken(token);
            saveLocalRememberMe(formData.rememberMe);
            reset();
            router.push(routes.home);
        } catch (error) {
            const { response: { data: { detail } } } = error;
            toast.error(detail, getToastConfig());
        }
    }

    const checkRememberMe = async () => {
        if (getLocalRememberMe()) {
            try {
                const token = getLocalToken();
                await testToken(token);
                router.push(routes.home);
            } catch (error) {}
        }
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => {
        checkRememberMe()

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