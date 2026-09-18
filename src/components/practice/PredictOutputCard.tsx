import { useState } from 'react';
import type { TheoryQuestion } from '../../types';
import { cn } from '../../utils/cn';

interface PredictOutputCardProps {
  question: TheoryQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function PredictOutputCard({ question, onAnswer, className }: PredictOutputCardProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer.trim() === String(question.correctAnswer).trim();

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

      <div>
        <label className="block text-xs text-[var(--color-text-muted)] mb-1.5 uppercase tracking-wide">Your predicted output:</label>
        <textarea
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          placeholder="Type the expected output..."
          disabled={submitted}
          rows={3}
          className="w-full px-3 py-2 rounded-lg bg-[var(--color-terminal-bg)] border border-[var(--color-code-border)] text-sm font-mono text-[var(--color-terminal-text)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-primary)] resize-none transition-colors"
        />
      </div>

      {!submitted ? (
        <button onClick={handleSubmit} disabled={!answer.trim()} className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Check Output
        </button>
      ) : (
        <div className="space-y-3 animate-fade-in">
          <div className={cn('p-3 rounded-lg', isCorrect ? 'bg-[var(--color-success-bg)]' : 'bg-[var(--color-error-bg)]')}>
            <p className={cn('text-sm font-semibold mb-1', isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-error)]')}>
              {isCorrect ? '✅ Correct!' : '❌ Not quite'}
            </p>
          </div>
          <div className="p-3 rounded-lg bg-[var(--color-terminal-bg)] border border-[var(--color-code-border)]">
            <p className="text-xs text-[var(--color-text-muted)] mb-1">Actual output:</p>
            <pre className="text-sm font-mono text-[var(--color-terminal-text)]">{String(question.correctAnswer)}</pre>
          </div>
          <p className="text-sm text-[var(--color-text-secondary)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
