import Image from 'next/future/image';

import { ProtectedLayout } from '@Components/layouts';

import styles from './HomeProtected.module.scss';

import medintegralIcon from '@Icons/medintegral.svg';

const HomeProtected = () => {
    return (
        <ProtectedLayout title="Inicio">
            <main className={styles.home}>
                <Image
                    src={medintegralIcon}
                    className={styles.brand}
                    alt="Medintegral I.P.S. S.A.S."
                    priority
                />
                <span className={styles.platform}>Plataforma médica</span>
            </main>
        </ProtectedLayout>
    )
}

export default HomeProtected;