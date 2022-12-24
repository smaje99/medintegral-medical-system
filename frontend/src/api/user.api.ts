import axios from 'axios';

import type { User } from '@Types/user/user';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token: string) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    async getMe(token: string) {
        return axios.get<User>(`${baseURL}/user/me`, headers(token));
    },
    async create(dni: number, role_id: string, token: string) {
        return axios.post<User>(`${baseURL}/user/`, { dni, role_id }, headers(token));
    }
}