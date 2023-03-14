import axios from 'axios';

import type { Token } from '@Types/user/token';
import type { Doctor, DoctorCreate, DoctorUpdate } from '@Types/doctor.model';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = NEXT_PUBLIC_API;

const headers = (token: Token['accessToken']) => ({
    headers: {
        Authorization: `Bearer ${token}`
    }
})

export default {
    /**
     * Create a new doctor in the API service.
     * @param doctor - DoctorCreate - this is the object that will be sent to the server
     * @param token - Token['accessToken']
     * @returns a Promise that resolves to a Doctor.
     */
    async create(doctor: DoctorCreate, token: Token['accessToken']) {
        return axios.post<Doctor>('/doctor', doctor, { baseURL, ...headers(token) })
    },
    /**
     * Update a doctor in the API service
     * @param dni - Doctor['dni']
     * @param doctor - DoctorUpdate
     * @param token - Token['accessToken']
     * @returns a Promise that resolves to a Doctor.
     */
    async update(dni: Doctor['dni'], doctor: DoctorUpdate, token: Token['accessToken']) {
        return axios.put<Doctor>(`/doctor/${dni}`, doctor, { baseURL, ...headers(token) })
    }
}