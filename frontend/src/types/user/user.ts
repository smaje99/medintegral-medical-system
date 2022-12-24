import type { PersonInUser } from '@Types/person';
import type { Token } from '@Types/user/token';

export interface User {
    readonly dni: number;
    readonly username: string;
    readonly is_active: boolean;
    readonly role: string;
    readonly person: PersonInUser;
    readonly permissions: Map<string, ('creación' | 'lectura' | 'modificación' | 'deshabilitar')[]>
    readonly created_at: Date;
    readonly modified_at: Date;
}

export interface UserLogin extends Pick<User, 'username'> {
    readonly password: string;
}

export interface UserWithToken {
    readonly user: User;
    readonly token: Token;
}