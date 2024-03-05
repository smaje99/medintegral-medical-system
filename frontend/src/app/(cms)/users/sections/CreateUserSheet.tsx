'use client';

import { IconUserPlus } from '@tabler/icons-react';
import { useReducer, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RoleAttributes } from '@/modules/user/role/domain';

import { CreateUserForm } from './CreateUserForm';

type Props = {
  readonly roles: RoleAttributes[];
};

export const CreateUserSheet: React.FC<Props> = ({ roles }) => {
  const [isOpen, setOpen] = useState(false);
  const [showOptionalFields, toggleOptionalFields] = useReducer(
    (state: boolean) => !state,
    false,
  );

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
      <SheetContent className='overflow-y-auto'>
        <SheetTitle>Crear usuario</SheetTitle>
        <SheetDescription>
          Crea nuevos usuarios que gestionen la plataforma. Completa el formulario
          haciendo clic en el botón para crear un nuevo usuario cuando estés listo.
        </SheetDescription>

        {roles.length > 0 ? (
          <>
            <label className='mt-4 flex items-center justify-end gap-x-2'>
              <Checkbox
                checked={showOptionalFields}
                onCheckedChange={toggleOptionalFields}
              />
              <span
                className={'cursor-pointer select-none text-sm font-medium leading-none'}
              >
                Mostrar campos opcionales
              </span>
            </label>

            <CreateUserForm {...{ roles, showOptionalFields, setOpenSheet: setOpen }} />
          </>
        ) : (
          <span className='text-error-500 dark:text-error-400 inline-block pt-6'>
            Lo sentimos 😥, no se pueden crear usuarios en este momento. Inténtalo más
            tarde.
          </span>
        )}
      </SheetContent>
    </Sheet>
  );
};
