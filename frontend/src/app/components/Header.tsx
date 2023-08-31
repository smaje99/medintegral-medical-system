import Link from 'next/link';
// eslint-disable-next-line import/no-named-as-default
import Balancer from 'react-wrap-balancer';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Header() {
  return (
    <header
      className={cn(
        'h-screen-d m-0 p-0 w-full',
        'flex flex-col items-center justify-center',
        'overflow-hidden',
      )}
    >
      <div className='animate-fade-up flex flex-col items-center justify-center gap-4'>
        <h1 className='max-w-lg text-center text-4xl font-extrabold md:text-5xl'>
          <Balancer>Transforma tu salud con nuestro respaldo</Balancer>
        </h1>
        <p className='max-w-2xl text-center text-xl/relaxed'>
          <Balancer>
            Nuestro equipo de médicos especializados te guiará en cada paso, ofreciéndote
            atención médica integral y personalizada para tu cuidado
          </Balancer>
        </p>
        <Button variant='floating' size='lg' className='mt-4 text-base ' asChild>
          <Link href='#'>Agenda tu cita ahora</Link>
        </Button>
      </div>
    </header>
  );
}
