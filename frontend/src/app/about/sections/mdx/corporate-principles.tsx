import { ListTodo } from 'lucide-react';
import {
  type DetailedHTMLProps,
  type HTMLAttributes,
  type LiHTMLAttributes,
} from 'react';

export const CorporateGroup = ({
  children,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement>) => (
  <ul className='w-full list-none pl-0' {...props}>
    {children}
  </ul>
);

export const CorporatePrinciple = ({
  children,
  ...props
}: DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>) => (
  <li className='flex items-start justify-start gap-4' {...props}>
    <div className='text-secondary-600 mt-1'>
      <ListTodo size={24} />
    </div>
    <span className='text-pretty'>{children}</span>
  </li>
);
