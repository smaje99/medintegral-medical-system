import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

import routes from '@Helpers/routes';
import { login } from '@Services/login.service';

const options = {
    debug: true,
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Login',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                console.log(credentials);
                try {
                    const data = await login({
                        username: credentials.username,
                        password: credentials.password
                    });
                    const user = data.data;

                    return user;
                } catch (error) {
                    const message = error?.response?.data?.detail;
                    throw message ? new Error(message) : error;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.accessToken = user.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    },
    pages: {
        signIn: routes.login,
        error: routes.login
    }
}

export default (req, res) => NextAuth(req, res, options);