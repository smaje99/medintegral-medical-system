import type { User } from '@Types/user/user';

import { DataProps } from '../Users.types'

export interface TableProps {
    readonly users: DataProps['data']['users'];
}

export interface UserDataForTable extends Omit<User, 'dni'> {
    dni: string;
}