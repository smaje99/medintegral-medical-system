import api from '@Api/user.api';
import type { Token } from '@Types/user/token';
import type {
    User, UserInSession, UserPasswordUpdate, UserUpdate
} from '@Types/user/user';

import { withAxiosHandler } from './commons';

export const getMe: (
    token: Token['accessToken']
) => Promise<UserInSession> = withAxiosHandler(
    async (token) => api.getMe(token)
);

export const createUser: (
    dni: User['dni'], role_id: User['role']['id'], token: Token['accessToken']
) => Promise<User> = withAxiosHandler(
    async (dni, role_id, token) => api.create(dni, role_id, token)
);

export const getAllOfUsers: (
    skip: number, limit: number, token: Token['accessToken']
) => Promise<User[]> = withAxiosHandler(
    async (skip, limit, token) => api.getAll(skip, limit, token)
);

export const getUser: (
    dni: User['dni'], token: Token['accessToken']
) => Promise<User> = withAxiosHandler(
    async (dni, token) => api.get(dni, token)
);

export const updateUser: (
    dni: User['dni'], user: UserUpdate, token: Token['accessToken']
) => Promise<User> = withAxiosHandler(
    async (dni, user, token) => api.update(dni, user, token)
);

export const changeUserPassword: (
    user: UserPasswordUpdate, token: Token['accessToken']
) => Promise<User> = withAxiosHandler(
    async (user, token) => api.updatePassword(user, token)
);

export const disableUser: (
    dni: User['dni'], disable: boolean, token: Token['accessToken']
) => Promise<User> = withAxiosHandler(
    async (dni, disable, token) => api.disable(dni, disable, token)
);

export const searchUserByDni: (
    dni: User['dni'], token: Token['accessToken']
) => Promise<User[]> = withAxiosHandler(
    async (dni, token) => api.search(dni, token)
);