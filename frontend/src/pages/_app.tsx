import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@Styles/globals.scss';

export default function NextApp({ Component, pageProps }: AppProps) {
    // @ts-ignore: next-line
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            {/* @ts-ignore:next-line */}
            <SessionProvider session={pageProps.session}>
                {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
            <ToastContainer />
        </>
    )
}