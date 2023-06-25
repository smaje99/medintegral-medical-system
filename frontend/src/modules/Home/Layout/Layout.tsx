import Head from 'next/head';
import { useEffect } from 'react';

import { InfoFooter } from '@/components/Footer';
import { Navbar } from '@/components/Navigation';

import Header from '../Header';
import styles from './Layout.module.scss';

type Props = {
  children: React.JSX.Element;
};

const Layout: React.FC<Props> = ({ children }) => {
  /** Add home class to the root element. */
  useEffect(() => {
    const rootElement = document.getElementById('__next');

    rootElement.classList.add(styles.home);

    return () => {
      rootElement.classList.remove(styles.home);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Inicio | Medintegral IPS SAS</title>
      </Head>
      <Navbar />
      <Header />
      <main>{children}</main>
      <InfoFooter />
    </>
  );
};

export default Layout;
