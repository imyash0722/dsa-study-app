import { cn } from '../../utils/cn';

interface OutputDisplayProps {
  output: string;
  title?: string;
  className?: string;
}

export function OutputDisplay({ output, title = 'Output', className }: OutputDisplayProps) {
  const lines = output.split('\n');

  return (
    <div className={cn('rounded-lg overflow-hidden border border-[var(--color-code-border)]', className)}>
      <div className="flex items-center gap-2 px-4 py-2 bg-[var(--color-terminal-bg)] border-b border-[var(--color-code-border)]">
        <svg className="w-4 h-4 text-[var(--color-terminal-prompt)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
        </svg>
        <span className="text-xs font-mono text-[var(--color-text-muted)]">{title}</span>
      </div>
      <div className="bg-[var(--color-terminal-bg)] p-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="text-[var(--color-terminal-text)]">
            {i === 0 && (
              <span className="text-[var(--color-terminal-prompt)] select-none">$ ./a.out{'\n'}</span>
            )}
            {line || '\u00A0'}
          </div>
        ))}
      </div>
    </div>
  );
}
