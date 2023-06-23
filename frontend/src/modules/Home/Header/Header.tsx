import Image from 'next/future/image';

import Button from '@/components/Button';
import routes from '@/helpers/routes';
import buildingPic from '@/pictures/building.webp';

import styles from './Header.module.scss';

const Header = () => (
  <header className={styles.header}>
    <Image
      src={buildingPic}
      className={styles.image}
      alt='Edificio de Medintegral I.P.S S.A.S'
      priority
    />
    <section className={styles.container}>
      <h1 className={styles.title}>
        <div className={styles.content}>
          <span className={styles.slice}>medicina integral</span>
          <span className={styles.slice}>del Caquetá ips s.a.s</span>
        </div>
      </h1>
      <span className={styles.text}>
        ¡Agenda una cita médica con los mejores profesionales en el cuidado de la salud!
      </span>
      <Button
        as='a'
        href={routes.appointment}
        stylesFor='floating'
        className={styles.button}
      >
        Agendar cita
      </Button>
    </section>
  </header>
);

export default Header;
