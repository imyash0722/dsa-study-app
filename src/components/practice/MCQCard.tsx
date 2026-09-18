import { useState } from 'react';
import type { TheoryQuestion } from '../../types';
import { cn } from '../../utils/cn';

interface MCQCardProps {
  question: TheoryQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function MCQCard({ question, onAnswer, className }: MCQCardProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = selected === question.correctAnswer;

  function handleSubmit() {
    if (!selected) return;
    setSubmitted(true);
    onAnswer?.(isCorrect);
  }

  return (
    <div className={cn('glass-card p-5 space-y-4', className)}>
      <p className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">{question.question}</p>

      {question.code && (
        <pre className="bg-[var(--color-code-bg)] border border-[var(--color-code-border)] rounded-lg p-3 text-sm font-mono text-[var(--color-terminal-text)] overflow-x-auto">
          {question.code}
        </pre>
      )}

      <div className="space-y-2">
        {question.options?.map((option, i) => {
          const letter = String.fromCharCode(65 + i);
          const isThis = selected === option;
          const isAnswer = option === question.correctAnswer;

          return (
            <button
              key={i}
              onClick={() => !submitted && setSelected(option)}
              disabled={submitted}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left text-sm transition-all',
                !submitted && !isThis && 'border-[var(--color-border-primary)] hover:border-[var(--color-border-secondary)] hover:bg-[var(--color-bg-hover)]',
                !submitted && isThis && 'border-[var(--color-accent-primary)] bg-[var(--color-accent-glow)]',
                submitted && isAnswer && 'border-[var(--color-success)] bg-[var(--color-success-bg)]',
                submitted && isThis && !isAnswer && 'border-[var(--color-error)] bg-[var(--color-error-bg)]',
                submitted && !isThis && !isAnswer && 'opacity-50'
              )}
            >
              <span className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 border',
                !submitted && isThis ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]' : 'border-[var(--color-border-secondary)] text-[var(--color-text-muted)]',
                submitted && isAnswer && 'border-[var(--color-success)] text-[var(--color-success)] bg-[var(--color-success-bg)]',
                submitted && isThis && !isAnswer && 'border-[var(--color-error)] text-[var(--color-error)]'
              )}>
                {submitted && isAnswer ? '✓' : submitted && isThis && !isAnswer ? '✗' : letter}
              </span>
              <span className="text-[var(--color-text-primary)]">{option}</span>
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selected}
          className={cn(
            'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
            selected
              ? 'bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white'
              : 'bg-[var(--color-bg-hover)] text-[var(--color-text-muted)] cursor-not-allowed'
          )}
        >
          Check Answer
        </button>
      ) : (
        <div className={cn(
          'p-3 rounded-lg text-sm',
          isCorrect ? 'bg-[var(--color-success-bg)] text-[var(--color-success)]' : 'bg-[var(--color-error-bg)] text-[var(--color-error)]'
        )}>
          <p className="font-semibold mb-1">{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</p>
          <p className="text-[var(--color-text-secondary)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
