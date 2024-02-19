import { RoleCreate, RoleFinderAll } from '../application';
import { RoleRepository } from '../domain';
import { RoleCreateController } from './controllers/roleCreateController';
import { RoleGetAllController } from './controllers/roleGetAllController';
import { AxiosRoleRepository } from './http/axiosRoleRepository';

const repository: RoleRepository = new AxiosRoleRepository();

const roleCreate = new RoleCreate(repository);

export const roleCreateController = new RoleCreateController(roleCreate);

export const roleFinderAll = new RoleFinderAll(repository);

export const roleGetAllController = new RoleGetAllController(roleFinderAll);
