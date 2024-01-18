import { IconSettings } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Content: React.FC<{
  readonly value: string;
  readonly children: React.ReactNode;
}> = ({ value, children }) => (
  <TabsContent value={value} className='m-0 box-border size-full p-8'>
    {children}
  </TabsContent>
);

const Item: React.FC<{ readonly value: string; readonly children: React.ReactNode }> = ({
  value,
  children,
}) => (
  <TabsTrigger value={value} className='text-left text-sm'>
    {children}
  </TabsTrigger>
);

const RolesAndPermissionContent: React.FC = () => (
  <Content value='roles'>
    <div className='flex items-center justify-between'>
      <h2 className='text-xl'>Roles y permisos</h2>
      <Button size='sm' className='h-max'>
        Crear rol
      </Button>
    </div>
    <Separator />
  </Content>
);

export const Settings: React.FC = () => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant='outline'
        className='flex items-center gap-2'
        aria-label='Botón para ir al panel de configuración'
      >
        <IconSettings />
        <span className='text-sm'>Configuración</span>
      </Button>
    </DialogTrigger>
    <DialogContent className='max-w-2xl p-0'>
      <Tabs
        defaultValue='roles'
        className='box-border grid grid-cols-[25%_75%] gap-0 overflow-x-hidden'
      >
        <TabsList className='sticky box-border grid h-full grid-cols-1 gap-5 p-3'>
          <Item value='roles'>Roles y permisos</Item>
        </TabsList>
        <RolesAndPermissionContent />
      </Tabs>
    </DialogContent>
  </Dialog>
);
