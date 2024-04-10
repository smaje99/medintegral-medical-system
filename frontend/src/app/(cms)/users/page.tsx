import { IconUserPlus } from '@tabler/icons-react';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CmsRoutes } from '@/helpers/routes';
import { cn } from '@/lib/utils';

export default async function UsersPage() {
  return (
    <main className='m-4'>
      <section className='mb-1 flex items-center justify-between'>
        <h1 className='m-0 text-2xl'>Usuarios</h1>

        <Link
          href={CmsRoutes.CreateUser.href}
          className={cn(buttonVariants({ size: 'sm' }), 'inline-flex items-center gap-2')}
          title={CmsRoutes.CreateUser.name}
        >
          <IconUserPlus />
          <span className='hidden md:inline-block'>{CmsRoutes.CreateUser.name}</span>
          <span className='sr-only'>{CmsRoutes.CreateUser.name}</span>
        </Link>
      </section>
      <Separator />
    </main>
  );
}
