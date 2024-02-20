import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { z } from 'zod';

export const personPhonenumberSchema = z
  .string({
    required_error: 'Por favor, ingresa el número de celular',
    invalid_type_error: 'Eso no es un número de celular',
  })
  .transform((value) => {
    const transformedValue = value.trim().replaceAll(' ', '');

    if (!transformedValue.startsWith('+57')) {
      return `+57${transformedValue}`;
    }

    return transformedValue;
  })
  .refine((value) => isMobilePhone(value, 'es-CO', { strictMode: true }), {
    message: 'Perdón, el número de celular no es valido',
  });
