import 'normalize.css';
import '../globals.css';

import type { Metadata, Viewport } from 'next';

import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';

import { RightsFooter } from './footer';
import { FoldingNav } from './navigation';

export const metadata: Metadata = {
  title: 'Medintegral IPS S.A.S',
  description: 'Plataforma médica de MEDICINA INTEGRAL DEL CAQUETÁ',
  authors: { name: 'Sergio Andrés Majé Franco', url: 'smajefranco@gmail.com' },
  robots: { index: false, follow: false },
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
        <ThemeProvider>
          <FoldingNav />
          {children}
          <RightsFooter />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
