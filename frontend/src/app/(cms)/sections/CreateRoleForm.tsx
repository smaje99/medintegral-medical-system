'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { type FieldAttributes, FormUI } from '@/components/form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { SheetFooter } from '@/components/ui/sheet';
import { RoleSaveDTO, type RoleSaveDtoType } from '@/modules/user/role/domain';
import { roleCreateController } from '@/modules/user/role/infrastructure/roleContainer';

const fields: FieldAttributes<RoleSaveDtoType>[] = [
  {
    type: 'text',
    name: 'name',
    label: 'Nombre del rol',
    placeholder: 'Ingresa el nombre del rol',
  },
  {
    type: 'textarea',
    name: 'description',
    label: 'Descripción del rol',
    placeholder: 'Ingresa la descripción del rol',
  },
];

type Props = {
  setOpenSheet: (isOpen: boolean) => void;
};

export const CreateRoleForm: React.FC<Props> = ({ setOpenSheet }) => {
  const form = useForm<RoleSaveDtoType>({
    resolver: zodResolver(RoleSaveDTO),
  });

  const onSubmit = async (data: RoleSaveDtoType) => {
    roleCreateController.run(data, setOpenSheet);
  };

  return (
    <Form {...form}>
      <FormUI fields={fields} onSubmit={onSubmit} className='mt-8 space-y-8'>
        <SheetFooter>
          <Button type='submit'>Crear rol</Button>
        </SheetFooter>
      </FormUI>
    </Form>
  );
};
