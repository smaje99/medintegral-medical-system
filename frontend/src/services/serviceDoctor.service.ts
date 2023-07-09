import * as api from '@/api/serviceDoctor.api';
import type { DoctorInServiceCreate, ServiceDoctor } from '@/types/medical/doctor.model';
import type { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const createDoctorInService: (
  doctorInService: DoctorInServiceCreate,
  token: Token['accessToken']
) => Promise<ServiceDoctor> = withAxiosHandler(async (doctorInService, token) =>
  api.create(doctorInService, token)
);
