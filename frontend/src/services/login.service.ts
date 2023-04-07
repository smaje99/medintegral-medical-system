import api from '@Api/login.api';
import type { Message } from '@Types/message';
import type { Token } from '@Types/user/token';
import type { User, UserInSession, UserLogin } from '@Types/user/user';

import { withAxiosHandler } from './commons';

export const login: (credentials: UserLogin) => Promise<Token> = withAxiosHandler(
    ({ username, password }) => api.login(username, password)
);

export const testToken: (
    token: Token['accessToken']
) => Promise<UserInSession> = withAxiosHandler(
    async (token) => api.testToken(token)
);

export const resetPassword: (
    token: Token['accessToken'], newPassword: string
) => Promise<Message> = withAxiosHandler(
    async (token, newPassword) => api.resetPassword(token, newPassword)
);

export const passwordRecovery: (
    email: User['person']['email']
) => Promise<Message> = withAxiosHandler(
    async (email) => api.passwordRecovery(email)
);