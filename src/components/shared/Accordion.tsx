import { useState, type ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
  icon?: ReactNode;
  className?: string;
}

export function Accordion({ title, children, defaultOpen = false, icon, className }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={cn('border border-[var(--color-border-primary)] rounded-lg overflow-hidden', className)}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[var(--color-bg-card)] hover:bg-[var(--color-bg-hover)] transition-colors text-left"
      >
        <svg
          className={cn('w-4 h-4 text-[var(--color-text-tertiary)] transition-transform duration-200', open && 'rotate-90')}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        {icon && <span className="text-[var(--color-accent-primary)]">{icon}</span>}
        <span className="flex-1 text-sm font-medium text-[var(--color-text-primary)]">{title}</span>
      </button>
      {open && (
        <div className="px-4 py-3 bg-[var(--color-bg-secondary)] border-t border-[var(--color-border-primary)] animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
}
