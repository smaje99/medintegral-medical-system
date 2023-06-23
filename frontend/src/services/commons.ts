import { AxiosResponse } from 'axios';

import type { APIError } from '@/types/error';
import { isAxiosError } from '@/utils/axios-error';

export function withAxiosHandler<T extends object, Args extends unknown[]>(
  callback: (...args: Args) => Promise<AxiosResponse<T, unknown>>
): (...args: Args) => Promise<T> {
  return async function (...args) {
    try {
      const response = await callback(...args);
      return response.data;
    } catch (error) {
      if (isAxiosError<APIError>(error) && error.response) {
        throw new Error(error.response.data.detail);
      }

      throw error;
    }
  };
}
