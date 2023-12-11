import Link from 'next/link';

import { Stat } from '@/components/stat';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { differenceBetweenDates } from '@/utils/date';

const yearsOfExperience = differenceBetweenDates(new Date(), '2007-01-01', 'years');

export default function Header() {
  return (
    <header
      className={cn(
        'h-screen-d m-0 py-8 w-full',
        'grid grid-cols-1 grid-rows-[1fr_auto] gap-14',
        'place-content-center place-items-center',
        'overflow-hidden',
      )}
    >
      <section
        className={'animate-fade-up flex flex-col items-center justify-center gap-4'}
      >
        <h1
          className={
            'text-balance max-w-lg text-center text-4xl font-extrabold sm:text-5xl'
          }
        >
          Transforma tu salud con nuestro respaldo
        </h1>
        <p className='text-pretty max-w-2xl text-center text-xl/relaxed'>
          Nuestro equipo de médicos especializados te guiará en cada paso, ofreciéndote
          atención médica integral y personalizada para tu cuidado
        </p>
        <Button
          variant='floating-secondary'
          size='lg'
          className='mt-4 text-lg tracking-wider'
          asChild
        >
          <Link href='#'>Agenda tu cita ahora</Link>
        </Button>
      </section>

      <aside
        className={cn(
          'bg-primary-950 dark:bg-primary-100',
          'max-h-max w-11/12 sm:w-7/12 px-4 py-6 self-end',
          'grid grid-cols-[1fr_auto_1fr_auto_1fr] place-items-center gap-5',
          'rounded-md',
        )}
      >
        <Stat stat={100} message='Pacientes' isMajor />
        <Separator orientation='vertical' />
        <Stat stat={yearsOfExperience} message='Años de Experiencia' isMajor />
        <Separator orientation='vertical' />
        <Stat stat={10} message='Servicios Médicos' isMajor />
      </aside>
    </header>
  );
}
