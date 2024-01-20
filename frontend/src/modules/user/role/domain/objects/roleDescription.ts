import { z } from 'zod';

export const roleDescriptionSchema = z.string({
  required_error: 'Nombre del rol es requerido',
  invalid_type_error: 'Nombre del rol debe ser una cadena de texto',
});
