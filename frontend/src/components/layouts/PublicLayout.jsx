import { useEffect } from 'react';

import Footer from '@Components/Footer';
import { Navigation } from '@Components/Navigation';

import styles from './Layout.module.scss';

const PublicLayout = ({ children }) => {
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
            <Navigation />
            {children}
            <Footer />
        </>
    )
}

export default PublicLayout;