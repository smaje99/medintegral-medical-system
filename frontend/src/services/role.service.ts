import api from '@Api/role.api';
import type { Role } from '@Types/user/role';

import { withAxiosHandler } from './commons';

export const getAllOfRoles: () => Promise<Role[]> = withAxiosHandler(
    async () => api.getAll()
);