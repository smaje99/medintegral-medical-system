import type { Token } from '@/types/user/token';

const { NEXT_PUBLIC_API } = process.env;
export const baseURL = NEXT_PUBLIC_API;

export const headers = (token: Token['accessToken']) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
