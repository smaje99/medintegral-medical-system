import api from '@Api/person.api';
import type { APIError } from '@Types/error';
import type { Person, PersonCreate, PersonUpdate } from '@Types/person';
import { Token } from '@Types/user/token';
import { isAxiosError } from '@Utils/axios-error';

export const getPerson = async (dni: Person['dni']): Promise<Person> => {
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

export const updatePerson = async (
    dni: Person['dni'], person: PersonUpdate, token: Token['accessToken']
): Promise<Person> => {
    try {
        const response = await api.update(dni, person, token);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}