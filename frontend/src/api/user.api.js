import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    async getMe(token) {
        return axios.get(`${baseURL}/user/me`, headers(token));
    },
}