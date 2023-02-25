import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaUserEdit, FaUserPlus, FaUserSlash } from 'react-icons/fa';

import routes from '@Helpers/routes';
import Button from '@Components/Button';
import { useTable } from '@Components/Table/Table';

import { BarProps } from '../Users.types';
import { UserDataForTable } from '..';

import styles from './Bar.module.scss';

function Bar({ openCreateModal, openDisableModal }: BarProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const { rowSelection, getSelectedFlatRows } = useTable<UserDataForTable>();

    const rowSelectionSize = useMemo(
        () => Object.keys(rowSelection ?? {}).length, [rowSelection]
    );

    const handleToGoUserUpdate = () => {
        const { dni } = getSelectedFlatRows()[0].original;
        const route = routes.dashboard.user(dni);
        router.push({
            pathname: route,
            query: { update: true }
        }, route);
    }

    return (
        <>
            <nav className={styles.bar}>
                <section className={styles['section']}>
                    <h1 className={styles.title}>
                        Usuarios
                    </h1>
                    {rowSelectionSize > 0 ? (
                        <span className={styles['row-size']}>
                            {rowSelectionSize}
                            &nbsp;
                            {rowSelectionSize === 1 ? 'seleccionado' : 'seleccionados'}
                        </span>
                    ): null}
                </section>
                <ul className={styles.nav}>
                    {session?.user?.permissions?.['usuarios']?.includes('creación') ? (
                        <li className={styles.item}>
                            <Button
                                as="button"
                                stylesFor="icon"
                                onClick={openCreateModal}
                                title="Agregar usuario"
                            >
                                <FaUserPlus />
                            </Button>
                        </li>
                    ): null}
                    {rowSelectionSize === 1
                        && session?.user?.permissions?.['usuarios']?.includes('modificación') ? (
                        <li className={styles['item']}>
                            <Button
                                as="button"
                                stylesFor="icon"
                                onClick={handleToGoUserUpdate}
                                title="Modificar usuario"
                            >
                                <FaUserEdit />
                            </Button>
                        </li>
                    ) : null}
                    {rowSelectionSize > 0
                        && session?.user?.permissions?.['usuarios']?.includes('deshabilitar') ? (
                        <li className={styles['item']}>
                            <Button
                                as="button"
                                stylesFor="icon"
                                onClick={openDisableModal}
                                title="Deshabilitar usuario"
                            >
                                <FaUserSlash />
                            </Button>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </>
    )
}

export default Bar;