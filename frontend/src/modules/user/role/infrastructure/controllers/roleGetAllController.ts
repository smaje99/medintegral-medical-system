import { RoleFinderAll } from '../../application';
import { Role } from '../../domain';

export class RoleGetAllController {
  constructor(private readonly roleFinderAll: RoleFinderAll) {}

  async run(): Promise<Role[]> {
    return this.roleFinderAll.run();
  }
}
