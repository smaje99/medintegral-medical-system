'use client';

import {
  IconLayoutSidebarLeftCollapse,
  IconLayoutSidebarLeftExpand,
  IconMenu2,
  IconUsers,
} from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { NavLink } from '@/components/nav-link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { CmsRoutes } from '@/helpers/routes';
import medintegralIcon from '@/icons/medintegral.svg';
import { cn } from '@/lib/utils';

import { Settings } from './sections/Settings';

const Logo: React.FC = () => (
  <Link href={CmsRoutes.Dashboard.href}>
    <Image
      src={medintegralIcon}
      alt='Medintegral IPS S.A.S'
      width={195}
      height={48}
      className='h-12 w-full hover:drop-shadow'
      priority
    />
  </Link>
);

type MenuContentProps = {
  readonly collapsed?: boolean;
};

const MenuContent: React.FC<MenuContentProps> = ({ collapsed = false }) => (
  <section className='mb-8 flex w-full flex-col gap-2'>
    {!collapsed ? (
      <span
        className={cn(
          'text-xs font-semibold tracking-wider',
          'text-secondary-900 dark:text-secondary-100',
          'mx-4 mt-4',
        )}
      >
        General
      </span>
    ) : null}
    <ul className='w-full list-none'>
      <li>
        <NavLink
          href={CmsRoutes.Users.href}
          className={cn(
            'w-full',
            'inline-flex items-center gap-2',
            'px-4 py-2',
            'hover:bg-background',
            collapsed && 'justify-center',
          )}
          activeClassName='border-secondary-700 border-l-4 bg-background'
          title='Usuarios'
          aria-label='Enlace a usuarios'
        >
          <IconUsers className='text-secondary-700' />
          <span className={collapsed ? 'sr-only' : 'text-sm'}>
            {CmsRoutes.Users.name}
          </span>
        </NavLink>
      </li>
    </ul>
  </section>
);

const MobileNavigation: React.FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant='ghost' size='icon' className='sm:hidden'>
        <IconMenu2 />
        <span className='sr-only'>Menú alterno</span>
      </Button>
    </SheetTrigger>
    <SheetContent side='left'>
      <SheetHeader>
        <SheetTitle asChild>
          <Logo />
        </SheetTitle>
      </SheetHeader>
      <Separator className='my-4' />

      <MenuContent />

      <Separator className='my-4' />
      <SheetFooter>
        <ul className='grid w-full gap-4'>
          <li className='flex flex-nowrap items-center justify-between'>
            <span>Modo oscuro</span>
            <ModeToggle />
          </li>
          <li className='grid'>
            <Settings />
          </li>
        </ul>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

type NavbarProps = {
  readonly collapsed: boolean;
  readonly setCollapsed: (value: boolean) => void;
};

const Navbar: React.FC<NavbarProps> = ({ collapsed, setCollapsed }) => (
  <nav
    className={cn(
      'fixed top-0 z-50',
      'w-full',
      'flex items-center flex-nowrap gap-8',
      'border-b border-surface-300 dark:border-surface-600',
      'bg-nav',
      'px-6 py-2',
      'box-border',
      'shadow',
    )}
  >
    <MobileNavigation />
    <Button
      variant='ghost'
      size='icon'
      className='hidden sm:inline-flex'
      onClick={() => setCollapsed(!collapsed)}
    >
      {collapsed ? <IconLayoutSidebarLeftExpand /> : <IconLayoutSidebarLeftCollapse />}
    </Button>
    <Logo />
  </nav>
);

type FoldingNavProps = {
  readonly collapsed: boolean;
};

const FoldingNav: React.FC<FoldingNavProps> = ({ collapsed }) => (
  <aside
    className={cn(
      'relative',
      'hidden sm:block',
      collapsed ? 'w-[72px]' : 'w-[240px]',
      'h-[calc(100dvh-4rem)]',
      'transition-[width] duration-500 ease-in',
    )}
    aria-label='sidebar'
  >
    <div
      className={cn(
        'fixed z-30',
        collapsed ? 'w-[72px]' : 'w-[240px]',
        'h-[calc(100dvh-4rem)]',
        'flex flex-col items-start justify-between',
        'bg-nav',
        'border-r border-surface-300 dark:border-surface-600',
        'transition-[width] duration-500 ease-in',
      )}
    >
      <MenuContent collapsed={collapsed} />
      <section
        className={cn('flex items-center gap-4 mb-2 px-4', collapsed && 'flex-col')}
      >
        <ModeToggle />
        <Settings onlyIcon={collapsed} />
      </section>
    </div>
  </aside>
);

export const Navigation: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    function handleResize() {
      setCollapsed(
        (value) =>
          (!value && window.innerWidth > 640 && window.innerWidth < 768) || value,
      );
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <Navbar {...{ collapsed, setCollapsed }} />
      <FoldingNav {...{ collapsed }} />
    </>
  );
};
