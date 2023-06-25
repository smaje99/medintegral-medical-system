import Head from 'next/head';
import { useEffect } from 'react';

import { InfoFooter } from '@/components/Footer';
import { Navbar } from '@/components/Navigation';

import styles from './Layout.module.scss';
import type { LayoutProps } from './Layout.types';

const PublicLayout: React.FC<LayoutProps> = ({ title, children }) => {
  /** Add home class to the root element. */
  useEffect(() => {
    const rootElement = document.getElementById('__next');

    rootElement.classList.add(styles.public);

    return () => {
      rootElement.classList.remove(styles.public);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Medintegral IPS SAS</title>
      </Head>
      <Navbar />
      {children}
      <InfoFooter />
    </>
  );
};

export default PublicLayout;
