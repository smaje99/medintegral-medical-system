import * as api from '@/api/specialty.api';
import type {
  Specialty,
  SpecialtyCreate,
  SpecialtyUpdate,
} from '@/types/medical/specialty.model';
import type { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const getSpecialty: (
  id: Specialty['id'],
  token: Token['accessToken']
) => Promise<Specialty> = withAxiosHandler(async (id, token) => api.get(id, token));

export const getAllOfSpecialty: (token: Token['accessToken']) => Promise<Specialty[]> =
  withAxiosHandler(async (token) => api.getAll(token));

export const createSpecialty: (
  specialty: SpecialtyCreate,
  token: Token['accessToken']
) => Promise<Specialty> = withAxiosHandler(async (specialty, token) =>
  api.create(specialty, token)
);

export const updateSpecialty: (
  id: Specialty['id'],
  specialty: SpecialtyUpdate,
  token: Token['accessToken']
) => Promise<Specialty> = withAxiosHandler(async (id, specialty, token) =>
  api.update(id, specialty, token)
);
