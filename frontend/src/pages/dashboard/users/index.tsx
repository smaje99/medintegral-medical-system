import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';
import { useMemo } from 'react';

import { ProtectedLayout } from '@Components/layouts';
import { TableProvider } from '@Components/Table/Table';
import useModal from '@Hooks/useModal';
import {
    Bar, CreateFormModal, styles, Table, UserDataForTable, UsersDisableModal
} from '@Modules/Dashboard/Users';
import type { DataProps } from '@Modules/Dashboard/Users/Users.types';
import { getAllOfRoles } from '@Services/role.service';
import { getAllOfUsers } from '@Services/user.service';
import type { Data } from '@Types/data-request';

const Users: NextPage<DataProps> = ({ data }) => {
    const [isCreateModal, openCreateModal, closeCreateModal] = useModal();
    const [isDisableModal, openDisableModal, closeDisableModal] = useModal();

    const users = useMemo<Data<UserDataForTable[]>>(() => ({
        ...data.users,
        data: data.users?.data?.map(user => ({ ...user, dni: user.dni.toString() }))
    }), [data.users]);

    return (
        <main className={styles.main}>
            <TableProvider<UserDataForTable> data={users}>
                <Bar {...{ openCreateModal, openDisableModal }}  />
                <Table />

                <UsersDisableModal
                    isOpen={isDisableModal}
                    onClose={closeDisableModal}
                />
            </TableProvider>

            <CreateFormModal
                isOpen={isCreateModal}
                close={closeCreateModal}
                roles={data.roles}
            />
        </main>
    )
}

// @ts-ignore: next-line
Users.getLayout = (page: JSX.Element) => (
    <ProtectedLayout title="Usuarios">
        {page}
    </ProtectedLayout>
)

export default Users;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
    const token = await getToken({ req: context.req });

    const roles: DataProps['data']['roles'] = {};
    const users: DataProps['data']['users'] = {};

    try {
        roles.data = await getAllOfRoles();
    } catch (error) {
        roles.error = error;
    }

    try {
        users.data = await getAllOfUsers(0, 50, token.accessToken);
    } catch (error) {
        users.error = error;
    }

    return { props: { data: { roles, users } } };
}