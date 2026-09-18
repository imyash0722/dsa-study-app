import type { LineAnnotation } from '../../types';
import { cn } from '../../utils/cn';

interface LineByLineBreakdownProps {
  annotations: LineAnnotation[];
  className?: string;
}

export function LineByLineBreakdown({ annotations, className }: LineByLineBreakdownProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {annotations.map((ann, i) => (
        <div
          key={ann.lineNumber}
          className={cn(
            'flex gap-4 py-3 border-b border-[var(--color-border-primary)] last:border-0',
            i % 2 === 0 ? 'bg-transparent' : 'bg-[var(--color-bg-primary)]/30'
          )}
        >
          {/* Line number */}
          <div className="flex-shrink-0 w-10 text-right">
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-md bg-[var(--color-accent-glow)] text-[var(--color-accent-primary)] text-xs font-mono font-bold">
              {ann.lineNumber}
            </span>
          </div>

          {/* Code + explanation */}
          <div className="flex-1 min-w-0">
            <code className="block text-sm font-mono text-[var(--color-code-function)] mb-1 truncate">
              {ann.code}
            </code>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              {ann.explanation}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
