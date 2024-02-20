import { z } from 'zod';

export const roleIdSchema = z
  .string({
    required_error: 'Por favor, seleccione el rol',
    invalid_type_error: 'Por favor, ingrese un rol válido',
  })
  .uuid('Perdón, el rol no es valido');

export class RoleId {
  constructor(public readonly value: string) {
    roleIdSchema.parse(value);
  }
}
