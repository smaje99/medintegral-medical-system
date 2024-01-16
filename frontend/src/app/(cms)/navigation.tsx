import { IconSettings } from '@tabler/icons-react';

import { Button } from '@/components/ui/button';

export const FoldingNav: React.FC = () => (
  <aside role='menu' className='grid'>
    <Button variant='outline' size='icon' title='Configuración'>
      <IconSettings />
      <span className='sr-only'>Configuración</span>
    </Button>
  </aside>
);
