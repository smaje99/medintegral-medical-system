import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react'
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';

import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';

import LoginFormView from './LoginForm.view';
import type { LoginFormValues } from '../Login.types';

const LoginForm = forwardRef((props, ref) => {
    const formMethods = useForm<LoginFormValues>();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleError = (error: string) => {
        setLoading(false);
        toast.error(error, getToastConfig());
    }

    const handleLogin = async (formData: LoginFormValues) => {
        setLoading(true);
        const res = await signIn('credentials', {
            ...formData,
            callbackUrl: router.query?.callbackUrl as string ?? routes.dashboard.home,
            redirect: false
        });

        if (res?.error) {
            handleError(res.error);
        } else if (res.url) {
            router.push(res.url);
        }
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => () => formMethods.reset(), []);

    useImperativeHandle(ref, () => ({ reset: formMethods.reset }), []);

    return (
        <FormProvider {...formMethods}>
            <LoginFormView loading={loading} handleLogin={handleLogin} />
        </FormProvider>
    )
})

export default LoginForm;