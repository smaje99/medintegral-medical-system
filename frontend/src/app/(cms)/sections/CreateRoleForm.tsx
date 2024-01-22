'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SheetFooter } from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';
import { RoleSaveDTO, type RoleSaveDtoType } from '@/modules/user/role/domain';
import { roleCreateController } from '@/modules/user/role/infrastructure/roleContainer';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-8'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del rol</FormLabel>
              <FormControl>
                <Input placeholder='Ingresa el nombre del rol' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='description'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción del rol</FormLabel>
              <FormControl>
                <Textarea placeholder='Ingresa la descripción del rol' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetFooter>
          <Button type='submit'>Crear rol</Button>
        </SheetFooter>
      </form>
    </Form>
  );
};
