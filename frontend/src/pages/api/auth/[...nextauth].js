import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import routes from '@Helpers/routes';
import { login } from '@Services/login.service';
import { getMe } from '@Services/user.service';

const options = {
    debug: true,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Login',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' },
                rememberMe: { label: 'Remember Me', type: 'checkbox' }
            },
            async authorize(credentials) {
                try {
                    const token = await login(credentials);
                    const user = await getMe(token.access_token);
                    const { rememberMe } = credentials;

                    return { user, token, rememberMe };
                } catch (error) {
                    throw error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.token.access_token;
                token.user = user.user;
                token.rememberMe = user.rememberMe;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            session.user = token.user;
            session.rememberMe = token.rememberMe;
            return session;
        }
    },
    pages: {
        signIn: routes.login,
        error: routes.login
    }
}

export default (req, res) => NextAuth(req, res, options);