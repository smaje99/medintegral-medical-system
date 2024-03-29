import { IconSettings } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { RolesAndPermissions } from './RolesAndPermissions';

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

const RolesAndPermissionsContent: React.FC = () => (
  <Content value='roles'>
    <RolesAndPermissions />
  </Content>
);

type SettingsProps = {
  readonly onlyIcon?: boolean;
};

export const Settings: React.FC<SettingsProps> = ({ onlyIcon = false }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button
        variant='outline'
        className='flex items-center gap-2'
        aria-label='Botón para ir al panel de configuración'
        size={onlyIcon ? 'icon' : 'default'}
      >
        <IconSettings />
        <span className={onlyIcon ? 'sr-only' : 'text-sm'}>Configuración</span>
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
        <RolesAndPermissionsContent />
      </Tabs>
    </DialogContent>
  </Dialog>
);
