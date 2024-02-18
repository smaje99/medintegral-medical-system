import { z } from 'zod';

import { Gender } from '../enum';

export const personGenderSchema = z.nativeEnum(Gender, {
  required_error: 'Por favor, selecciona un genero para la persona',
  invalid_type_error: 'Ese no es un genero disponible',
});
