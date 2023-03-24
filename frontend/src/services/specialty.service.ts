import api from '@Api/specialty.api';
import type { APIError } from '@Types/error';
import type {
    Specialty, SpecialtyCreate, SpecialtyUpdate
} from '@Types/medical/specialty.model';
import { Token } from '@Types/user/token';
import { isAxiosError } from '@Utils/axios-error';

export const getSpecialty = async (
    id: Specialty['id'], token: Token['accessToken']
): Promise<Specialty> => {
    try {
        const response = await api.get(id, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const getAllOfSpecialty = async (
    token: Token['accessToken']
): Promise<Specialty[]> => {
    try {
        const response = await api.getAll(token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const createSpecialty = async (
    specialty: SpecialtyCreate, token: Token['accessToken']
): Promise<Specialty> => {
    try {
        const response = await api.create(specialty, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const updateSpecialty = async (
    id: Specialty['id'],
    specialty: SpecialtyUpdate,
    token: Token['accessToken']
): Promise<Specialty> => {
    try {
        const response = await api.update(id, specialty, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}