import axios from 'axios';

import type { Person, PersonCreate } from '@Types/person';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

export default {
    async get(dni: number) {
        return axios.get<Person>(`${baseURL}/person/${dni}`)
    },
    async create(personObj: PersonCreate) {
        return axios.post<Person>(`${baseURL}/person/`, personObj);
    }
}