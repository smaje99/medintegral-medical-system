import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    async login(username, password) {
        const params = new URLSearchParams();
        params.append('username', username);
        params.append('password', password);

        return axios.post(`${baseURL}/login/access-token`, params);
    },
    async testToken(token) {
        return axios.post(`${baseURL}/login/test-token`, {}, headers(token));
    },
    async resetPassword({ token, new_password }) {
        return axios.patch(`${baseURL}/reset-password`, { token, new_password });
    },
    async passwordRecovery(email) {
        return axios.post(`${baseURL}/password-recovery/${email}`, {});
    }
}