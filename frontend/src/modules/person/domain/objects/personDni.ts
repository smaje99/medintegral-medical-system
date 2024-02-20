import { z } from 'zod';

export const personDniSchema = z
  .string({
    required_error: 'Por favor, ingresa el número de identificación',
    invalid_type_error: 'Ese no es un número de identificación',
  })
  .trim()
  .regex(/^\d+$/, 'Perdón, la identificación debe ser numérica');

export class PersonDni {
  constructor(public readonly value: string) {
    personDniSchema.parse(value);
  }
}
