import { ToastContainer } from 'react-toastify';

import 'normalize.css';
import 'react-toastify/dist/ReactToastify.min.css';
import '@Styles/globals.scss';

export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page);

    return (
        <>
            {getLayout(<Component {...pageProps} />)}
            <ToastContainer />
        </>
    )
}