import 'normalize.css';
import './globals.css';

import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Medintegral IPS S.A.S',
  description:
    'Plataforma médica para citas médicas de' +
    'la MEDICINA INTEGRAL DEL CAQUETÁ IPS S.A.S',
  authors: { name: 'Sergio Andrés Majé Franco', url: 'smajefranco@gmail.com' },
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='es'>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
