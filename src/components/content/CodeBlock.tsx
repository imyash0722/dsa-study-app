import { useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/components/prism-c';
import { cn } from '../../utils/cn';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  title?: string;
  className?: string;
}

export function CodeBlock({
  code,
  language = 'c',
  showLineNumbers = true,
  highlightLines = [],
  title,
  className,
}: CodeBlockProps) {
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code]);

  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
  };

  return (
    <div className={cn('rounded-lg overflow-hidden border border-[var(--color-code-border)]', className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[var(--color-code-bg)] border-b border-[var(--color-code-border)]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          {title && <span className="text-xs text-[var(--color-text-muted)] ml-2 font-mono">{title}</span>}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 text-[11px] text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)] bg-[var(--color-bg-primary)]/50 hover:bg-[var(--color-bg-hover)] rounded transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          Copy
        </button>
      </div>

      {/* Code area */}
      {showLineNumbers ? (
        <div className="overflow-x-auto bg-[var(--color-code-bg)] text-xs md:text-sm">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, i) => (
                <tr
                  key={i}
                  className={cn(highlightLines.includes(i + 1) && 'bg-[var(--color-code-line-highlight)]')}
                >
                  <td className="w-8 md:w-10 px-1 md:px-3 py-0 text-right text-[var(--color-text-muted)] text-[10px] md:text-xs font-mono select-none border-r border-[var(--color-code-border)] align-top leading-[1.7]">
                    {i + 1}
                  </td>
                  <td className="px-4 py-0">
                    <pre className="!bg-transparent !border-0 !p-0 !m-0">
                      <code
                        ref={i === 0 ? codeRef : undefined}
                        className={`language-${language}`}
                        style={{ background: 'transparent' }}
                      >
                        {line || ' '}
                      </code>
                    </pre>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="overflow-x-auto bg-[var(--color-code-bg)] text-xs md:text-sm">
          <pre className="!rounded-none !border-0 !m-0 min-w-max">
            <code ref={codeRef} className={`language-${language}`}>
              {code}
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
