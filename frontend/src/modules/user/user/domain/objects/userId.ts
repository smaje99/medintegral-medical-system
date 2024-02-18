import { personDniSchema } from '@/modules/person/domain/objects/personDni';

export const userIdSchema = personDniSchema;

export class UserId {
  constructor(public readonly value: string) {
    userIdSchema.parse(value);
  }
}
