import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaUserEdit, FaUserMinus, FaUserPlus } from 'react-icons/fa';

import { Search } from '@Components/Input';
import { Bar as BarTemplate, useTable } from '@Components/Table/Table';
import routes from '@Helpers/routes';
import { searchUserByDni } from '@Services/user.service';
import { hasPermission } from '@Utils/auth';

import { UserDataForTable } from '..';

import styles from './Bar.module.scss';

export type Props = {
    openCreateModal: () => void;
    openDisableModal: () => void;
}

function Bar({ openCreateModal, openDisableModal }: Props): JSX.Element {
    const { data: session } = useSession();
    const router = useRouter();
    const {
        rowSelectionSize, getSelectedFlatRows, setDataForTable
    } = useTable<UserDataForTable>();

    const handleToGoUserUpdate = () => {
        const { dni } = getSelectedFlatRows()[0].original;
        const route = routes.dashboard.user(dni);
        router.push({
            pathname: route,
            query: { update: true }
        }, route);
    }

    const searchUser = async (value: string) => {
        if (!value || Number.isNaN(parseInt(value))) {
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
        <BarTemplate<UserDataForTable> title='Usuarios'>
            <Search
                name='user-search'
                value={undefined}
                onChange={searchUser}
                pattern='[\d]+'
                title='Busca un usuario por su identificación'
                aria-label='Busca un usuario por su identificación'
            />
            {rowSelectionSize === 0 && hasPermission(session, 'usuarios', 'creación') ? (
                <button
                    className={styles['button']}
                    onClick={openCreateModal}
                    title='Crear usuario'
                    aria-label='Crear usuario'
                >
                    <FaUserPlus aria-hidden />
                    Crear
                </button>
            ): null}
            {rowSelectionSize === 1 && hasPermission(session, 'usuarios', 'modificación') ? (
                <button
                    className={styles['button']}
                    onClick={handleToGoUserUpdate}
                    title='Modificar usuario'
                    aria-label='Modificar usuario'
                >
                    <FaUserEdit />
                    Modificar
                </button>
            ) : null}
            {rowSelectionSize > 0
                && hasPermission(session, 'usuarios', 'deshabilitar')
                && getSelectedFlatRows().every(row => row.original.isActive) ? (
                <button
                    className={styles['button--disable']}
                    onClick={openDisableModal}
                    title='Deshabilitar usuario'
                >
                    <FaUserMinus aria-hidden />
                    Deshabilitar
                </button>
            ) : null}
        </BarTemplate>
    )
}

export default Bar;