import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import routes from '@Helpers/routes';
import { login } from '@Services/login.service';
import { getMe } from '@Services/user.service';
import type { User } from '@Types/user/user';
import type { Token } from '@Types/user/token';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
    const cookies = parseCookies({ req });
    let maxAge = 3600;

    if (cookies['remember-me'] && cookies['remember-me'] === 'true') {
        maxAge = 10080;
    } else if (req.body.rememberMe) {
        maxAge = req.body.rememberMe === 'true' ? 10080 : maxAge;

        setCookie({ res }, 'remember-me', req.body.rememberMe, {
            maxAge,
            path: '/'
        })
    }

    const options: NextAuthOptions = {
        providers: [
            CredentialsProvider({
                id: 'credentials',
                name: 'Login',
                // @ts-ignore: next-line
                async authorize(credentials) {
                    try {
                        const token: Token = await login({
                            username: credentials.username,
                            password: credentials.password
                        });
                        const user: User = await getMe(token.access_token);

                        return { user, token };
                    } catch (error) {
                        throw new Error(error.message);
                    }
                }
            })
        ],
        callbacks: {
            async jwt({ token, user }) {
                if (user) {
                    token.accessToken = user.token.access_token;
                    token.user = user.user;
                }
                return token;
            },
            async session({ session, token }) {
                session.accessToken = token.accessToken;
                session.user = token.user;
                return session;
            }
        },
        events: {
            async signOut() {
                destroyCookie({ res }, 'remember-me', {
                    path: '/'
                });
            }
        },
        secret: process.env.NEXTAUTH_SECRET,
        session: {
            strategy: 'jwt',
            maxAge
        },
        jwt: {
            secret: process.env.NEXTAUTH_SECRET,
            maxAge
        },
        pages: {
            signIn: routes.login,
            error: routes.login
        }
    }

    return NextAuth(req, res, options);
}