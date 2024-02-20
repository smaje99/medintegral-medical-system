import { z } from 'zod';

export const personAddressSchema = z.string({
  required_error: 'Por favor, ingrese la dirección',
  invalid_type_error: 'Eso no es una dirección física',
});
