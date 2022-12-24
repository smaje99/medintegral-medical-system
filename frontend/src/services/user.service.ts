import api from '@Api/user.api';

import type { APIError } from '@Types/error';
import type { User } from '@Types/user/user';

import { isAxiosError } from '@Utils/axios-error';

export const getMe = async (token: string): Promise<User> => {
    try {
        const response = await api.getMe(token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const createUser = async (
    dni: number, role_id: string, token: string
): Promise<User> => {
    try {
        const response = await api.create(dni, role_id, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}