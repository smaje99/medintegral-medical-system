import { z } from 'zod';

import { BloodType, RhFactor } from '../enum';

export const personBloodTypeSchema = z.nativeEnum(BloodType, {
  required_error: 'Por favor, selecciona un grupo sanguíneo para la persona',
  invalid_type_error: 'Ese no es un grupo sanguíneo disponible',
});

export const personBloodTypeWithRhFactorSchema = z.custom<`${BloodType}${RhFactor}`>(
  (value) => typeof value === 'string' && /(A|B|O|AB)(\+|-)/.test(value),
);
