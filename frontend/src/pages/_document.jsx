import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="es">
            <Head>
                <meta charSet="utf-8" />
                <meta name="description" content="Sistema médico para Medicina Integral del Caquetá I.P.S. S.A.S." />
                <meta name="author" content="Sergio Majé" />
                <meta name="copyright" content="Medicina Integral del Caquetá I.P.S. S.A.S." />
                <meta name="robots" content="index, follow" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}