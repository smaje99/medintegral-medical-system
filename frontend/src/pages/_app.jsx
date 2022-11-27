import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';

import Auth from '@Components/Auth';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@Styles/globals.scss';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <SessionProvider session={session}>
                {Component.auth ? (
                    <Auth>
                        {getLayout(<Component {...pageProps} />)}
                    </Auth>
                ) : getLayout(<Component {...pageProps} />)}
            </SessionProvider>
            <ToastContainer />
        </>
    )
}