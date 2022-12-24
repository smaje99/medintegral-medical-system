import api from '@Api/suggestion.api';
import { APIError } from '@Types/error';
import { Suggestion, SuggestionCreate } from '@Types/suggestion';
import { isAxiosError } from '@Utils/axios-error';

export const createSuggestion = async (suggestionObj: SuggestionCreate): Promise<Suggestion> => {
    try {
        const response = await api.create(suggestionObj);
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}

export const getAllOfPinnedSuggestions = async (): Promise<Suggestion[]> => {
    try {
        const response = await api.getAllOfPinned();
        return response.data;
    } catch (error) {
        if (isAxiosError<APIError>(error) && error.response) {
            throw new Error(error.response.data.detail);
        }

        throw error;
    }
}