import type { GetServerSideProps, NextPage } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@Components/layouts';
import { Profile, styles } from '@Modules/Dashboard/User';
import { DataProps } from '@Modules/Dashboard/User/User.types';
import { getUser } from '@Services/user.service';
import { getAllOfRoles } from '@Services/role.service';

const User: NextPage<DataProps> = ({ data }) => {
    return (
        <main className={styles.main}>
            <Profile user={data.user} roles={data.roles} />
        </main>
    )
}

// @ts-ignore: next-line
User.getLayout = (page: JSX.Element) => (
    <ProtectedLayout title="Usuario">
        {page}
    </ProtectedLayout>
)

export default User;

export const getServerSideProps: GetServerSideProps<DataProps> = async (context) => {
    const token = await getToken({ req: context.req });
    const { dni } = context.query;

    const user: DataProps['data']['user'] = {};
    const roles: DataProps['data']['roles'] = {};

    try {
        user.data = await getUser(parseInt(dni as string), token.accessToken);
    } catch (error) {
        user.error = error;
    }

    try {
        roles.data = await getAllOfRoles();
    } catch (error) {
        roles.error = error;
    }

    return { props: { data: { user, roles } } };
}