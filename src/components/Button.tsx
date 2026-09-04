import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../lib/cn'

const VARIANTS = {
  primary: "bg-brand-500 text-white hover:bg-brand-600",
  secondary: "bg-transparent border border-brand-500 text-brand-500",
  danger: "bg-red-600 text-white hover:bg-red-700",
} satisfies Record<string, string>;

type ButtonProps =
  ComponentPropsWithoutRef<'button'> & {
    variant?: keyof typeof VARIANTS
  }

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'rounded-card font-medium px-4 py-2',
        VARIANTS[variant],
        className
      )}
    />
  )
}