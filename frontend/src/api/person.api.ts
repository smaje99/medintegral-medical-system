import axios from 'axios';

import type { Person, PersonCreate, PersonUpdate } from '@Types/person';
import { Token } from '@Types/user/token';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token: Token['accessToken']) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    async get(dni: Person['dni']) {
        return axios.get<Person>(`${baseURL}/person/${dni}`)
    },
    async create(personObj: PersonCreate) {
        return axios.post<Person>(`${baseURL}/person/`, personObj);
    },
    async update(dni: Person['dni'], person: PersonUpdate, token: Token['accessToken']) {
        return axios.put<Person>(`${baseURL}/person/${dni}`, person, headers(token));
    }
}