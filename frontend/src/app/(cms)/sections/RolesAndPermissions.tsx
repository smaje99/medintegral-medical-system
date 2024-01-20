import { Separator } from '@/components/ui/separator';

import { CreateRoleSheet } from './CreateRoleSheet';

export const RolesAndPermissions: React.FC = () => (
  <>
    <div className='flex items-center justify-between'>
      <h2 className='text-xl'>Roles y permisos</h2>
      <CreateRoleSheet />
    </div>
    <Separator />
  </>
);
