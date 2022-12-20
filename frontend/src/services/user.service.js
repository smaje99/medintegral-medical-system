import api from '@Api/user.api';

export const getMe = async (token) => {
    try {
        const response = await api.getMe(token);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}

export const createUser = async ({ dni, role_id, token }) => {
    try {
        const response = await api.create({ dni, role_id, token });
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}