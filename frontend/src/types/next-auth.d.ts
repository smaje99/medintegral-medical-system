import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt'

import type { User as UserCustom, UserWithToken } from './user/user';

declare module "next-auth" {
    interface Session {
        user: UserCustom;
        accessToken: string;
    }

    interface User extends UserWithToken {}
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: UserCustom;
        accessToken: string;
    }
}