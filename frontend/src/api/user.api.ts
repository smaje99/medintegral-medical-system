import axios from 'axios';

import type { Token } from '@Types/user/token';
import type { User, UserInSession, UserPasswordUpdate, UserUpdate } from '@Types/user/user';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token: Token['accessToken']) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    async getMe(token: Token['accessToken']) {
        return axios.get<UserInSession>(`${baseURL}/user/me`, headers(token));
    },
    async create(dni: User['dni'], role_id: User['role']['id'], token: Token['accessToken']) {
        return axios.post<User>(`${baseURL}/user/`, { dni, role_id }, headers(token));
    },
    async getAll(skip: number, limit: number, token: Token['accessToken']) {
        return axios.get<User[]>(`${baseURL}/user/?skip=${skip}&limit=${limit}`, headers(token));
    },
    async get(dni: User['dni'], token: Token['accessToken']) {
        return axios.get<User>(`${baseURL}/user/${dni}`, headers(token));
    },
    async update(dni: User['dni'], user: UserUpdate, token: Token['accessToken']) {
        return axios.put<User>(`${baseURL}/user/${dni}`, user, headers(token));
    },
    async updatePassword(credentials: UserPasswordUpdate, token: Token['accessToken']) {
        return axios.patch<User>(`${baseURL}/user/password`, credentials, headers(token));
    }
}