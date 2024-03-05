import { z } from 'zod';

import {
  personAddressSchema,
  personBirthdateSchema,
  personBloodTypeSchema,
  personCivilStatusSchema,
  personDniSchema,
  personDocumentTypeSchema,
  personEmailSchema,
  personGenderSchema,
  personNameSchema,
  personPhonenumberSchema,
  personRhFactorSchema,
  personSurnameSchema,
} from './objects';

export const PersonSaveSchema = z.object({
  dni: personDniSchema,
  name: personNameSchema,
  surname: personSurnameSchema,
  address: personAddressSchema.optional(),
  email: personEmailSchema,
  phonenumber: personPhonenumberSchema,
  gender: personGenderSchema,
  birthdate: personBirthdateSchema,
  documentType: personDocumentTypeSchema,
  bloodType: personBloodTypeSchema.optional(),
  rhFactor: personRhFactorSchema.optional(),
  ethnicity: z.string().optional(),
  occupation: z.string().optional(),
  civilStatus: personCivilStatusSchema.optional(),
});

export type PersonSaveValues = Omit<z.infer<typeof PersonSaveSchema>, 'birthdate'> & {
  birthdate: string;
};
