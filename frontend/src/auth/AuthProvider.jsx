import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';

import routes from '@Helpers/routes';
import { login as loginService } from '@Services/login.service';
import { getMe } from '@Services/user.service';

import { getLocalRememberMe, saveLocalRememberMe, removeLocalRememberMe } from './rememberMe';
import { getLocalToken, saveLocalToken, removeLocalToken } from './token'

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);

    const login = async (userCredentials, redirectTo) => {
        const { data: { access_token: token } } = await loginService(userCredentials);

        saveLocalToken(token);
        saveLocalRememberMe(userCredentials.rememberMe);
        redirectTo && router.push(redirectTo)

        const currentUser = await getMe(token);
        setUser(currentUser);
    }

    const logout = () => {
        setUser(null);
        removeLocalToken();
        removeLocalRememberMe();
        router.push(routes.home);
    }

    const isLoggedIn = () => !!user;

    const contextValue = {
        user,
        login,
        logout,
        isLoggedIn
    }

    const checkRememberMe = async () => {
        if (getLocalRememberMe()) {
            try {
                const token = getLocalToken();
                const currentUser = await getMe(token);
                setUser(currentUser);
            } catch {}
        }
    }

    useEffect(() => { checkRememberMe() }, []);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;