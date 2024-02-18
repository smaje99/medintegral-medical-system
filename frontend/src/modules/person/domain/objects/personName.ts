import { z } from 'zod';

export const personNameSchema = z
  .string({
    required_error: 'Nombre de la persona es requerido',
    invalid_type_error: 'Nombre de la persona debe ser una cadena de texto',
  })
  .regex(/\D*/, 'Nombre de la persona debe contener números');
