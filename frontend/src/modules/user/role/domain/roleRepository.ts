import { Role } from './role';
import { RoleSaveDtoType } from './roleDto';

export interface RoleRepository {
  /**
   * Save a role.
   * @param roleIn - RoleSaveDtoType - The role to save.
   * @returns Promise<Role> - The saved role.
   */
  save: (roleIn: RoleSaveDtoType) => Promise<Role | undefined>;
}
