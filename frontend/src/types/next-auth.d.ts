import type { Token } from './user/token';
import type { UserInSession, UserWithToken } from './user/user';

declare module 'next-auth' {
  interface Session {
    user: UserInSession;
    accessToken: Token['accessToken'];
  }

  type User = UserWithToken;
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: UserInSession;
    accessToken: Token['accessToken'];
  }
}
