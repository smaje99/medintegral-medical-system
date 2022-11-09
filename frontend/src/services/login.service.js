import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API

const authHeaders = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

/**
 * TODO: Encrypt password
 */
export const login = async ({ username, password }) => {
    const params = new URLSearchParams();
    params.append('username', username);
    params.append('password', password);

    return axios.post(`${baseURL}/login/access-token`, params);
}

export const testToken = async (token) => {
    return axios.post(`${baseURL}/login/test-token`, {}, authHeaders(token))
}

export const resetPassword = async ({ token, new_password }) => {
    return axios.patch(`${baseURL}/reset-password`, { token, new_password });
}

export const passwordRecovery = async ({ email }) => {
    return axios.post(`${baseURL}/password-recovery/${email}`, {});
}