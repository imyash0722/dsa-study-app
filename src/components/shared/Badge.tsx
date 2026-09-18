import { cn } from '../../utils/cn';
import type { DifficultyLevel } from '../../types';

type BadgeVariant = 'default' | 'beginner' | 'intermediate' | 'advanced' | 'accent' | 'success' | 'warning' | 'error';

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]',
  beginner: 'bg-[var(--color-success-bg)] text-[var(--color-diff-beginner)]',
  intermediate: 'bg-[var(--color-warning-bg)] text-[var(--color-diff-intermediate)]',
  advanced: 'bg-[var(--color-error-bg)] text-[var(--color-diff-advanced)]',
  accent: 'bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)]',
  success: 'bg-[var(--color-success-bg)] text-[var(--color-success)]',
  warning: 'bg-[var(--color-warning-bg)] text-[var(--color-warning)]',
  error: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
};

export function Badge({ text, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 text-[11px] font-semibold rounded-full uppercase tracking-wide',
      variantStyles[variant],
      className
    )}>
      {text}
    </span>
  );
}

/** Convenience wrapper that maps DifficultyLevel to the correct badge variant */
export function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  return <Badge text={level} variant={level} />;
}
