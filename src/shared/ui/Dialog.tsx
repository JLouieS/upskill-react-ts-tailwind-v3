import type { ReactNode } from 'react';

import { cn } from '../lib/cn';

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
};

export function Dialog({
  open,
  onOpenChange,
  title,
  children,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
    >
      <button
        type="button"
        aria-label="Close dialog"
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      <div
        className={cn(
          'relative z-10 w-full max-w-md rounded-card bg-background p-6 shadow-lg'
        )}
      >
        <h2 id="dialog-title" className="text-lg font-semibold text-foreground">
          {title}
        </h2>

        <div className="mt-4">
          {children}
        </div>

        <button
          type="button"
          className="mt-6 text-sm text-foreground"
          onClick={() => onOpenChange(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
}