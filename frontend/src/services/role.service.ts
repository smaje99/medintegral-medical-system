import api from '@Api/role.api';

import type { APIError } from '@Types/error';
import type { Role } from '@Types/user/role';

import { isAxiosError } from '@Utils/axios-error';

export const getAllOfRoles = async (): Promise<Role[]> => {
    try {
        const response = await api.getAll();
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}