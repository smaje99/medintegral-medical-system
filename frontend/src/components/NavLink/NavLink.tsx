import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import type { NavLinkProps } from './NavLink.types';

const NavLink = ({ href, className, children, ...props }: NavLinkProps) => {
    const { pathname } = useRouter();
    const [newClassName, setNewClassName] = useState('');

    const isActive = () => href === pathname;

    const getClassName = () => (
        typeof className === 'function'
            ? className(isActive())
            : className
    )

    useEffect(() => {
        setNewClassName(getClassName())
    }, [className]);

    return (
        <Link href={href} {...props}>
            <a className={newClassName}>
                {children}
            </a>
        </Link>
    )
}

export default NavLink;