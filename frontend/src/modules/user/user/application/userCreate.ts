import { PersonSaveValues } from '@/modules/person/domain';

import type {
  PersonAssociatedWithUserSaveValues,
  UserPostResponse,
  UserRepository,
  UserSaveValues,
} from '../domain';

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  async run({
    dni,
    bloodType: BTWithRhFactor,
    birthdate: birthdateIn,
    roleId,
    image,
    ...restPerson
  }: PersonAssociatedWithUserSaveValues): Promise<UserPostResponse | undefined> {
    const splitBTWithRhFactor = BTWithRhFactor?.split(/\b/);
    const bloodType = splitBTWithRhFactor?.[0] as PersonSaveValues['bloodType'];
    const rhFactor = splitBTWithRhFactor?.[1] as PersonSaveValues['rhFactor'];

    const birthdate = birthdateIn.toISOString().split('T')[0];

    const user: UserSaveValues = { id: dni, roleId, image };
    const person: PersonSaveValues = {
      dni,
      bloodType,
      rhFactor,
      birthdate,
      ...restPerson,
    };

    return this.repository.save(user, person);
  }
}
