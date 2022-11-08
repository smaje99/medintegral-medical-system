import { useRouter } from 'next/router';
import { useEffect } from 'react';

import useAuth from '@Auth/useAuth';

import routes from '@Helpers/routes';

const Route = ({ children }) => {
    const { isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn()) {
            router.push(routes.login);
        }
    }, []);

    return (
        <>
            { children }
        </>
    )
}

export default Route;