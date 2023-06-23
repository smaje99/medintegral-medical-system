import { useRouter } from 'next/router';

import { AuthLayout } from '@/components/layouts';
import { Form, styles } from '@/modules/ResetPassword';
import type { NextPageWithLayout } from '@/types/next';

const ResetPassword: NextPageWithLayout = () => {
  const {
    query: { token },
  } = useRouter();
  const tokenStr = token && typeof token === 'string' ? token : '';

  return (
    <section className={styles.form_box}>
      <h2 className={styles.title}>Restablecer tu contraseña</h2>
      <Form token={tokenStr} />
    </section>
  );
};

ResetPassword.getLayout = (page: JSX.Element) => (
  <AuthLayout title='Restablecer contraseña'>{page}</AuthLayout>
);

export default ResetPassword;
