import { z } from 'zod';

export const roleIdSchema = z.string().uuid('El rol no es valido');

export class RoleId {
  constructor(public readonly value: string) {
    roleIdSchema.parse(value);
  }
}
