import axios from 'axios';

import type { Doctor, DoctorCreate, DoctorUpdate } from '@/types/medical/doctor.model';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

/**
 * Get all the doctors in the API service.
 * @param token Token['accessToken']
 * @returns a Promise that resolves to a Doctor[].
 */
export async function getAll(token: Token['accessToken']) {
  return axios.get<Doctor[]>('/doctor', { baseURL, ...headers(token) });
}

/**
 * Create a new doctor in the API service.
 * @param doctor - DoctorCreate - this is the object that will be sent to the server
 * @param token - Token['accessToken']
 * @returns a Promise that resolves to a Doctor.
 */
export async function create(doctor: DoctorCreate, token: Token['accessToken']) {
  return axios.post<Doctor>('/doctor', doctor, { baseURL, ...headers(token) });
}

/**
 * Update a doctor in the API service
 * @param dni - Doctor['dni']
 * @param doctor - DoctorUpdate
 * @param token - Token['accessToken']
 * @returns a Promise that resolves to a Doctor.
 */
export async function update(
  dni: Doctor['dni'],
  doctor: DoctorUpdate,
  token: Token['accessToken']
) {
  return axios.put<Doctor>(`/doctor/${dni}`, doctor, { baseURL, ...headers(token) });
}
