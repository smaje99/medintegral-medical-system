import { z } from 'zod';

export const personEmailSchema = z
  .string({
    required_error: 'Correo electrónico de la persona es requerido',
    invalid_type_error: 'Correo electrónico de la persona debe ser una cadena de texto',
  })
  .email('Correo electrónico de la persona no es válido');
