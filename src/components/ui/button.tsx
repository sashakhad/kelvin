import * as React from 'react';
import { Slot } from 'radix-ui';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-mono text-xs font-medium tracking-[0.14em] uppercase whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void",
  {
    variants: {
      variant: {
        default: 'bg-cyan text-void hover:bg-cyan/80',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline:
          'border border-silver/40 bg-transparent text-silver hover:border-cyan hover:text-cyan',
        secondary: 'bg-magenta text-white hover:bg-magenta/80',
        ghost: 'text-silver hover:text-cyan',
        link: 'text-cyan underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 rounded-sm px-5',
        sm: 'h-9 rounded-sm px-3',
        lg: 'h-12 rounded-sm px-6 text-sm',
        icon: 'size-11 rounded-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot='button'
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
