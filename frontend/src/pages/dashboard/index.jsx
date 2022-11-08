import Image from 'next/future/image';

import { ProtectedLayout } from '@Components/layouts';
import { Route, styles } from '@Modules/Dashboard';

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

Dashboard.getLayout = (page) => (
    <Route>
        <ProtectedLayout title="Dashboard">
            {page}
        </ProtectedLayout>
    </Route>
)

export default Dashboard