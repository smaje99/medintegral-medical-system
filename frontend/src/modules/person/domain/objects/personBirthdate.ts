import { z } from 'zod';

function getTomorrow(): Date {
  const tomorrow = new Date();

  tomorrow.setDate(tomorrow.getDate() + 1);

  return tomorrow;
}

function getLegalAge(): Date {
  const legalAge = new Date();

  legalAge.setFullYear(legalAge.getFullYear() - 18);

  return legalAge;
}

export const personBirthdateSchema = z
  .date({
    required_error: 'Por favor, ingresa la fecha de nacimiento de la persona',
    invalid_type_error: 'Eso no es una fecha de nacimiento válida',
  })
  .min(new Date('1900-01-01'), 'Perdona, la persona no es apta para trabajar')
  .max(getTomorrow(), 'Perdona, la persona aún no ha nacido');

export const personBirthdateLegalAgeSchema = personBirthdateSchema.max(
  getLegalAge(),
  'Perdona, la persona debe ser mayor de edad',
);
