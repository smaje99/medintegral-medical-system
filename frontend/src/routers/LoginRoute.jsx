import { useRouter } from 'next/router';

import useAuth from '@Auth/useAuth';
import routes from '@Helpers/routes';


const LoginRoute = ({ children }) => {
    const router = useRouter();
    const { isLoggedIn } = useAuth();

    if (isLoggedIn()) {
        router.push(routes.home);
    }

    return children;
}

export default LoginRoute;