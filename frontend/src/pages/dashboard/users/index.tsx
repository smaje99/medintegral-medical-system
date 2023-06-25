import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useMemo } from 'react';

import { ProtectedLayout } from '@/components/layouts';
import { TableProvider } from '@/components/Table/Table';
import useModal from '@/hooks/useModal';
import {
  Bar,
  CreateFormModal,
  styles,
  Table,
  UserDataForTable,
  UsersDisableModal,
} from '@/modules/Dashboard/Users';
import { getAllOfRoles } from '@/services/role.service';
import { getAllOfUsers } from '@/services/user.service';
import type { Data } from '@/types/data-request';
import type { NextPageWithLayout } from '@/types/next';
import type { Role } from '@/types/user/role';
import type { User } from '@/types/user/user';

type DataProps = {
  data: {
    roles: Data<Role[]>;
    users: Data<User[]>;
  };
};

const Users: NextPageWithLayout<DataProps> = ({ data }) => {
  const [isCreateModal, openCreateModal, closeCreateModal] = useModal();
  const [isDisableModal, openDisableModal, closeDisableModal] = useModal();

  const users = useMemo<Data<UserDataForTable[]>>(
    () => ({
      ...data.users,
      data: data.users?.data?.map((user) => ({ ...user, dni: user.dni.toString() })),
    }),
    [data.users]
  );

  return (
    <main className={styles.main}>
      <TableProvider<UserDataForTable> data={users}>
        <Bar {...{ openCreateModal, openDisableModal }} />
        <Table />

        <UsersDisableModal isOpen={isDisableModal} onClose={closeDisableModal} />
      </TableProvider>

      <CreateFormModal
        isOpen={isCreateModal}
        close={closeCreateModal}
        roles={data.roles}
      />
    </main>
  );
};

Users.getLayout = (page) => <ProtectedLayout title='Usuarios'>{page}</ProtectedLayout>;

export default Users;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
  const token = await getToken({ req: context.req });

  const roles: DataProps['data']['roles'] = {};
  const users: DataProps['data']['users'] = {};

  try {
    roles.data = await getAllOfRoles(token.accessToken);
  } catch (error) {
    roles.error = error;
  }

  try {
    users.data = await getAllOfUsers(0, 50, token.accessToken);
  } catch (error) {
    users.error = error;
  }

  return { props: { data: { roles, users } } };
};
