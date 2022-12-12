import { signOut, useSession } from 'next-auth/react';
import { useMemo } from 'react';

import Button from '@Components/Button';
import NavLink from '@Components/NavLink';
import useGreetings from '@Hooks/useGreetings';

import navigation from '@Helpers/navigationProtected'
import routes from '@Helpers/routes';

import styles from './NavigationProtected.module.scss';

const NavigationProtected = () => {
    const greetings = useGreetings();
    const { data: session } = useSession();

    const nameOfUser = useMemo(() => (
        `${session?.user.person.name.split(' ')[0] || ''}`
    ), [session?.user]);

    const navigationMenu = useMemo(() => (
        Object.keys(session?.user.permissions || {})
            .map(permission => navigation[permission])
    ), [session?.user]);

    return (
        <nav className={styles.navigation}>
            <section className={styles.section}>
                <span className={styles.statement}>
                    {greetings}
                </span>
                <span className={styles.statement}>
                    {nameOfUser}
                </span>
                <hr />
            </section>
            <ul className={styles.nav}>
                {navigationMenu.map(item => (
                    <li key={item.name} className={styles.item}>
                        <NavLink
                            href={item.route}
                            className={(active) => (
                                `${styles.link} ${active && styles.active}`
                            )}
                        >
                            {item.name}
                        </NavLink>
                    </li>
                ))}
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