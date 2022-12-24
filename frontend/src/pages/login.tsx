import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AuthLayout } from '@Components/layouts';
import { Spinner } from '@Components/loaders';
import { LoginView } from '@Modules/login';

import routes from '@Helpers/routes';

const Login = () => {
    const router = useRouter();
    const { data: session, status } = useSession();

    if (status === 'unauthenticated') {
        return <LoginView />
    }

    if (session) {
        router.push(routes.dashboard.home);
    }

    return <Spinner full />
}

Login.getLayout = (page: JSX.Element) => (
    <AuthLayout title="Iniciar sesión">
        {page}
    </AuthLayout>
)

export default Login;