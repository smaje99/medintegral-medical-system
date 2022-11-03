import Head from 'next/head';
import { useEffect } from 'react';

import { InfoFooter } from '@Components/Footer';
import { Navbar } from '@Components/Navigation';
import { Header } from '@Modules/home';

import styles from './Layout.module.scss';

const Layout = ({ children }) => {
    /** Add home class to the root element. */
    useEffect(() => {
        const rootElement = document.getElementById('__next');

        rootElement.classList.add(styles.home);

        return () => {
            rootElement.classList.remove(styles.home)
        };
    }, [])

    return (
        <>
            <Head>
                <title>Inicio | Medintegral IPS SAS</title>
            </Head>
            <Navbar />
            <Header />
            <main>
                {children}
            </main>
            <InfoFooter />
        </>
    )
}

export default Layout;