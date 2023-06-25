import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaUserEdit, FaUserMinus, FaUserPlus } from 'react-icons/fa';

import { Search } from '@/components/Input';
import { Bar as BarTemplate, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import routes from '@/helpers/routes';
import { searchUserByDni } from '@/services/user.service';
import { hasPermission } from '@/utils/auth';

import { UserDataForTable } from '..';
import styles from './Bar.module.scss';

type Props = {
  openCreateModal: () => void;
  openDisableModal: () => void;
};

const PERMISSION = Permissions.USERS;

function Bar({ openCreateModal, openDisableModal }: Props): React.JSX.Element {
  const { data: session } = useSession();
  const router = useRouter();
  const { rowSelectionSize, getSelectedFlatRows, setDataForTable } =
    useTable<UserDataForTable>();

  const handleToGoUserUpdate = () => {
    const { dni } = getSelectedFlatRows()[0].original;
    const route = routes.dashboard.user(dni);
    router.push(
      {
        pathname: route,
        query: { update: true },
      },
      route
    );
  };

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
  };

  const canDisable =
    rowSelectionSize > 0 &&
    hasPermission(session, PERMISSION, Actions.DISABLE) &&
    getSelectedFlatRows().every((row) => row.original.isActive);

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
      {rowSelectionSize === 0 && hasPermission(session, PERMISSION, Actions.CREATE) ? (
        <button
          className={styles.button}
          onClick={openCreateModal}
          title='Crear usuario'
          aria-label='Crear usuario'
        >
          <FaUserPlus aria-hidden />
          Crear
        </button>
      ) : null}
      {rowSelectionSize === 1 && hasPermission(session, PERMISSION, Actions.UPDATE) ? (
        <button
          className={styles.button}
          onClick={handleToGoUserUpdate}
          title='Modificar usuario'
          aria-label='Modificar usuario'
        >
          <FaUserEdit />
          Modificar
        </button>
      ) : null}
      {canDisable ? (
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
  );
}

export default Bar;
