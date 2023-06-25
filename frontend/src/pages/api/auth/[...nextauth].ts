import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { destroyCookie, parseCookies, setCookie } from 'nookies';

import routes from '@/helpers/routes';
import { login } from '@/services/login.service';
import { getMe } from '@/services/user.service';
import type { Token } from '@/types/user/token';
import type { UserInSession } from '@/types/user/user';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const cookies = parseCookies({ req });
  let maxAge = 3600;

  if (cookies['remember-me'] && cookies['remember-me'] === 'true') {
    maxAge = 10080;
  } else if (req.body.rememberMe) {
    maxAge = req.body.rememberMe === 'true' ? 10080 : maxAge;

    setCookie({ res }, 'remember-me', req.body.rememberMe, {
      maxAge,
      path: '/',
    });
  }

  const options: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'Login',
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore: next-line
        async authorize(credentials) {
          try {
            const token: Token = await login({
              username: credentials.username,
              password: credentials.password,
            });
            const user: UserInSession = await getMe(token.accessToken);

            return { user, token };
          } catch (error) {
            throw new Error(error.message);
          }
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token.accessToken = user.token.accessToken;
          token.user = user.user;
        }
        return token;
      },
      async session({ session, token }) {
        session.accessToken = token.accessToken;
        session.user = token.user;
        return session;
      },
    },
    events: {
      async signOut() {
        destroyCookie({ res }, 'remember-me', {
          path: '/',
        });
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge,
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      maxAge,
    },
    pages: {
      signIn: routes.login,
      error: routes.login,
    },
  };

  return NextAuth(req, res, options);
}
