import axios from 'axios';

const { NEXT_PUBLIC_API: baseURL } = process.env;

export default {
    async getAll() {
        return axios.get(`${baseURL}/role/`)
    }
}