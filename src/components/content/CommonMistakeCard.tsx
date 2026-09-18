import type { CommonMistake } from '../../types';
import { CodeBlock } from './CodeBlock';
import { cn } from '../../utils/cn';

interface CommonMistakeCardProps {
  mistake: CommonMistake;
  className?: string;
}

export function CommonMistakeCard({ mistake, className }: CommonMistakeCardProps) {
  return (
    <div className={cn('glass-card p-5 border-l-4 border-[var(--color-error)] space-y-4', className)}>
      <div>
        <h3 className="text-base font-semibold text-[var(--color-text-primary)] flex items-center gap-2">
          <span className="text-lg">⚠️</span>
          {mistake.title}
        </h3>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">{mistake.explanation}</p>
      </div>

      {/* Side-by-side code comparison */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-error)]" />
            <span className="text-xs font-semibold text-[var(--color-error)] uppercase tracking-wide">Wrong</span>
          </div>
          <CodeBlock code={mistake.wrongCode} showLineNumbers={false} />
        </div>
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="w-2 h-2 rounded-full bg-[var(--color-success)]" />
            <span className="text-xs font-semibold text-[var(--color-success)] uppercase tracking-wide">Correct</span>
          </div>
          <CodeBlock code={mistake.correctCode} showLineNumbers={false} />
        </div>
      </div>

      {/* Consequence */}
      <div className="p-3 rounded-lg bg-[var(--color-error-bg)] border border-[var(--color-error)]/20">
        <p className="text-sm text-[var(--color-error)]">
          <strong className="font-semibold">What happens:</strong> {mistake.consequence}
        </p>
      </div>
    </div>
  );
}
