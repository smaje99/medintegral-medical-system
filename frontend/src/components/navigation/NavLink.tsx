'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

type Props = LinkProps & {
  children: React.ReactNode;
  className: string | ((active: boolean) => string);
};

const NavLink: React.FC<Props> = ({ className, children, ...props }) => {
  const pathname = usePathname();

  const isActive = useMemo<boolean>(
    () => pathname === props.href,
    [pathname, props.href],
  );

  const newClassName = useMemo<string>(
    () => (typeof className === 'function' ? className(isActive) : className),
    [isActive, className],
  );

  return (
    <Link className={newClassName} {...props}>
      {children}
    </Link>
  );
};

export default NavLink;
