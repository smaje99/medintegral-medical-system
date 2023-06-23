import 'normalize.css';
import 'react-phone-input-2/lib/style.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-tabs/style/react-tabs.css';
import '@/styles/globals.scss';

import { type AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';

export default function NextApp({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <SessionProvider session={pageProps.session}>
        {getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      <ToastContainer />
    </>
  );
}
