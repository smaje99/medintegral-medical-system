import { z } from 'zod';

import {
  personBirthdateLegalAgeSchema,
  personBloodTypeWithRhFactorSchema,
} from '@/modules/person/domain/objects';
import { PersonSaveSchema } from '@/modules/person/domain/personSchema';

import { roleIdSchema } from '../../role/domain/objects/roleId';
import { userIdSchema } from './objects/userId';

export const userSaveSchema = z.object({
  id: userIdSchema,
  image: z.string().optional(),
  roleId: roleIdSchema,
});

export type UserSaveValues = z.infer<typeof userSaveSchema>;

export const personAssociatedWithUserSaveSchema = userSaveSchema
  .omit({ id: true })
  .and(PersonSaveSchema.omit({ birthdate: true, bloodType: true, rhFactor: true }))
  .and(
    z.object({
      bloodType: personBloodTypeWithRhFactorSchema.optional(),
      birthdate: personBirthdateLegalAgeSchema,
    }),
  );

export type PersonAssociatedWithUserSaveValues = z.infer<
  typeof personAssociatedWithUserSaveSchema
>;
