import { UserPostResponse } from './userDto';
import { PersonAssociatedWithUserSaveValues } from './userSchema';

export interface UserRepository {
  save(user: PersonAssociatedWithUserSaveValues): Promise<UserPostResponse | undefined>;
}
