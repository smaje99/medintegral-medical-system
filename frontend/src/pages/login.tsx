import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import { AuthLayout } from '@/components/layouts';
import { Spinner } from '@/components/loaders';
import routes from '@/helpers/routes';
import { LoginView } from '@/modules/Login';
import type { NextPageWithLayout } from '@/types/next';

const Login: NextPageWithLayout = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    return <LoginView />;
  }

  if (session) {
    router.push(routes.dashboard.home);
  }

  return <Spinner full />;
};

Login.getLayout = (page) => <AuthLayout title='Iniciar sesión'>{page}</AuthLayout>;

export default Login;
