import api from '@Api/login.api';

export const login = async ({ username, password }) => {
    try {
        const response = await api.login(username, password);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}

export const testToken = async (token) => {
    try {
        const response = await api.testToken(token);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}

export const resetPassword = async ({ token, newPassword }) => {
    try {
        const response = await api.resetPassword({
            token,
            new_password: newPassword
        });
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}

export const passwordRecovery = async (email) => {
    try {
        const response = await api.passwordRecovery(email);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}