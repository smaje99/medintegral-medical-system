import { z } from 'zod';

export const personAddressSchema = z.string({
  required_error: 'Dirección de la persona es requerida',
  invalid_type_error: 'Dirección de la persona debe ser una cadena de texto',
});
