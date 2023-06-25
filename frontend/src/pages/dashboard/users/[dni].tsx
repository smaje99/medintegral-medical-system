import type { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

import { ProtectedLayout } from '@/components/layouts';
import { Profile, styles } from '@/modules/Dashboard/User';
import { getAllOfRoles } from '@/services/role.service';
import { getUser } from '@/services/user.service';
import type { Data } from '@/types/data-request';
import type { NextPageWithLayout } from '@/types/next';
import type { Role } from '@/types/user/role';
import type { User as UserModel } from '@/types/user/user';

type DataProps = {
  readonly data: {
    readonly user: Data<UserModel>;
    readonly roles: Data<Role[]>;
  };
};

const UserPage: NextPageWithLayout<DataProps> = ({ data }) => {
  return (
    <main className={styles.main}>
      <Profile user={data.user} roles={data.roles} />
    </main>
  );
};

UserPage.getLayout = (page) => <ProtectedLayout title='Usuario'>{page}</ProtectedLayout>;

export default UserPage;

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
    roles.data = await getAllOfRoles(token.accessToken);
  } catch (error) {
    roles.error = error;
  }

  return { props: { data: { user, roles } } };
};
