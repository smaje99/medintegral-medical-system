import { Separator } from '@/components/ui/separator';
import { roleGetAllController } from '@/modules/user/role/infrastructure/roleContainer';

import { CreateUserSheet } from './sections/CreateUserSheet';

export default async function UsersPage() {
  const roles = await roleGetAllController.run();

  return (
    <main className='m-4'>
      <section className='mb-1 flex items-center justify-between'>
        <h1 className='m-0 text-2xl'>Usuarios</h1>

        <CreateUserSheet roles={roles.map((role) => role.toPrimitives())} />
      </section>
      <Separator />
    </main>
  );
}
