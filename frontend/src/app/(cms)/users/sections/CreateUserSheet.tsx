'use client';

import { IconUserPlus } from '@tabler/icons-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export const CreateUserSheet: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          size='sm'
          className='inline-flex items-center gap-2'
          title='Crear usuario'
        >
          <IconUserPlus />
          <span className='hidden md:inline-block'>Crear usuario</span>
          <span className='sr-only'>Crear usuario</span>
        </Button>
      </SheetTrigger>
      <SheetContent className='overflow-y-scroll'>
        <SheetTitle>Crear usuario</SheetTitle>
        <SheetDescription>
          Crea nuevos usuarios que gestionen la plataforma. Completa el formulario
          haciendo clic en el botón para crear un nuevo usuario cuando estés listo.
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
