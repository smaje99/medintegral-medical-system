import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

type Props = Omit<React.HTMLProps<HTMLAnchorElement>, 'className'> & {
  className?: string | ((active: boolean) => string);
};

const NavLink: React.FC<Props> = ({ href, className, children, ...props }) => {
  const { pathname } = useRouter();

  const newClassName = useCallback(() => {
    const isActive = href === pathname;
    return typeof className === 'function' ? className(isActive) : className;
  }, [className, href, pathname]);

  return (
    <Link href={href}>
      <a className={newClassName()} {...props}>
        {children}
      </a>
    </Link>
  );
};

export default NavLink;
