'use client';

import { useRouter } from 'next/navigation';
import { useReducer, useState } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet';
import { CmsRoutes } from '@/helpers/routes';
import { RoleAttributes } from '@/modules/user/role/domain';

import { CreateUserForm } from './CreateUserForm';

const ContentBlock: React.FC<{
  readonly roles: RoleAttributes[];
  readonly showOptionalFields: boolean;
  readonly toggleOptionalFields: () => void;
}> = ({ roles, showOptionalFields, toggleOptionalFields }) => (
  <>
    <label className='mt-4 flex items-center justify-end gap-x-2'>
      <Checkbox checked={showOptionalFields} onCheckedChange={toggleOptionalFields} />
      <span className={'cursor-pointer select-none text-sm font-medium leading-none'}>
        Mostrar campos opcionales
      </span>
    </label>

    <CreateUserForm {...{ roles, showOptionalFields }} />
  </>
);

const ErrorBlock: React.FC = () => (
  <span className='text-error-500 dark:text-error-400 inline-block pt-6'>
    Lo sentimos 😥, no se pueden crear usuarios en este momento. Inténtalo más tarde.
  </span>
);

type Props = {
  readonly roles: RoleAttributes[];
};

export const CreateUserSheet: React.FC<Props> = ({ roles }) => {
  const router = useRouter();

  const [isOpen, setOpen] = useState(true);

  const [showOptionalFields, toggleOptionalFields] = useReducer(
    (state: boolean) => !state,
    false,
  );

  const handleSheetClose = (open: boolean) => {
    setOpen(open);
    router.push(CmsRoutes.Users.href);
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleSheetClose}>
      <SheetContent className='overflow-y-auto'>
        <SheetTitle>Crear usuario</SheetTitle>
        <SheetDescription>
          Crea nuevos usuarios que gestionen la plataforma. Completa el formulario
          haciendo clic en el botón para crear un nuevo usuario cuando estés listo.
        </SheetDescription>

        {roles.length > 0 ? (
          <ContentBlock {...{ roles, showOptionalFields, toggleOptionalFields }} />
        ) : (
          <ErrorBlock />
        )}
      </SheetContent>
    </Sheet>
  );
};
