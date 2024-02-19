import { Role, RoleRepository } from '../domain';

export class RoleFinderAll {
  constructor(private readonly repository: RoleRepository) {}

  async run(): Promise<Role[]> {
    return this.repository.findAll();
  }
}
