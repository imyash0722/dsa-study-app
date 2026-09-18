import { cn } from '../../utils/cn';

interface ProgressBarProps {
  value: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export function ProgressBar({ value, max, label, showPercentage = true, size = 'md', className }: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;
  const heights = { sm: 'h-1.5', md: 'h-2.5' };

  return (
    <div className={cn('w-full', className)}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1.5">
          {label && <span className="text-xs text-[var(--color-text-secondary)]">{label}</span>}
          {showPercentage && <span className="text-xs font-mono text-[var(--color-text-tertiary)]">{percentage}%</span>}
        </div>
      )}
      <div className={cn('w-full rounded-full bg-[var(--color-bg-primary)] overflow-hidden', heights[size])}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
