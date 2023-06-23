import * as api from '@/api/role.api';
import type { Role } from '@/types/user/role';
import type { Token } from '@/types/user/token';

import { withAxiosHandler } from './commons';

export const getAllOfRoles: (token: Token['accessToken']) => Promise<Role[]> =
  withAxiosHandler(async (token) => api.getAll(token));
