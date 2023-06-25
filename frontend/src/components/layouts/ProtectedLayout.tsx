import Head from 'next/head';
import { useEffect } from 'react';

import { RightsFooter } from '@/components/Footer';
import { NavigationProtected } from '@/components/Navigation';

import styles from './Layout.module.scss';
import type { LayoutProps } from './Layout.types';

const ProtectedLayout: React.FC<LayoutProps> = ({ title, children }) => {
  /** Add home class to the root element. */
  useEffect(() => {
    const rootElement = document.getElementById('__next');

    rootElement.classList.add(styles.protected);

    return () => {
      rootElement.classList.remove(styles.protected);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Medintegral IPS SAS</title>
      </Head>
      <NavigationProtected />
      <div className={styles.container}>
        {children}
        <RightsFooter />
      </div>
    </>
  );
};

export default ProtectedLayout;
