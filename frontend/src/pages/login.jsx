import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AuthLayout } from '@Components/layouts';
import { LoginView } from '@Modules/login';

import routes from '@Helpers/routes';

const Login = () => {
    const router = useRouter();
    const { data: session } = useSession();

    if (session) router.push(routes.dashboard);

    return <LoginView />
}

Login.getLayout = (page) => (
    <AuthLayout title="Iniciar sesión">
        {page}
    </AuthLayout>
)

export default Login;