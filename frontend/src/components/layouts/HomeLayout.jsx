import Head from 'next/head';
import { useEffect } from 'react';

import Footer from '@Components/Footer';
import HomeHeader from '@Components/HomeHeader';
import { Navbar } from '@Components/Navigation';

import styles from './Layout.module.scss';

const HomeLayout = ({ children }) => {
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
            <HomeHeader />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

export default HomeLayout;