import axios from 'axios';

import type { Role } from '@/types/user/role';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

export async function getAll(token: Token['accessToken']) {
  return axios.get<Role[]>('/role/', { baseURL, ...headers(token) });
}
