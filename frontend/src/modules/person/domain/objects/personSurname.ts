import { z } from 'zod';

export const personSurnameSchema = z
  .string({
    required_error: 'Apellido de la persona es requerido',
    invalid_type_error: 'El apellido de la persona debe ser una cadena de texto',
  })
  .regex(/\D*/, 'Apellido de la persona debe contener números');
