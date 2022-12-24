import Head from 'next/head';
import { useEffect } from 'react';

import { RightsFooter } from '@Components/Footer';
import { NavigationProtected } from '@Components/Navigation';

import type { LayoutProps } from './Layout.types';

import styles from './Layout.module.scss';

const ProtectedLayout = ({ title, children }: LayoutProps) => {
    /** Add home class to the root element. */
    useEffect(() => {
        const rootElement = document.getElementById('__next');

        rootElement.classList.add(styles.protected);

        return () => {
            rootElement.classList.remove(styles.protected)
        };
    }, []);

    return (
        <>
            <Head>
                <title>{title} | Medintegral IPS SAS</title>
            </Head>
            <NavigationProtected />
            <div className={styles.container}>
                {children}
                <RightsFooter />
            </div>
        </>
    )
}

export default ProtectedLayout;