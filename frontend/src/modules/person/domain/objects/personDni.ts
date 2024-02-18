import { z } from 'zod';

export const personDniSchema = z
  .string()
  .trim()
  .regex(/^\d+$/, 'La identificación debe ser numérica');

export class PersonDni {
  constructor(public readonly value: string) {
    personDniSchema.parse(value);
  }
}
