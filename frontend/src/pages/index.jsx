import { useEffect } from 'react';

import styles from '@Styles/pages/Home.module.scss';

const Home = () => {
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
            <h1>Hola Medintegral IPS SAS</h1>
        </>
    )
}

export default Home;