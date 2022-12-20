import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

export default {
    async get(dni) {
        return axios.get(`${baseURL}/person/${dni}`)
    },
    async create(personObj) {
        return axios.post(`${baseURL}/person/`, personObj);
    }
}