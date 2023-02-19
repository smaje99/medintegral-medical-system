import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@Components/layouts';
import { TableProvider } from '@Components/Table/Table';
import useModal from '@Hooks/useModal';
import {
    Bar, CreateFormModal, styles, Table, UserDataForTable
} from '@Modules/Dashboard/Users';
import type { DataProps } from '@Modules/Dashboard/Users/Users.types';
import { getAllOfRoles } from '@Services/role.service';
import { getAllOfUsers } from '@Services/user.service';

const Users: NextPage<DataProps> = ({ data }) => {
    const [isCreateModal, openCreateModal, closeCreateModal] = useModal();

    return (
        <main className={styles.main}>
            <TableProvider<UserDataForTable>>
                <Bar openCreateModal={openCreateModal} />
                <Table users={data.users} />
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
        roles.error = error;
    }

    return { props: { data: { roles, users } } }
}