import type { DryRunStep } from '../../types';
import { cn } from '../../utils/cn';

interface DryRunTableProps {
  steps: DryRunStep[];
  className?: string;
}

export function DryRunTable({ steps, className }: DryRunTableProps) {
  if (steps.length === 0) return null;

  const allVarNames = Array.from(
    new Set(steps.flatMap((s) => Object.keys(s.variables)))
  );

  return (
    <div className={cn('rounded-lg border border-[var(--color-border-primary)] overflow-hidden', className)}>
      <div className="px-4 py-2.5 bg-[var(--color-bg-card)] border-b border-[var(--color-border-primary)]">
        <h4 className="text-sm font-semibold text-[var(--color-text-primary)]">Dry Run Trace</h4>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-[var(--color-bg-tertiary)]">
              <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-tertiary)] border-b border-[var(--color-border-primary)] w-16">Step</th>
              <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-tertiary)] border-b border-[var(--color-border-primary)] w-16">Line</th>
              {allVarNames.map((name) => (
                <th key={name} className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-accent-primary)] border-b border-[var(--color-border-primary)] font-mono min-w-[80px]">{name}</th>
              ))}
              <th className="px-3 py-2 text-left text-xs font-semibold text-[var(--color-text-tertiary)] border-b border-[var(--color-border-primary)] min-w-[100px]">Output</th>
            </tr>
          </thead>
          <tbody>
            {steps.map((step, i) => (
              <tr key={step.step} className={cn('border-b border-[var(--color-border-primary)] last:border-0 hover:bg-[var(--color-bg-hover)]/50 transition-colors', i % 2 === 0 ? 'bg-[var(--color-bg-secondary)]/50' : 'bg-transparent')}>
                <td className="px-3 py-2.5 text-xs font-mono text-[var(--color-text-muted)]">{step.step}</td>
                <td className="px-3 py-2.5 text-xs font-mono text-[var(--color-accent-tertiary)]">L{step.line}</td>
                {allVarNames.map((name) => {
                  const val = step.variables[name];
                  const prevVal = i > 0 ? steps[i - 1].variables[name] : undefined;
                  const changed = val !== prevVal && val !== undefined;
                  return (
                    <td key={name} className={cn('px-3 py-2.5 text-xs font-mono', changed ? 'text-[var(--color-warning)] font-semibold' : 'text-[var(--color-text-secondary)]')}>
                      {val ?? '—'}
                    </td>
                  );
                })}
                <td className="px-3 py-2.5 text-xs font-mono text-[var(--color-terminal-text)]">{step.output || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
