import Head from 'next/head';
import React, { useEffect } from 'react';

import { Navbar } from '@/components/Navigation';

import styles from './Layout.module.scss';
import type { LayoutProps } from './Layout.types';

const AuthLayout: React.FC<LayoutProps> = ({ title, children }) => {
  /** Add auth class to the root element. */
  useEffect(() => {
    const rootElement = document.getElementById('__next');

    rootElement.classList.add(styles.auth);

    return () => {
      rootElement.classList.remove(styles.auth);
    };
  }, []);

  return (
    <>
      <Head>
        <title>{title} | Medintegral IPS SAS</title>
      </Head>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
