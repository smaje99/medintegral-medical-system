import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { type DetailedHTMLProps, type FC, LiHTMLAttributes } from 'react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { AuthRoutes, Routes } from '@/helpers/routes';
import medintegralIcon from '@/icons/medintegral.svg';
import { cn } from '@/lib/utils';

const Item: FC<DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>> = ({
  className,
  children,
  ...props
}) => {
  return (
    <li
      className={cn(
        `[&:nth-child(-n+5)]:hidden
        sm:[&:nth-child(4)]:inline-block
        sm:[&:nth-child(5)]:inline-block
        lg:[&:nth-child(1)]:inline-block
        lg:[&:nth-child(2)]:inline-block
        lg:[&:nth-child(3)]:inline-block
        lg:last:hidden
        `,
        className,
      )}
      {...props}
    >
      {children}
    </li>
  );
};

const Navbar = () => {
  return (
    <nav
      className={cn(`
        w-screen
        fixed z-10
        flex justify-between items-center flex-nowrap gap-8
        bg-nav
        px-6 py-2
        box-border
        shadow
      `)}
    >
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

      <ul className='flex content-center items-center justify-between gap-6'>
        <Item>
          <Button variant='link' size='icon' className='text-foreground'>
            Item
          </Button>
        </Item>
        <Item>
          <Button variant='link' size='icon' className='text-foreground'>
            Item
          </Button>
        </Item>
        <Item>
          <Button variant='link' size='icon' className='text-foreground'>
            Item
          </Button>
        </Item>
        <Item>
          <Button variant='floating' asChild>
            <Link href={AuthRoutes.SignIn.href}>Iniciar Sesión</Link>
          </Button>
        </Item>
        <Item>
          <ModeToggle />
        </Item>
        <Item>
          <Button variant='ghost' size='icon'>
            <Menu />
          </Button>
        </Item>
      </ul>
    </nav>
  );
};

export default Navbar;
