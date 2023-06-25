import Image from 'next/future/image';

import { ProtectedLayout } from '@/components/layouts';
import medintegralIcon from '@/icons/medintegral.svg';
import { styles } from '@/modules/Dashboard';
import type { NextPageWithLayout } from '@/types/next';

const Dashboard: NextPageWithLayout = () => (
  <main className={styles.home}>
    <Image
      src={medintegralIcon}
      className={styles.brand}
      alt='Medintegral I.P.S S.A.S'
      priority
    />
    <span className={styles.platform}>Plataforma médica</span>
  </main>
);

Dashboard.getLayout = (page) => (
  <ProtectedLayout title='Dashboard'>{page}</ProtectedLayout>
);

export default Dashboard;
