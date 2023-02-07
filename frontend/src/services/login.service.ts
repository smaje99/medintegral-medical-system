import api from '@Api/login.api';

import type { APIError } from '@Types/error';
import type { Message } from '@Types/message';
import type { Token } from '@Types/user/token';
import type { User, UserInSession, UserLogin } from '@Types/user/user';

import { isAxiosError } from '@Utils/axios-error';

export const login = async (credentials: UserLogin): Promise<Token> => {
    try {
        const response = await api.login(
            credentials.username, credentials.password
        );
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const testToken = async (token: Token['accessToken']): Promise<UserInSession> => {
    try {
        const response = await api.testToken(token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const resetPassword = async (
    token: Token['accessToken'], newPassword: string
): Promise<Message> => {
    try {
        const response = await api.resetPassword(
            token,
            newPassword
        );
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const passwordRecovery = async (email: User['person']['email']): Promise<Message> => {
    try {
        const response = await api.passwordRecovery(email);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}