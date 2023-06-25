import axios from 'axios';

import type { Message } from '@/types/message';
import type { Token } from '@/types/user/token';
import type { UserInSession } from '@/types/user/user';

import { baseURL, headers } from './commons';

export async function login(username: string, password: string) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  return axios.post<Token>(`${baseURL}/login/access-token`, params);
}

export async function testToken(token: string) {
  return axios.post<UserInSession>(`${baseURL}/login/test-token`, {}, headers(token));
}

export async function resetPassword(token: string, new_password: string) {
  return axios.patch<Message>(`${baseURL}/reset-password`, {
    token,
    new_password,
  });
}

export async function passwordRecovery(email: string) {
  return axios.post<Message>(`${baseURL}/password-recovery/${email}`, {});
}
