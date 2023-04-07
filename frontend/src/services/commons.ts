import type { APIError } from '@Types/error';
import { isAxiosError } from '@Utils/axios-error';
import { AxiosResponse } from 'axios';

export function withAxiosHandler<T extends object, Args extends any[]>(
    callback: (...args: Args) => Promise<AxiosResponse<T, any>>
): (...args: Args) => Promise<T> {
    return async function(...args) {
        try {
            const response = await callback(...args);
            return response.data;
        } catch (error) {
            if (isAxiosError<APIError>(error) && error.response) {
                throw new Error(error.response.data.detail);
            }

            throw error;
        }
    }
}