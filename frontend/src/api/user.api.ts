import axios from 'axios';

import type { Token } from '@/types/user/token';
import type {
  User,
  UserInSession,
  UserPasswordUpdate,
  UserUpdate,
} from '@/types/user/user';

import { baseURL, headers } from './commons';

export async function getMe(token: Token['accessToken']) {
  return axios.get<UserInSession>('/user/me', { baseURL, ...headers(token) });
}

export async function create(
  dni: User['dni'],
  roleId: User['role']['id'],
  token: Token['accessToken']
) {
  return axios.post<User>(
    '/user/',
    { dni, roleId },
    {
      baseURL,
      ...headers(token),
    }
  );
}

export async function getAll(skip: number, limit: number, token: Token['accessToken']) {
  return axios.get<User[]>('/user/', {
    baseURL,
    params: { skip, limit },
    ...headers(token),
  });
}

export async function get(dni: User['dni'], token: Token['accessToken']) {
  return axios.get<User>(`/user/${dni}`, { baseURL, ...headers(token) });
}

export async function update(
  dni: User['dni'],
  user: UserUpdate,
  token: Token['accessToken']
) {
  return axios.put<User>(`/user/${dni}`, user, {
    baseURL,
    ...headers(token),
  });
}

export async function updatePassword(
  credentials: UserPasswordUpdate,
  token: Token['accessToken']
) {
  return axios.patch<User>('/user/password', credentials, {
    baseURL,
    ...headers(token),
  });
}

export async function disable(
  dni: User['dni'],
  isDisable: boolean,
  token: Token['accessToken']
) {
  return axios.patch<User>(
    `/user/disable/${dni}`,
    { disable: isDisable },
    {
      baseURL,
      ...headers(token),
    }
  );
}

export async function search(dni: User['dni'], token: Token['accessToken']) {
  return axios.get<User[]>('/user/search', {
    baseURL,
    params: { dni },
    ...headers(token),
  });
}
