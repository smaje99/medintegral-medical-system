import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@Components/layouts';
import { Bar, styles, Table } from '@Modules/Dashboard/Users';
import type { DataProps } from '@Modules/Dashboard/Users/Users.types';
import { getAllOfRoles } from '@Services/role.service';
import { getAllOfUsers } from '@Services/user.service';

const Users: NextPage<DataProps> = ({ data }) => {
    return (
        <main className={styles.main}>
            <Bar data={data} />
            <Table users={data.users} />
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

    const roles = { data: null, error: null };
    const users = { data: null, error: null };

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