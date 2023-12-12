import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from 'react';

import { cn } from '@/lib/utils';

export const EthicalGroup = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul
    className={cn(`
      grid
      w-full
      auto-rows-fr
      gap-x-3 gap-y-1
      grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))]
      grid-flow-dense
      pl-0
      list-none
    `)}
    {...props}
  >
    {children}
  </ul>
);

export const EthicalPrinciple = ({
  children,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
  <li
    className={cn(`
    bg-secondary-600
      text-white
      inline-block
      rounded-xl
      p-2
      text-lg
      text-center
      tracking-wide
      shadow-md
    `)}
    {...props}
  >
    {children}
  </li>
);
