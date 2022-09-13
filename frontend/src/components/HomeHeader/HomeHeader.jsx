import Image from 'next/future/image';
import Link from 'next/link';

import routes from '@Helpers/routes';

import styles from './HomeHeader.module.scss';

import buildingPic from '@Pictures/building.webp';

const HomeHeader = () => (
    <header className={styles.header}>
        <Image
            src={buildingPic}
            className={styles.image}
            alt="Edificio de Medintegral I.P.S S.A.S"
            layout="responsive"
            priority
        />
        <h1 className={styles.title}>
            <div className={styles.content}>
                <span className={styles.slice}>
                    medicina integral
                </span>
                <span className={styles.slice}>
                    del Caquetá ips s.a.s
                </span>
            </div>
        </h1>
        <span className={styles.text}>
            ¡Agenda una cita médica con los mejores profesionales en el cuidado de la salud!
        </span>
        <Link href={routes.appointment}>
            <a className={styles.button}>
                Agendar cita
            </a>
        </Link>
    </header>
)

export default HomeHeader;