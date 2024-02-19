import axios from 'axios';

import endpoints from '@/helpers/endpoints';
import {
  axiosConfig,
  axiosErrorHandler,
} from '@/modules/shared/infrastructure/axios/axiosConfig';
import {
  Role,
  RoleRepository,
  type RoleResponse,
  type RoleSaveDtoType,
} from '@/modules/user/role/domain';
import { RoleAlreadyExists } from '@/modules/user/role/domain/roleErrors';

const ENDPOINT = endpoints.user.role;

export class AxiosRoleRepository implements RoleRepository {
  async save(roleIn: RoleSaveDtoType): Promise<Role | undefined> {
    try {
      const {
        data: { id, name, description },
      } = await axios.post<RoleResponse>(ENDPOINT, roleIn, axiosConfig);

      return new Role(id, name, description);
    } catch (error) {
      axiosErrorHandler(error, RoleAlreadyExists);
      return;
    }
  }

  async findAll(): Promise<Role[]> {
    try {
      const { data } = await axios.get<RoleResponse[]>(ENDPOINT, axiosConfig);

      return data.map(({ id, name, description }) => new Role(id, name, description));
    } catch (error) {
      axiosErrorHandler(error);
      return [];
    }
  }
}
