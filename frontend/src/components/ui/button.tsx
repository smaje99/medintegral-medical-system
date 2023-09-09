import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  `ring-offset-background
  focus-visible:ring-ring
  inline-flex
  items-center
  justify-center
  rounded-md
  text-sm
  font-medium
  transition-colors
  focus-visible:outline-none
  focus-visible:ring-2
  focus-visible:ring-offset-2
  disabled:pointer-events-none
  disabled:opacity-50`,
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: `
          bg-destructive
          text-destructive-foreground
          hover:bg-destructive/90
        `,
        outline: `
          border-input
          bg-background
          hover:bg-accent
          hover:text-accent-foreground
          border
        `,
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary cursor-pointer underline-offset-4 hover:underline',
        floating: `
          bg-primary
          text-primary-50 dark:text-primary-950
          hover:bg-primary-600 dark:hover:bg-primary-300
          active:bg-primary-700 dark:active:bg-primary-500
          cursor-pointer
          font-bold
          tracking-wide
        `,
        'floating-secondary': `
          bg-secondary
          text-secondary-50 dark:text-secondary-950
          hover:bg-secondary-600 dark:hover:bg-secondary-300
          active:bg-secondary-700 dark:active:bg-secondary-500
          cursor-pointer
          font-bold
          tracking-wide
        `,
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
