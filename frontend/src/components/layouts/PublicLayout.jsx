import Head from 'next/head';
import { useEffect } from 'react';

import { InfoFooter } from '@Components/Footer';
import { Navbar } from '@Components/Navigation';

import styles from './Layout.module.scss';

const PublicLayout = ({ title, children }) => {
    /** Add home class to the root element. */
    useEffect(() => {
        const rootElement = document.getElementById('__next');

        rootElement.classList.add(styles.public);

        return () => {
            rootElement.classList.remove(styles.public)
        };
    }, [])

    return (
        <>
            <Head>
                <title>{title} | Medintegral IPS SAS</title>
            </Head>
            <Navbar />
            {children}
            <InfoFooter />
        </>
    )
}

export default PublicLayout;