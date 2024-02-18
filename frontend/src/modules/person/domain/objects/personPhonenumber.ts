import isMobilePhone from 'validator/es/lib/isMobilePhone';
import { z } from 'zod';

export const personPhonenumberSchema = z
  .string({
    required_error: 'Número de celular de la persona es requerido',
    invalid_type_error: 'Número de celular de la persona debe ser una cadena de texto',
  })
  .transform((value) => {
    const transformedValue = value.trim().replaceAll(' ', '');

    if (!transformedValue.startsWith('+57')) {
      return `+57${transformedValue}`;
    }

    return transformedValue;
  })
  .refine((value) => isMobilePhone(value, 'es-CO', { strictMode: true }), {
    message: 'El número de celular no es valido',
  });
