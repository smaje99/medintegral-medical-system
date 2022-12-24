import Image from 'next/future/image';
import Link from 'next/link';
import { useRef } from 'react';

import { MenuModal } from '@Components/Navigation';
import NavLink from '@Components/NavLink';
import Button, { BurgerButton } from '@Components/Button';
import type { BurgerButtonActions } from '@Components/Button/BurgerButton/BuggerButton.types';

import useModal from '@Hooks/useModal';

import navigation from '@Helpers/navigation';
import routes from '@Helpers/routes';

import styles from './Navbar.module.scss';

import medintegralIcon from '@Icons/medintegral.svg';

const Navbar = () => {
    const burgerButtonRef = useRef<BurgerButtonActions>();

    const [isOpenMenuModal, openMenuModal, closeMenuModal] = useModal();

    const handleMenuModal = (active: boolean) => { active ? openMenuModal() : closeMenuModal() };

    const handleCloseMenuModal = () => burgerButtonRef.current.handleBurger();

    return (
        <>
            <nav className={styles.navbar}>
                <Link href={routes.home}>
                    <a onClick={isOpenMenuModal && handleCloseMenuModal}>
                        <Image
                            src={medintegralIcon}
                            className={styles.brand}
                            alt="Medintegral I.P.S. S.A.S."
                            priority
                        />
                    </a>
                </Link>
                <ul className={styles.nav}>
                    {navigation.map(({ name, route }) => (
                        <li key={name} className={styles.item}>
                            <NavLink
                                href={route}
                                className={(active: boolean) => (
                                    `${styles.link} ${active && styles.active}`
                                )}
                            >
                                {name}
                            </NavLink>
                        </li>
                    ))}

                    <li className={styles.item}>
                        <Button
                            as="a"
                            href={routes.login}
                            stylesFor="floating"
                            className={styles.login}
                        >
                            Iniciar sesión
                        </Button>
                    </li>
                    <li className={styles.item}>
                        <BurgerButton onEvent={handleMenuModal} ref={burgerButtonRef} />
                    </li>
                </ul>
            </nav>

            <MenuModal isOpen={isOpenMenuModal} close={handleCloseMenuModal} />
        </>
    )
}

export default Navbar;