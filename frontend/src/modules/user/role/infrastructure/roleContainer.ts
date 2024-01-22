import { RoleCreate } from '../application/roleCreate';
import { RoleRepository } from '../domain';
import { RoleCreateController } from './controllers/roleCreateController';
import { AxiosRoleRepository } from './http/axiosRoleRepository';

const repository: RoleRepository = new AxiosRoleRepository();

const roleCreate = new RoleCreate(repository);

export const roleCreateController = new RoleCreateController(roleCreate);
