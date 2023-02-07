import api from '@Api/user.api';

import type { APIError } from '@Types/error';
import { Token } from '@Types/user/token';
import type { User, UserInSession } from '@Types/user/user';

import { isAxiosError } from '@Utils/axios-error';

export const getMe = async (token: Token['accessToken']): Promise<UserInSession> => {
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
    dni: User['dni'], role_id: User['role']['id'], token: Token['accessToken']
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

export const getAllOfUsers = async(
    skip: number, limit: number, token: Token['accessToken']
): Promise<User[]> => {
    try {
        const response = await api.getAll(skip, limit, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const getUser = async (
    dni: User['dni'], token: Token['accessToken']
): Promise<User> => {
    try {
        const response = await api.get(dni, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}