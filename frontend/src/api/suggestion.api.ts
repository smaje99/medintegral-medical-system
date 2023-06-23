import axios from 'axios';

import type { Suggestion, SuggestionCreate } from '@/types/suggestion';

import { baseURL } from './commons';

export async function get(id: Suggestion['id']) {
  return axios.get<Suggestion>(`/suggestion/${id}`, { baseURL });
}

export async function getAllOfPinned() {
  return axios.get<Suggestion[]>('/suggestion/', { baseURL, params: { pinned: true } });
}

export async function create(suggestionObj: SuggestionCreate) {
  return axios.post<Suggestion>('/suggestion', suggestionObj, { baseURL });
}
