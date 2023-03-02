import api from '@Api/doctor.api';
import type { Doctor, DoctorCreate } from '@Types/doctor.model';

import type { APIError } from '@Types/error';
import type { Token } from '@Types/user/token';

import { isAxiosError } from '@Utils/axios-error';

/**
 * Service to create a new doctor in the API service.
 * @param doctor - DoctorCreate
 * @param token - Token['accessToken']
 * @returns a Promise that resolves to a Doctor.
 */
export const createDoctor = async (
    doctor: DoctorCreate, token: Token['accessToken']
): Promise<Doctor> => {
    try {
        const response = await api.create(doctor, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}