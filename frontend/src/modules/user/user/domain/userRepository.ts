import { PersonSaveValues } from '@/modules/person/domain/personSchema';

import { UserPostResponse } from './userDto';
import { UserSaveValues } from './userSchema';

export interface UserRepository {
  save(
    userIn: UserSaveValues,
    personIn: PersonSaveValues,
  ): Promise<UserPostResponse | undefined>;
}
