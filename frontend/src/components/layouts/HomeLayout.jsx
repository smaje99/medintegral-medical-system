import { useEffect } from 'react';

import HomeHeader from '@Components/HomeHeader';
import { Navigation } from '@Components/Navigation';

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
            <Navigation />
            <HomeHeader />
            <main>
                {children}
            </main>
        </>
    )
}

export default HomeLayout;