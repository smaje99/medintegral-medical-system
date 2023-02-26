import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaUserEdit, FaUserMinus, FaUserPlus, FaSearch } from 'react-icons/fa';

import { DebouncedInput } from '@Components/Input';
import { useTable } from '@Components/Table/Table';
import routes from '@Helpers/routes';
import { searchUserByDni } from '@Services/user.service';

import { BarProps } from '../Users.types';
import { UserDataForTable } from '..';

import styles from './Bar.module.scss';

function Bar({ openCreateModal, openDisableModal }: BarProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const {
        rowSelection, getSelectedFlatRows, setDataForTable
    } = useTable<UserDataForTable>();

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

    const searchUser = async (value: string) => {
        if (!value) {
            setDataForTable(null);
            return;
        }

        try {
            const users = await searchUserByDni(parseInt(value), session.accessToken);
            const data = users.map((user) => ({ ...user, dni: user.dni.toString() }));
            setDataForTable({ data });
        } catch (error) {
            setDataForTable(null);
        }
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
                    <li className={styles['item']}>
                        <label htmlFor='user-search' className={styles['search']}>
                            <DebouncedInput
                                type='number'
                                id='user-search'
                                className={styles['input']}
                                value={undefined}
                                min={0}
                                onChange={searchUser}
                                placeholder='Buscar...'
                                title='Busca un usuario por su identificación'
                            />
                            <FaSearch />
                        </label>
                    </li>
                    {rowSelectionSize === 0
                        && session?.user?.permissions?.['usuarios']?.includes('creación') ? (
                        <li className={styles['item']}>
                            <button
                                className={styles['button']}
                                onClick={openCreateModal}
                                title='Crear usuario'
                            >
                                <FaUserPlus />
                                Crear
                            </button>
                        </li>
                    ): null}
                    {rowSelectionSize === 1
                        && session?.user?.permissions?.['usuarios']?.includes('modificación') ? (
                        <li className={styles['item']}>
                            <button
                                className={styles['button']}
                                onClick={handleToGoUserUpdate}
                                title='Modificar usuario'
                            >
                                <FaUserEdit />
                                Modificar
                            </button>
                        </li>
                    ) : null}
                    {rowSelectionSize > 0
                        && session?.user?.permissions?.['usuarios']?.includes('deshabilitar')
                        && getSelectedFlatRows().every(row => row.original.isActive) ? (
                        <li className={styles['item']}>
                            <button
                                className={styles['button--disable']}
                                onClick={openDisableModal}
                                title='Deshabilitar usuario'
                            >
                                <FaUserMinus />
                                Deshabilitar
                            </button>
                        </li>
                    ) : null}
                </ul>
            </nav>
        </>
    )
}

export default Bar;