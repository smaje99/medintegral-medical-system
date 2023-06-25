import axios from 'axios';

import type {
  Specialty,
  SpecialtyCreate,
  SpecialtyUpdate,
} from '@/types/medical/specialty.model';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

/**
 * Get a specialty with the given ID.
 * @param id (Specialty['id'])
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to the Specialty
 */
export async function get(id: Specialty['id'], token: Token['accessToken']) {
  return axios.get<Specialty>(`/specialty/${id}`, { baseURL, ...headers(token) });
}

/**
 * Get all specialties.
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to the list of specialties
 */
export async function getAll(token: Token['accessToken']) {
  return axios.get<Specialty[]>('/specialty/', { baseURL, ...headers(token) });
}

/**
 * Create a new specialty in the API service.
 * @param specialty (SpecialtyCreate)
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a Specialty.
 */
export async function create(specialty: SpecialtyCreate, token: Token['accessToken']) {
  return axios.post<Specialty>('/specialty', specialty, { baseURL, ...headers(token) });
}

/**
 * Update a specialty in the API service.
 * @param id (Specialty['id'])
 * @param specialty (SpecialtyUpdate)
 * @param token (Token['accessToken])
 * @returns a Promise that resolves to a Specialty
 */
export async function update(
  id: Specialty['id'],
  specialty: SpecialtyUpdate,
  token: Token['accessToken']
) {
  return axios.put<Specialty>(`/specialty/${id}`, specialty, {
    baseURL,
    ...headers(token),
  });
}
