import { type Metadata } from 'next';

export const metadata: Metadata = {
  title: '¿Quiénes somos? | Medintegral IPS S.A.S',
  description:
    'Medintegral IPS S.A.S es una empresa privada con personería jurídica, ' +
    'patrimonio propio y autonomía administrativa inscrita en el Registro ' +
    'Especial de Prestadores de Servicios de Salud de Nivel I, teniendo como ' +
    'jurisdicción el Municipio de Florencia.',
  keywords: ['Medintegral IPS S.A.S', 'Medintegral', 'IPS', 'Quiénes somos'],
};

type Props = {
  children: React.ReactNode;
};

export default function AboutLayout({ children }: Props) {
  return (
    <article className='prose text-foreground mx-auto p-4 pt-24'>{children}</article>
  );
}
