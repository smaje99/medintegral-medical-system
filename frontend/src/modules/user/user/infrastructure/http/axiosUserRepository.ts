import axios from 'axios';

import endpoints from '@/helpers/endpoints';
import { PersonNotFound, PersonUnderage } from '@/modules/person/domain/personErrors';
import {
  axiosConfig,
  axiosErrorHandler,
} from '@/modules/shared/infrastructure/axios/axiosConfig';
import { RoleNotFound } from '@/modules/user/role/domain/roleErrors';

import {
  PersonAssociatedWithUserSaveValues,
  UserPostResponse,
  UserRepository,
} from '../../domain';
import { UserAlreadyExists } from '../../domain/userErrors';

const ENDPOINT = endpoints.user.user;

export class AxiosUserRepository implements UserRepository {
  async save(
    user: PersonAssociatedWithUserSaveValues,
  ): Promise<UserPostResponse | undefined> {
    try {
      const { data: createdUser } = await axios.post<UserPostResponse>(
        ENDPOINT,
        user,
        axiosConfig,
      );

      return createdUser;
    } catch (error) {
      axiosErrorHandler(
        error,
        UserAlreadyExists,
        PersonUnderage,
        PersonNotFound,
        RoleNotFound,
      );
      return;
    }
  }
}
