import { Suggestion, SuggestionCreate } from '@Types/suggestion';
import axios from 'axios';

const { NEXT_PUBLIC_API } = process.env;
const baseURL = `${NEXT_PUBLIC_API}/suggestion`;

export default {
    async get(id: string) {
        return axios.get<Suggestion>(`${baseURL}/${id}`);
    },
    async getAllOfPinned() {
        return axios.get<Suggestion[]>(`${baseURL}/?pinned=true`);
    },
    async create(suggestionObj: SuggestionCreate) {
        return axios.post<Suggestion>(`${baseURL}`, suggestionObj);
    }
}