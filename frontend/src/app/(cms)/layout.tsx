import 'normalize.css';
import '../globals.css';

import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  title: 'Medintegral IPS S.A.S',
  description: 'Plataforma médica de MEDICINA INTEGRAL DEL CAQUETÁ',
  authors: { name: 'Sergio Andrés Majé Franco', url: 'smajefranco@gmail.com' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

type Props = {
  readonly children: React.ReactNode;
};

export default function CMSLayout({ children }: Props) {
  return (
    <html lang='es'>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
