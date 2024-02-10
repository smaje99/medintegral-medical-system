'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { type AnchorHTMLAttributes, type ReactNode, useMemo } from 'react';

import { cn } from '@/lib/utils';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    className?: string;
    activeClassName?: string;
    children: ReactNode;
  };

export const NavLink: React.FC<Props> = ({
  className,
  activeClassName,
  children,
  ...props
}) => {
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
