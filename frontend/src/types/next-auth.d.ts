import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt'

import type { Token } from './user/token';
import type { UserInSession, UserWithToken } from './user/user';

declare module "next-auth" {
    interface Session {
        user: UserInSession;
        accessToken: Token['access_token'];
    }

    interface User extends UserWithToken {}
}

declare module 'next-auth/jwt' {
    interface JWT {
        user: UserInSession;
        accessToken: Token['access_token'];
    }
}