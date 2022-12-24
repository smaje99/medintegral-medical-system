import api from '@Api/person.api';
import type { APIError } from '@Types/error';
import type { Person, PersonCreate } from '@Types/person';
import { isAxiosError } from '@Utils/axios-error';

export const getPerson = async (dni: number): Promise<Person> => {
    try {
        const response = await api.get(dni);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const createPerson = async (personObj: PersonCreate): Promise<Person> => {
    try {
        const response = await api.create(personObj)
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}