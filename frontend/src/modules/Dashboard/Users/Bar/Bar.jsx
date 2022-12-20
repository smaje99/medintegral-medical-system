import { IoPersonAdd } from 'react-icons/io5';

import Button from '@Components/Button';
import useModal from '@Hooks/useModal';

import CreateFormModal from '../CreateFormModal';

import styles from './Bar.module.scss';

const Bar = ({ data }) => {
    const [isCreateModal, openCreateModal, closeCreateModal] = useModal();

    return (
        <>
            <nav className={styles.bar}>
                <h1 className={styles.title}>
                    Usuarios
                </h1>
                <ul className={styles.nav}>
                    <li className={styles.item}>
                        <Button
                            as="button"
                            style="icon"
                            onClick={openCreateModal}
                            title="Agregar usuario"
                        >
                            <IoPersonAdd />
                        </Button>
                    </li>
                </ul>
            </nav>

            <CreateFormModal
                isOpen={isCreateModal}
                close={closeCreateModal}
                data={data}
            />
        </>
    )
}

export default Bar;