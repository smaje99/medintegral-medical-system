'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { CreateRoleForm } from './CreateRoleForm';

export const CreateRoleSheet: React.FC = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button size='sm' className='h-max'>
          Crear rol
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Crear rol</SheetTitle>
          <SheetDescription>
            Crea nuevos roles para administrar la plataforma. Completa el formulario
            haciendo clic en el botón para crear un nuevo rol cuando estés listo.
          </SheetDescription>
        </SheetHeader>
        <CreateRoleForm setOpenSheet={setOpen} />
      </SheetContent>
    </Sheet>
  );
};
