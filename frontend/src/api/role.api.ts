import axios from 'axios';

import type { Role } from '@Types/user/role';

const { NEXT_PUBLIC_API: baseURL } = process.env;

export default {
    async getAll() {
        return axios.get<Role[]>(`${baseURL}/role/`)
    }
}