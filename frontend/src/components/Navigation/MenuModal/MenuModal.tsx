import Link from 'next/link';
import ReactModal from 'react-modal';

import Button from '@Components/Button';

import navigation from '@Helpers/navigation';
import routes from '@Helpers/routes';

import type { MenuModalProps } from '../Navigation.types';

import styles from './MenuModal.module.scss';

const MenuModal = ({ isOpen, close }: MenuModalProps) => {
    return (
        <ReactModal isOpen={isOpen} className={styles.modal} ariaHideApp={false}>
            <ul className={styles.menu}>
                {navigation.map(({ name, route }) => (
                    <li key={name} className={styles.item}>
                        <Link href={route}>
                            <a
                                className={styles.link}
                                onClick={close}
                            >
                                {name}
                            </a>
                        </Link>
                    </li>
                ))}

                <li className={styles.item}>
                    <Button
                        as="a"
                        href={routes.login}
                        stylesFor="floating"
                        className={styles.login}
                        onClick={close}
                    >
                        Iniciar sesión
                    </Button>
                </li>
            </ul>
        </ReactModal>
    )
}

export default MenuModal;