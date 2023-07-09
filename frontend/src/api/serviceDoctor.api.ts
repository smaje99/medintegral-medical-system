import axios from 'axios';

import type { DoctorInServiceCreate, ServiceDoctor } from '@/types/medical/doctor.model';
import type { Token } from '@/types/user/token';

import { baseURL, headers } from './commons';

const ENDPOINT = 'service/doctor/';

/**
 * Create a new ServiceDoctor in the API service.
 * @param doctorInService DoctorInServiceCreate
 * @param token Token['accessToken']
 * @returns a Promise that resolves to ServiceDoctor
 */
export async function create(
  doctorInService: DoctorInServiceCreate,
  token: Token['accessToken']
) {
  return axios.post<ServiceDoctor>(ENDPOINT, doctorInService, {
    baseURL,
    ...headers(token),
  });
}
