import { ModeToggle } from '@/components/mode-toggle';

import { Settings } from './sections/Settings';

export const FoldingNav: React.FC = () => (
  <aside className='grid'>
    <Settings />
    <ModeToggle />
  </aside>
);
