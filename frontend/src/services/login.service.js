import api from '@Api/login.api';

export const login = async ({ username, password }) => api.login(username, password);

export const testToken = async (token) => api.testToken(token);

export const resetPassword = async ({ token, newPassword }) => (
    api.resetPassword({
        token,
        new_password: newPassword
    })
)

export const passwordRecovery = async (email) => api.passwordRecovery(email);