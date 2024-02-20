import { z } from 'zod';

export const personNameSchema = z
  .string({
    required_error: 'Por favor, ingresa el nombre de la persona',
    invalid_type_error: 'Eso no es un nombre',
  })
  .regex(/\D*/, 'Perdón, los nombres no deben contener números');
