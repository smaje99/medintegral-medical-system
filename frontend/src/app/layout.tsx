import 'normalize.css';
import './globals.css';

import type { Metadata } from 'next';

import 'normalize.css';
import '@/styles/globals.scss';

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
  openGraph: {
    title: 'Medintegral IPS S.A.S',
    description: 'Plataforma médica de Medintegral IPS S.A.S',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='es'>
      <body>{children}</body>
    </html>
  );
}
