import Image from 'next/future/image';
import Link from 'next/link';
import { useRef } from 'react';

import Button, { BurgerButton } from '@/components/Button';
import { type BurgerButtonActions } from '@/components/Button/BurgerButton';
import { MenuModal } from '@/components/Navigation';
import NavLink from '@/components/NavLink';
import navigation from '@/helpers/navigation';
import routes from '@/helpers/routes';
import useModal from '@/hooks/useModal';
import medintegralIcon from '@/icons/medintegral.svg';

import styles from './Navbar.module.scss';

const Navbar = () => {
  const burgerButtonRef = useRef<BurgerButtonActions>();

  const [isOpenMenuModal, openMenuModal, closeMenuModal] = useModal();

  const handleMenuModal = (active: boolean) => {
    if (active) {
      openMenuModal();
    } else {
      closeMenuModal();
    }
  };

  const handleCloseMenuModal = () => burgerButtonRef.current.handleBurger();

  return (
    <>
      <nav className={styles.navbar}>
        <Link href={routes.home}>
          <a onClick={isOpenMenuModal && handleCloseMenuModal}>
            <Image
              src={medintegralIcon}
              className={styles.brand}
              alt='Medintegral I.P.S. S.A.S.'
              priority
            />
          </a>
        </Link>
        <ul className={styles.nav}>
          {navigation.map(({ name, route }) => (
            <li key={name} className={styles.item}>
              <NavLink
                href={route}
                className={(active: boolean) =>
                  `${styles.link} ${active && styles.active}`
                }
              >
                {name}
              </NavLink>
            </li>
          ))}

          <li className={styles.item}>
            <Button
              as='a'
              href={routes.login}
              stylesFor='floating'
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
  );
};

export default Navbar;
