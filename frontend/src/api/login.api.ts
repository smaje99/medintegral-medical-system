import axios from 'axios';

import type { Message } from '@Types/message';
import type { Token } from '@Types/user/token';
import type { UserInSession } from '@Types/user/user';

import { baseURL, headers } from './commons';

export default {
    async login(username: string, password: string) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return axios.post<Token>(`${baseURL}/login/access-token`, params);
    },
    async testToken(token: string) {
        return axios.post<UserInSession>(
            `${baseURL}/login/test-token`, {}, headers(token)
        );
    },
    async resetPassword(token: string, new_password: string) {
        return axios.patch<Message>(`${baseURL}/reset-password`, {
            token, new_password
        });
    },
    async passwordRecovery(email: string) {
        return axios.post<Message>(`${baseURL}/password-recovery/${email}`, {});
    }
}