import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medintegral IPS S.A.S',
  description: 'Plataforma médica para citas médicas de'
    + 'la MEDICINA INTEGRAL DEL CAQUETÁ IPS S.A.S',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
