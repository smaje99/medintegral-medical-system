import { ModeToggle } from '@/components/mode-toggle';

import { Settings } from './settings';

export const FoldingNav: React.FC = () => (
  <aside className='grid'>
    <Settings />
    <ModeToggle />
  </aside>
);
