import axios from 'axios';

import endpoints from '@/helpers/endpoints';
import { type PersonSaveValues } from '@/modules/person/domain';
import { PersonNotFound, PersonUnderage } from '@/modules/person/domain/personErrors';
import {
  axiosConfig,
  axiosErrorHandler,
} from '@/modules/shared/infrastructure/axios/axiosConfig';
import { RoleNotFound } from '@/modules/user/role/domain/roleErrors';

import { UserPostResponse, UserRepository, UserSaveValues } from '../../domain';
import { UserAlreadyExists } from '../../domain/userErrors';

const ENDPOINT = endpoints.user.user;

export class AxiosUserRepository implements UserRepository {
  async save(
    userIn: UserSaveValues,
    personIn: PersonSaveValues,
  ): Promise<UserPostResponse | undefined> {
    const userToSave = { userIn, personIn };

    try {
      const { data: createdUser } = await axios.post<UserPostResponse>(
        ENDPOINT,
        userToSave,
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
