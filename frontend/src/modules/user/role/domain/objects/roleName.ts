import { z } from 'zod';

export const roleNameSchema = z
  .string({
    required_error: 'Por favor, ingrese el nombre del rol',
    invalid_type_error: 'Eso no es una descripción',
  })
  .min(4, 'Perdón, el nombre debe tener al menos 4 caracteres')
  .max(20, 'Perdón, el nombre debe tener menos de 20 caracteres')
  .regex(/^\S+$/, 'Perdón, el nombre debe ser una única palabra')
  .regex(/^[a-zA-Z]+$/, 'Perdón el nombre debe contener solo letras');
