import type { Doctor } from '@Types/doctor.model';
import type { Person, PersonInUserSession } from '@Types/person';
import type { Role } from '@Types/user/role';
import type { Token } from '@Types/user/token';

export interface User {
    readonly dni: number;
    readonly username: string;
    readonly isSuperuser: boolean;
    readonly isActive: boolean;
    readonly role: Role;
    readonly person: Person;
    readonly doctor?: Doctor;
    readonly createdAt: Date;
    readonly modifiedAt: Date;
}

export interface UserInSession extends Omit<User, 'role' | 'person' | 'doctor'> {
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

export interface UserUpdate {
    readonly roleId: Role['id'];
}

export interface UserPasswordUpdate {
    oldPassword: string;
    newPassword: string;
}