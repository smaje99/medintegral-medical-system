import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { AuthLayout } from '@Components/layouts';
import { LoginView } from '@Modules/login';

import getToastConfig from '@Helpers/toast.config';

const Login = () => {
    const router = useRouter();

    const handleError = () => {
        const error = router.query?.error;

        if (error && error === 'SessionRequired') {
            toast.warning(
                'Debe de iniciar sesión primero para poder acceder',
                getToastConfig()
            )
        }
    }

    useEffect(handleError, [router]);

    return <LoginView />
}

Login.getLayout = (page) => (
    <AuthLayout title="Iniciar sesión">
        {page}
    </AuthLayout>
)

export default Login;