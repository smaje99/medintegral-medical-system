import type { NextPage } from 'next';
import type { Router } from 'next/router';
import type { Session } from 'next-auth';
import type { ReactElement, ReactNode } from 'react';

export type NextPageWithLayout<
  P extends object = Record<string, unknown>,
  IP = P
> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

declare module 'next/app' {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextPageWithLayout;
    router: Router;
    __N_SSG?: boolean;
    __N_SSP?: boolean;
    pageProps: P & {
      /** Initial session passed in from `getServerSideProps` or `getInitialProps` */
      session?: Session;
    };
  };
}
