import { Separator } from '@/components/ui/separator';

import { CreateUserSheet } from './sections/CreateUserSheet';

export default function UsersPage(): React.JSX.Element {
  return (
    <main className='m-4'>
      <section className='mb-1 flex items-center justify-between'>
        <h1 className='text-2xl'>Usuarios</h1>

        <CreateUserSheet />
      </section>
      <Separator />
    </main>
  );
}
