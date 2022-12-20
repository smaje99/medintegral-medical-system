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

const LoginForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleError = (error) => {
        setLoading(false);
        toast.error(error, getToastConfig());
    }

    const handleLogin = async (formData) => {
        setLoading(true);
        const res = await signIn('credentials', {
            ...formData,
            callbackUrl: router.query?.callbackUrl ?? routes.dashboard(),
            redirect: false
        });

        if (res?.error) {
            handleError(res.error);
        } else if (res.url) {
            router.push(res.url);
        }
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => () => reset(), []);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
        <FormProvider {...{handleSubmit, register, handleLogin}}>
            <LoginFormView loading={loading} />
        </FormProvider>
    )
})

export default LoginForm;