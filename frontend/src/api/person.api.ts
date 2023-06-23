import axios from 'axios';

import type { Person, PersonCreate, PersonUpdate } from '@/types/person';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

export async function get(dni: Person['dni']) {
  return axios.get<Person>(`/person/${dni}`, { baseURL });
}

export async function create(personObj: PersonCreate) {
  return axios.post<Person>('/person/', personObj, { baseURL });
}

export async function update(
  dni: Person['dni'],
  person: PersonUpdate,
  token: Token['accessToken']
) {
  return axios.put<Person>(`/person/${dni}`, person, { baseURL, ...headers(token) });
}
