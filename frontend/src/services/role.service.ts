import api from '@Api/role.api';
import type { Role } from '@Types/user/role';
import type { Token } from '@Types/user/token';

import { withAxiosHandler } from './commons';

export const getAllOfRoles: (
    token: Token['accessToken']
) => Promise<Role[]> = withAxiosHandler(
    async (token) => api.getAll(token)
);