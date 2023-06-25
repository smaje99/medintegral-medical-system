import axios from 'axios';

import { Service, ServiceCreate, ServiceUpdate } from '@/types/medical/service.model';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

/**
 * Create a new service the API service.
 * @param service (ServiceCreate)
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a Service.
 */
export async function create(service: ServiceCreate, token: Token['accessToken']) {
  return axios.post<Service>('/service', service, { baseURL, ...headers(token) });
}

/**
 * Update a service the API service.
 * @param serviceId (Service['id'])
 * @param service (ServiceUpdate)
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a Service.
 */
export async function update(
  serviceId: Service['id'],
  service: ServiceUpdate,
  token: Token['accessToken']
) {
  return axios.put<Service>(`/service/${serviceId}`, service, {
    baseURL,
    ...headers(token),
  });
}
