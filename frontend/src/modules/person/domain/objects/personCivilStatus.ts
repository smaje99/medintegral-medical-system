import { z } from 'zod';

import { CivilStatus } from '../enum';

export const personCivilStatusSchema = z.nativeEnum(CivilStatus, {
  required_error: 'Por favor, selecciona un estado civil para la persona',
  invalid_type_error: 'Ese no es un estado civil disponible',
});
