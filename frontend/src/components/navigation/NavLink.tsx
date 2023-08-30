'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { type ReactNode, useMemo } from 'react';

import { cn } from '@/lib/utils';

type Props = LinkProps & {
  className?: string;
  activeClassName?: string;
  children: ReactNode;
};

const NavLink: React.FC<Props> = ({ className, activeClassName, children, ...props }) => {
  const pathname = usePathname();

  const isActive = useMemo<boolean>(
    () => pathname === props.href,
    [pathname, props.href],
  );

  const classNameProp = [className, isActive && activeClassName];

  return (
    <Link className={cn(classNameProp)} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
