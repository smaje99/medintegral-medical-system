import axios from 'axios';

import {
  Service,
  ServiceCreate,
  ServiceUpdate,
  ServiceWithSpecialty,
} from '@/types/medical/service.model';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

/**
 * Get a medical service by its ID in the API service.
 * @param serviceId (Service['id'])
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a ServiceWithSpecialty.
 */
export async function get(serviceId: Service['id'], token: Token['accessToken']) {
  return axios.get<ServiceWithSpecialty>(`/service/${serviceId}`, {
    baseURL,
    ...headers(token),
  });
}

/**
 * Create a new medical service the API service.
 * @param service (ServiceCreate)
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a Service.
 */
export async function create(service: ServiceCreate, token: Token['accessToken']) {
  return axios.post<Service>('/service', service, { baseURL, ...headers(token) });
}

/**
 * Update a medical service the API service.
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

/**
 * Disable a medical service the API service.
 * @param serviceId (Service['id'])
 * @param isDisabled (boolean)
 * @param token (Token['accessToken'])
 * @returns a Promise that resolves to a Service.
 */
export async function disable(
  serviceId: Service['id'],
  isDisabled: boolean,
  token: Token['accessToken']
) {
  return axios.patch<Service>(
    `/service/disable/${serviceId}`,
    { disable: isDisabled },
    {
      baseURL,
      ...headers(token),
    }
  );
}
