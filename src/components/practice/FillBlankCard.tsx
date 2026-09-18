import { useState } from 'react';
import type { TheoryQuestion } from '../../types';
import { cn } from '../../utils/cn';

interface FillBlankCardProps {
  question: TheoryQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function FillBlankCard({ question, onAnswer, className }: FillBlankCardProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer.trim().toLowerCase() === String(question.correctAnswer).toLowerCase();

  function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitted(true);
    onAnswer?.(isCorrect);
  }

  return (
    <div className={cn('glass-card p-5 space-y-4', className)}>
      <p className="text-sm font-medium text-[var(--color-text-primary)]">{question.question}</p>

      {question.code && (
        <pre className="bg-[var(--color-code-bg)] border border-[var(--color-code-border)] rounded-lg p-3 text-sm font-mono text-[var(--color-terminal-text)] overflow-x-auto">
          {question.code}
        </pre>
      )}

      <div className="flex gap-2">
        <input
          type="text"
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          placeholder="Type your answer..."
          disabled={submitted}
          className={cn(
            'flex-1 px-3 py-2 rounded-lg bg-[var(--color-bg-primary)] border text-sm font-mono text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none transition-colors',
            !submitted && 'border-[var(--color-border-primary)] focus:border-[var(--color-accent-primary)]',
            submitted && isCorrect && 'border-[var(--color-success)] bg-[var(--color-success-bg)]',
            submitted && !isCorrect && 'border-[var(--color-error)] bg-[var(--color-error-bg)]'
          )}
        />
        {!submitted && (
          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Check
          </button>
        )}
      </div>

      {submitted && (
        <div className={cn('p-3 rounded-lg text-sm animate-fade-in', isCorrect ? 'bg-[var(--color-success-bg)]' : 'bg-[var(--color-error-bg)]')}>
          <p className={cn('font-semibold mb-1', isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]')}>
            {isCorrect ? '✅ Correct!' : `❌ Answer: ${question.correctAnswer}`}
          </p>
          <p className="text-[var(--color-text-secondary)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
