import Image from 'next/future/image';
import Link from 'next/link';

import NavLink from '@Components/NavLink';
import Button, { BurgerButton } from '@Components/Button';

import routes from '@Helpers/routes';

import styles from './Navigation.module.scss';

import medintegralIcon from '@Icons/medintegral.svg';

const items = [
    { name: 'Servicios', route: routes.services },
    { name: 'Citas', route: routes.appointment },
    { name: 'Sobre nosotros', route: routes.aboutUs }
]

const Navigation = () => {
    return (
        <nav className={styles.navbar}>
            <Link href={routes.home}>
                <a>
                    <Image
                        src={medintegralIcon}
                        className={styles.brand}
                        alt="Medintegral I.P.S. S.A.S."
                        priority
                    />
                </a>
            </Link>
            <ul className={styles.nav}>
                {items.map(({ name, route }) => (
                    <li key={name} className={styles.item}>
                        <NavLink
                            href={route}
                            className={(active) => (
                                `${styles.link} ${active && styles.active}`
                            )}
                        >
                            {name}
                        </NavLink>
                    </li>
                ))}

                <li className={styles.item}>
                    <Button href={routes.login} style="floating" className={styles.login}>
                        Iniciar sesión
                    </Button>
                </li>
                <li className={styles.item}>
                    <BurgerButton />
                </li>
            </ul>
        </nav>
    )
}

export default Navigation;