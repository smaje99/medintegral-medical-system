import Image from 'next/future/image';

import { ProtectedLayout } from '@Components/layouts';
import { styles } from '@Modules/Dashboard';

import medintegralIcon from '@Icons/medintegral.svg';

const Dashboard = () => (
    <main className={styles.home}>
        <Image
            src={medintegralIcon}
            className={styles.brand}
            alt="Medintegral I.P.S S.A.S"
            priority
        />
        <span className={styles.platform}>Plataforma médica</span>
    </main>
)

Dashboard.getLayout = (page: JSX.Element) => (
    <ProtectedLayout title="Dashboard">
        {page}
    </ProtectedLayout>
)

export default Dashboard