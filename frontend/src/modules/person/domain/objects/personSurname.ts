import { z } from 'zod';

export const personSurnameSchema = z
  .string({
    required_error: 'Por favor, ingresa el apellido de la persona',
    invalid_type_error: 'Eso no es un apellido',
  })
  .regex(/\D*/, 'Perdón, los apellidos no deben contener números');
