import type { User } from '@Types/user/user';

export type TableProps = { }

export interface UserDataForTable extends Omit<User, 'dni'> {
    dni: string;
}