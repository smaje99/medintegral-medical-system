import api from '@Api/doctor.api';
import type { Doctor, DoctorCreate, DoctorUpdate } from '@Types/medical/doctor.model';
import type { Token } from '@Types/user/token';

import { withAxiosHandler } from './commons';

/**
 * Service to create a new doctor in the API service.
 * @param doctor - DoctorCreate
 * @param token - Token['accessToken']
 * @returns a Promise that resolves to a Doctor.
 */
export const createDoctor: (
    doctor: DoctorCreate, token: Token['accessToken']
) => Promise<Doctor> = withAxiosHandler(
    async (doctor, token) => api.create(doctor, token)
);

/**
 * Service to update a doctor in the API service.
 * @param doctor - DoctorUpdate
 * @param token - Token['accessToken']
 * @returns a Promise that resolves to a Doctor.
 */
export const updateDoctor: (
    dni: Doctor['dni'], doctor: DoctorUpdate, token: Token['accessToken']
) => Promise<Doctor> = withAxiosHandler(
    (dni, doctor, token) => api.update(dni, doctor, token)
);