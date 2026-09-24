import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '../lib/cn';

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
} satisfies Record<string, string>;

type InputProps = Omit<ComponentPropsWithoutRef<'input'>, 'size'> & {
  size?: keyof typeof SIZES;
};

export function Input({
  size = 'md',
  className,
  ...props
}: InputProps) {
  return (
    <input
      {...props}
      className={cn(
        'w-full rounded-card border border-border bg-background text-foreground outline-none',
        'focus:ring-2 focus:ring-brand-500',
        SIZES[size],
        className
      )}
    />
  );
}