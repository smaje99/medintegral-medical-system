import axios from 'axios';

import type { Token } from '@Types/user/token';
import type { Specialty, SpecialtyCreate, SpecialtyUpdate } from '@Types/medical/specialty.model';

const { NEXT_PUBLIC_API: baseURL } = process.env;

const headers = (token: Token['accessToken']) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    /**
     * Get a specialty with the given ID.
     * @param id (Specialty['id'])
     * @param token (Token['accessToken'])
     * @returns a Promise that resolves to the Specialty
     */
    async get(id: Specialty['id'], token: Token['accessToken']) {
        return axios.get<Specialty>(`/specialty/${id}`, { baseURL, ...headers(token) });
    },
    /**
     * Get all specialties.
     * @param token (Token['accessToken'])
     * @returns a Promise that resolves to the list of specialties
     */
    async getAll(token: Token['accessToken']) {
        return axios.get<Specialty[]>('/specialty/', { baseURL, ...headers(token) });
    },
    /**
     * Create a new specialty in the API service.
     * @param specialty (SpecialtyCreate): this is the object that will be sent to the server.
     * @param token (Token['accessToken'])
     * @returns a Promise that resolves to a Specialty.
     */
    async create(specialty: SpecialtyCreate, token: Token['accessToken']) {
        return axios.post<Specialty>('/specialty', specialty, { baseURL, ...headers(token) });
    },
    /**
     * Update a specialty in the API service.
     * @param id (Specialty['id'])
     * @param specialty (SpecialtyUpdate)
     * @param token (Token['accessToken])
     * @returns a Promise that resolves to a Specialty
     */
    async update(id: Specialty['id'], specialty: SpecialtyUpdate, token: Token['accessToken']) {
        return axios.put<Specialty>(`/specialty/${id}`, specialty, { baseURL, ...headers(token) });
    }
}