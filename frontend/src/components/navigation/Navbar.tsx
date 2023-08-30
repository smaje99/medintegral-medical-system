import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type DetailedHTMLProps, type FC, type LiHTMLAttributes } from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AuthRoutes, Route, Routes } from '@/helpers/routes';
import medintegralIcon from '@/icons/medintegral.svg';
import { cn } from '@/lib/utils';

import NavLink from './NavLink';

const items: Route[] = [
  { href: '/', name: 'Servicios' },
  { href: '#', name: 'Citas' },
  { href: '#', name: 'Item' },
];

const Logo: FC = () => (
  <Link href={Routes.Home.href}>
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

const SignIn: FC = () => (
  <Button variant='floating' asChild>
    <Link href={AuthRoutes.SignIn.href}>Iniciar Sesión</Link>
  </Button>
);

const MobileNavigation: FC = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant='ghost' size='icon'>
        <Menu />
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
      <ul className='grid gap-4'>
        {items.map((item) => (
          <SheetClose key={item.href} asChild>
            <li>
              <NavLink
                href={item.href}
                className='hover:text-foreground/80 transition-colors'
                activeClassName='text-foreground/60'
              >
                {item.name}
              </NavLink>
            </li>
          </SheetClose>
        ))}
      </ul>
      <Separator className='my-4' />
      <SheetFooter>
        <ul className=' grid w-full gap-4'>
          <li className='flex flex-nowrap items-center justify-between'>
            <span>Modo oscuro</span>
            <ModeToggle />
          </li>

          <SheetClose asChild>
            <li className='mt-8 text-center'>
              <SignIn />
            </li>
          </SheetClose>
        </ul>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

const Item: FC<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>> = ({
  className,
  children,
  ...props
}) => (
  <li
    className={cn(
      `[&:nth-child(-n+5)]:hidden
        sm:[&:nth-child(4)]:inline-block
        sm:[&:nth-child(5)]:inline-block
        lg:[&:nth-child(1)]:inline-block
        lg:[&:nth-child(2)]:inline-block
        lg:[&:nth-child(3)]:inline-block
        lg:last:hidden`,
      className,
    )}
    {...props}
  >
    {children}
  </li>
);

const Navbar: FC = () => (
  <nav
    className={cn(
      `w-screen
      fixed z-10
      flex justify-between items-center flex-nowrap gap-8
      bg-nav
      px-6 py-2
      box-border
      shadow`,
    )}
  >
    <Logo />

    <ul className='flex content-center items-center justify-between gap-6'>
      {items.map((item) => (
        <Item key={item.href}>
          <NavLink
            href={item.href}
            className='hover:text-foreground/80 transition-colors'
            activeClassName='text-foreground/60'
          >
            {item.name}
          </NavLink>
        </Item>
      ))}

      <Item>
        <SignIn />
      </Item>

      <Item>
        <ModeToggle />
      </Item>

      <Item>
        <MobileNavigation />
      </Item>
    </ul>
  </nav>
);

export default Navbar;
