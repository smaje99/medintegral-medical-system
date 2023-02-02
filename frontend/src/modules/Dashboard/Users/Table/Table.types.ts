import type { User } from '@Types/user/user';

import { DataProps } from '../Users.types'

export interface TableProps {
    readonly users: DataProps['data']['users'];
}

export interface UserDataForTable extends Pick<User, 'username'> {
    dni: string;
    role: User['role']['name'];
    name: User['person']['name'];
    surname: User['person']['surname'];
    email: User['person']['email'];
    phone: User['person']['phone'];
}