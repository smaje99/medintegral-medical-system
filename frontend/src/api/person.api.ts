import axios from 'axios';

import type { Person, PersonCreate, PersonUpdate } from '@Types/person';
import { Token } from '@Types/user/token';

import { baseURL, headers } from './commons';

export default {
    async get(dni: Person['dni']) {
        return axios.get<Person>(`/person/${dni}`, { baseURL });
    },
    async create(personObj: PersonCreate) {
        return axios.post<Person>('/person/', personObj, { baseURL });
    },
    async update(
        dni: Person['dni'], person: PersonUpdate, token: Token['accessToken']
    ) {
        return axios.put<Person>(`/person/${dni}`, person, {
            baseURL,
            ...headers(token)
        });
    }
}