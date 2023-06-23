import * as api from '@/api/login.api';
import type { Message } from '@/types/message';
import type { Token } from '@/types/user/token';
import type { User, UserInSession, UserLogin } from '@/types/user/user';

import { withAxiosHandler } from './commons';

export const login: (credentials: UserLogin) => Promise<Token> = withAxiosHandler(
  ({ username, password }) => api.login(username, password)
);

export const testToken: (token: Token['accessToken']) => Promise<UserInSession> =
  withAxiosHandler(async (token) => api.testToken(token));

export const resetPassword: (
  token: Token['accessToken'],
  newPassword: string
) => Promise<Message> = withAxiosHandler(async (token, newPassword) =>
  api.resetPassword(token, newPassword)
);

export const passwordRecovery: (email: User['person']['email']) => Promise<Message> =
  withAxiosHandler(async (email) => api.passwordRecovery(email));
