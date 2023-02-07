import axios from 'axios';

import type { Token } from '@Types/user/token';
import type { User, UserInSession } from '@Types/user/user';

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
    }
}