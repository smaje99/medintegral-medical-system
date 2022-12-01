import Head from 'next/head';
import { useEffect } from 'react';

import { Navbar } from '@Components/Navigation';

import styles from './Layout.module.scss';

const AuthLayout = ({ title, children }) => {
    /** Add auth class to the root element. */
    useEffect(() => {
        const rootElement = document.getElementById('__next');

        rootElement.classList.add(styles.auth);

        return () => {
            rootElement.classList.remove(styles.auth);
        };
    }, [])

    return (
        <>
            <Head>
                <title>{title} | Medintegral IPS SAS</title>
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default AuthLayout;