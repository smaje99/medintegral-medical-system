import { Suggestion, SuggestionCreate } from '@Types/suggestion';
import axios from 'axios';

import { baseURL } from './commons';

export default {
    async get(id: string) {
        return axios.get<Suggestion>(`/suggestion/${id}`, { baseURL });
    },
    async getAllOfPinned() {
        return axios.get<Suggestion[]>('/suggestion/', {
            baseURL, params: { pinned: true }
        });
    },
    async create(suggestionObj: SuggestionCreate) {
        return axios.post<Suggestion>('/suggestion', suggestionObj, { baseURL });
    }
}