import { GetServerSideProps, NextPage } from 'next';

import { ProtectedLayout } from '@Components/layouts';
import { styles, Bar } from '@Modules/Dashboard/Users';
import type { DataProps } from '@Modules/Dashboard/Users/Users.types';
import { getAllOfRoles } from '@Services/role.service';

const Users: NextPage<DataProps> = ({ data }) => {
    return (
        <main className={styles.main}>
            <Bar data={data} />
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
    const roles = { data: null, error: null };
    try {
        roles.data = await getAllOfRoles();
    } catch (error) {
        roles.error = error;
    }

    return { props: { data: { roles } } }
}