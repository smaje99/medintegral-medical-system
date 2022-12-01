import { signOut, useSession } from 'next-auth/react';

import Button from '@Components/Button';
import useGreetings from '@Hooks/useGreetings';

import routes from '@Helpers/routes';

import styles from './NavigationProtected.module.scss'

const NavigationProtected = () => {
    const greetings = useGreetings();
    const { data: session } = useSession();

    return (
        <nav className={styles.navigation}>
            <section className={styles.section}>
                <span className={styles.statement}>
                    {greetings}
                </span>
                <span className={styles.statement}>
                    {session?.user?.username}
                </span>
                <hr />
            </section>
            <ul className={styles.nav}>

            </ul>
            <Button
                as="button"
                style="floating"
                onClick={() => signOut({ callbackUrl: routes.login })}
                className={styles.button}
            >
                Cerrar sesión
            </Button>
        </nav>
    )
}

export default NavigationProtected;