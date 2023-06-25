import { useMemo } from 'react';

import styles from './RightsFooter.module.scss';

const RightsFooter = () => {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className={styles.footer}>
      <span className={styles.copyright}>
        &copy; {year} - Medicina Integral del Caquetá IPS S.A.S
      </span>
    </footer>
  );
};

export default RightsFooter;
