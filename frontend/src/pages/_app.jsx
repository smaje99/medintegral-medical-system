import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@Styles/globals.scss';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            <SessionProvider session={session}>
                {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
            <ToastContainer />
        </>
    )
}