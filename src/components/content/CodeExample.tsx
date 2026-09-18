import { CodeBlock } from './CodeBlock';
import { OutputDisplay } from './OutputDisplay';
import { LineByLineBreakdown } from './LineByLineBreakdown';
import { BookmarkButton } from '../shared/BookmarkButton';
import { Accordion } from '../shared/Accordion';
import type { CodeExample as CodeExampleType } from '../../types';
import { cn } from '../../utils/cn';

interface CodeExampleProps {
  example: CodeExampleType;
  className?: string;
}

export function CodeExample({ example, className }: CodeExampleProps) {
  return (
    <div className={cn('glass-card p-5 space-y-4', className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-[var(--color-text-primary)]">{example.title}</h3>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">{example.explanation}</p>
        </div>
        <BookmarkButton
          id={`bm-ex-${example.id}`}
          type="example"
          targetId={example.id}
          title={example.title}
        />
      </div>

      {/* Code */}
      <CodeBlock
        code={example.code}
        title={`${example.title}.c`}
        highlightLines={example.lineBreakdown.map((l) => l.lineNumber)}
      />

      {/* Output */}
      {example.expectedOutput && (
        <OutputDisplay output={example.expectedOutput} />
      )}

      {/* Line-by-Line Breakdown (collapsible) */}
      {example.lineBreakdown.length > 0 && (
        <Accordion title="Line-by-Line Breakdown" defaultOpen={false}>
          <LineByLineBreakdown annotations={example.lineBreakdown} />
        </Accordion>
      )}
    </div>
  );
}
