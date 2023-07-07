import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FaUserEdit, FaUserMinus, FaUserPlus } from 'react-icons/fa';

import { Bar as BarTemplate, Item, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import routes from '@/helpers/routes';
import { searchUserByDni } from '@/services/user.service';

import { type UserDataForTable } from '.';

type Props = {
  openCreateModal: () => void;
  openDisableModal: () => void;
};

const Bar: React.FC<Props> = ({ openCreateModal, openDisableModal }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const { getObjectsFromSelectedRows, setDataForTable } = useTable<UserDataForTable>();

  const handleToGoUserUpdate = () => {
    const { dni } = getObjectsFromSelectedRows()[0];
    const route = routes.dashboard.user(dni);
    router.push({ pathname: route, query: { update: true } }, route);
  };

  const searchUser = async (value: string) => {
    if (!value || Number.isNaN(parseInt(value))) {
      return setDataForTable(null);
    }

    try {
      const users = await searchUserByDni(parseInt(value), session.accessToken);
      const data = users.map((user) => ({ ...user, dni: user.dni.toString() }));
      setDataForTable({ data });
    } catch (error) {
      setDataForTable(null);
    }
  };

  const canDisable = (rowSelectionSize: number) =>
    rowSelectionSize > 0 && getObjectsFromSelectedRows().every((row) => row.isActive);

  return (
    <BarTemplate<UserDataForTable> title='Usuarios' permission={Permissions.USERS}>
      <Item
        itemType='search'
        name='user-search'
        value={undefined}
        onChange={searchUser}
        pattern='[\d]+'
        title='Busca un usuario por su identificación'
        aria-label='Busca un usuario por su identificación'
      />
      <Item
        itemType='button'
        action={Actions.CREATE}
        canView={(rowSelectionSize) => rowSelectionSize === 0}
        onClick={openCreateModal}
        title='Crear usuario'
        aria-label='Crear usuario'
      >
        <FaUserPlus aria-hidden />
        Crear
      </Item>
      <Item
        itemType='button'
        action={Actions.UPDATE}
        canView={(rowSelectionSize) => rowSelectionSize === 1}
        onClick={handleToGoUserUpdate}
        title='Modificar usuario'
        aria-label='Modificar usuario'
      >
        <FaUserEdit aria-hidden />
        Modificar
      </Item>
      <Item
        itemType='button'
        action={Actions.DISABLE}
        canView={canDisable}
        onClick={openDisableModal}
        title='Deshabilitar usuario'
        aria-label='Deshabilitar usuario'
        disableButtonStyle
      >
        <FaUserMinus aria-hidden />
        Deshabilitar
      </Item>
    </BarTemplate>
  );
};

export default Bar;
