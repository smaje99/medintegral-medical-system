import { z } from 'zod';

import { RhFactor } from '../enum';

export const personRhFactorSchema = z.nativeEnum(RhFactor, {
  required_error: 'Por favor, selecciona un factor R.H. para la persona',
  invalid_type_error: 'Ese no es un factor R.H. disponible',
});
