import api from '@Api/person.api';

export const getPerson = async (dni) => {
    try {
        const response = await api.get(dni);
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}

export const createPerson = async (personObj) => {
    try {
        const response = await api.create(personObj)
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}