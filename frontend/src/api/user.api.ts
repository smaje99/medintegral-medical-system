import axios from 'axios';

import type { Token } from '@Types/user/token';
import type {
    User, UserInSession, UserPasswordUpdate, UserUpdate
} from '@Types/user/user';

import { baseURL, headers } from './commons';

export default {
    async getMe(token: Token['accessToken']) {
        return axios.get<UserInSession>(`/user/me`, { baseURL, ...headers(token) });
    },
    async create(
        dni: User['dni'], role_id: User['role']['id'], token: Token['accessToken']
    ) {
        return axios.post<User>(`/user/`, { dni, role_id }, {
            baseURL, ...headers(token)
        });
    },
    async getAll(skip: number, limit: number, token: Token['accessToken']) {
        return axios.get<User[]>('/user/', {
            baseURL,
            params: { skip, limit },
            ...headers(token)
        });
    },
    async get(dni: User['dni'], token: Token['accessToken']) {
        return axios.get<User>(`/user/${dni}`, { baseURL, ...headers(token) });
    },
    async update(
        dni: User['dni'], user: UserUpdate, token: Token['accessToken']
    ) {
        return axios.put<User>(`/user/${dni}`, user, {
            baseURL, ...headers(token)
        });
    },
    async updatePassword(
        credentials: UserPasswordUpdate, token: Token['accessToken']
    ) {
        return axios.patch<User>(`/user/password`, credentials, {
            baseURL, ...headers(token)
        });
    },
    async disable(
        dni: User['dni'], disable: boolean, token: Token['accessToken']
) {
        return axios.patch<User>(`/user/disable/${dni}`, { disable }, {
            baseURL, ...headers(token)
        });
    },
    async search(dni: User['dni'], token: Token['accessToken']) {
        return axios.get<User[]>('/user/search', {
            baseURL, params: { dni }, ...headers(token)
        });
    }
}