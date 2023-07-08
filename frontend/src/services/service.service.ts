import * as api from '@/api/service.api';
import type {
  Service,
  ServiceCreate,
  ServiceUpdate,
  ServiceWithSpecialty,
} from '@/types/medical/service.model';
import type { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const getService: (
  serviceId: Service['id'],
  token: Token['accessToken']
) => Promise<ServiceWithSpecialty> = withAxiosHandler(async (serviceId, token) =>
  api.get(serviceId, token)
);

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

export const disableService: (
  serviceId: Service['id'],
  disable: boolean,
  token: Token['accessToken']
) => Promise<Service> = withAxiosHandler(async (serviceId, disable, token) =>
  api.disable(serviceId, disable, token)
);
