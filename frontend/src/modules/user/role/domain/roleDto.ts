import { z } from 'zod';

import { roleDescriptionSchema } from './objects/roleDescription';
import { roleNameSchema } from './objects/roleName';

export const RoleSaveDTO = z.object({
  name: roleNameSchema,
  description: roleDescriptionSchema,
});

export type RoleSaveDtoType = z.infer<typeof RoleSaveDTO>;

export interface RoleResponse {
  id: string;
  name: string;
  description: string;
}
