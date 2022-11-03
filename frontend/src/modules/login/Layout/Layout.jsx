import Head from 'next/head';
import { useEffect } from 'react';

import { Navbar } from '@Components/Navigation';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
    /** Add login class to the root element. */
    useEffect(() => {
        const rootElement = document.getElementById('__next');

        rootElement.classList.add(styles.login);

        return () => {
            rootElement.classList.remove(styles.login)
        };
    }, [])

    return (
        <>
            <Head>
                <title>Inicio de sesión | Medintegral IPS SAS</title>
            </Head>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}

export default Layout;