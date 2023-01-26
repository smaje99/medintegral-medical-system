import type { Person, PersonInUserSession } from '@Types/person';
import type { Role } from '@Types/user/role';
import type { Token } from '@Types/user/token';

export interface User {
    readonly dni: number;
    readonly username: string;
    readonly is_active: boolean;
    readonly role: Role;
    readonly person: Person;
    readonly created_at: Date;
    readonly modified_at: Date;
}

export interface UserInSession extends Omit<User, 'role' | 'person'> {
    readonly person: PersonInUserSession;
    readonly role: Role['name'];
    readonly permissions?: Map<string, ('creación' | 'lectura' | 'modificación' | 'deshabilitar')[]>
}

export interface UserLogin extends Pick<User, 'username'> {
    readonly password: string;
}

export interface UserWithToken {
    readonly user: UserInSession;
    readonly token: Token;
}