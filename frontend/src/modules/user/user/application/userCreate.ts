import type {
  PersonAssociatedWithUserSaveValues,
  UserPostResponse,
  UserRepository,
} from '../domain';

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  async run(
    userIn: PersonAssociatedWithUserSaveValues,
  ): Promise<UserPostResponse | undefined> {
    return this.repository.save(userIn);
  }
}
