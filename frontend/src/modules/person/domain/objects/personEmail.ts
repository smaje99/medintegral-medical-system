import { z } from 'zod';

export const personEmailSchema = z
  .string({
    required_error: 'Por favor, ingresa el correo electrónico',
    invalid_type_error: 'Eso no es un correo electrónico',
  })
  .email('Perdón, ese no es un correo electrónico válido');
