import axios from 'axios';

import type { Role } from '@Types/user/role';

import { baseURL } from './commons';

export default {
    async getAll() {
        return axios.get<Role[]>('/role/', { baseURL })
    }
}