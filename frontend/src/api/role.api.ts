import axios from 'axios';

import type { Role } from '@Types/user/role';
import type { Token } from '@Types/user/token';

import { baseURL, headers } from './commons';

export default {
    async getAll(token: Token['accessToken']) {
        return axios.get<Role[]>('/role/', { baseURL, ...headers(token) })
    }
}