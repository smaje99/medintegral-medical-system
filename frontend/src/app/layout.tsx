import 'normalize.css';
import './globals.css';

import type { Metadata } from 'next';
import { Provider as BalancerProvider } from 'react-wrap-balancer';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Medintegral IPS S.A.S',
  description:
    'Plataforma médica para citas médicas de' +
    'la MEDICINA INTEGRAL DEL CAQUETÁ IPS S.A.S',
  authors: { name: 'Sergio Andrés Majé Franco', url: 'smajefranco@gmail.com' },
  viewport: 'width=device-width, initial-scale=1',
  keywords: [
    'Medintegral',
    'Medintegral IPS',
    'IPS',
    'medicina',
    'citas',
    'citas médicas',
    'agenda médica',
    'medicina integral',
    'Caquetá',
    'sugerencias',
  ],
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es'>
      <body>
        <ThemeProvider>
          <BalancerProvider>{children}</BalancerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
