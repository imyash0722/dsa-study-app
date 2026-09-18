import { useState } from 'react';
import type { TheoryQuestion } from '../../types';
import { cn } from '../../utils/cn';

interface TrueFalseCardProps {
  question: TheoryQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function TrueFalseCard({ question, onAnswer, className }: TrueFalseCardProps) {
  const [selected, setSelected] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === question.correctAnswer;

  function handleSelect(value: boolean) {
    if (submitted) return;
    setSelected(value);
    setSubmitted(true);
    onAnswer?.(value === question.correctAnswer);
  }

  return (
    <div className={cn('glass-card p-5 space-y-4', className)}>
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{question.question}</p>

      {question.code && (
        <pre className="bg-[var(--color-code-bg)] border border-[var(--color-code-border)] rounded-lg p-3 text-sm font-mono text-[var(--color-terminal-text)] overflow-x-auto">
          {question.code}
        </pre>
      )}

      <div className="flex gap-3">
        {[true, false].map((val) => {
          const isThis = selected === val;
          const isAnswer = question.correctAnswer === val;
          return (
            <button
              key={String(val)}
              onClick={() => handleSelect(val)}
              disabled={submitted}
              className={cn(
                'flex-1 py-3 rounded-lg text-sm font-semibold border transition-all',
                !submitted && 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] hover:bg-[var(--color-bg-hover)] text-[var(--color-text-primary)]',
                submitted && isAnswer && 'border-[var(--color-success)] bg-[var(--color-success-bg)] text-[var(--color-success)]',
                submitted && isThis && !isAnswer && 'border-[var(--color-error)] bg-[var(--color-error-bg)] text-[var(--color-error)]',
                submitted && !isThis && !isAnswer && 'opacity-40'
              )}
            >
              {val ? 'True' : 'False'}
            </button>
          );
        })}
      </div>

      {submitted && (
        <div className={cn('p-3 rounded-lg text-sm animate-fade-in', isCorrect ? 'bg-[var(--color-success-bg)] text-[var(--color-success)]' : 'bg-[var(--color-error-bg)] text-[var(--color-error)]')}>
          <p className="font-semibold mb-1">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
          <p className="text-[var(--color-text-secondary)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
