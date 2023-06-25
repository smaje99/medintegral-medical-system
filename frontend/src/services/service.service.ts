import * as api from '@/api/service.api';
import type {
  Service,
  ServiceCreate,
  ServiceUpdate,
} from '@/types/medical/service.model';
import type { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const createService: (
  service: ServiceCreate,
  token: Token['accessToken']
) => Promise<Service> = withAxiosHandler(async (service, token) =>
  api.create(service, token)
);

export const updateService: (
  serviceId: Service['id'],
  service: ServiceUpdate,
  token: Token['accessToken']
) => Promise<Service> = withAxiosHandler(async (serviceId, service, token) =>
  api.update(serviceId, service, token)
);
