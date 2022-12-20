import api from '@Api/role.api';

export const getAllOfRoles = async () => {
    try {
        const response = await api.getAll();
        return response.data;
    } catch (error) {
        const message = error?.response?.data?.detail;
        throw message ? new Error(message) : error;
    }
}