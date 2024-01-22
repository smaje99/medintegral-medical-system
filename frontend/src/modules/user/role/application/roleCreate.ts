import { Role, RoleRepository, RoleSaveDtoType } from '../domain';

export class RoleCreate {
  constructor(private readonly roleRepository: RoleRepository) {}

  async run(roleIn: RoleSaveDtoType): Promise<Role | undefined> {
    return this.roleRepository.save(roleIn);
  }
}
