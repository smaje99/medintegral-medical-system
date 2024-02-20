import { z } from 'zod';

export const roleDescriptionSchema = z.string({
  required_error: 'Por favor, ingresa la descripción del rol',
  invalid_type_error: 'Eso no es una descripción válida',
});
