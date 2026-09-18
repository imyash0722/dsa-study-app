import { useState } from 'react';
import type { TheoryQuestion } from '../../types';
import { cn } from '../../utils/cn';

interface SpotBugCardProps {
  question: TheoryQuestion;
  onAnswer?: (correct: boolean) => void;
  className?: string;
}

export function SpotBugCard({ question, onAnswer, className }: SpotBugCardProps) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const isCorrect = answer.trim().toLowerCase().includes(String(question.correctAnswer).toLowerCase());

  function handleSubmit() {
    if (!answer.trim()) return;
    setSubmitted(true);
    onAnswer?.(isCorrect);
  }

  return (
    <div className={cn('glass-card p-5 space-y-4 border-l-4 border-[var(--color-error)]/50', className)}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">🐛</span>
        <p className="text-sm font-semibold text-[var(--color-text-primary)]">Spot the Bug</p>
      </div>

      <p className="text-sm text-[var(--color-text-secondary)]">{question.question}</p>

      {question.code && (
        <pre className="bg-[var(--color-code-bg)] border border-[var(--color-error)]/20 rounded-lg p-3 text-sm font-mono text-[var(--color-terminal-text)] overflow-x-auto">
          {question.code}
        </pre>
      )}

      <div>
        <label className="block text-xs text-[var(--color-text-muted)] mb-1.5">Describe the bug:</label>
        <textarea
          value={answer}
          onChange={(e) => !submitted && setAnswer(e.target.value)}
          placeholder="What's wrong with this code?"
          disabled={submitted}
          rows={2}
          className="w-full px-3 py-2 rounded-lg bg-[var(--color-bg-primary)] border border-[var(--color-border-primary)] text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-accent-primary)] resize-none transition-colors"
        />
      </div>

      {!submitted ? (
        <button onClick={handleSubmit} disabled={!answer.trim()} className="px-4 py-2 rounded-lg text-sm font-medium bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          Check
        </button>
      ) : (
        <div className={cn('p-3 rounded-lg text-sm animate-fade-in', isCorrect ? 'bg-[var(--color-success-bg)]' : 'bg-[var(--color-warning-bg)]')}>
          <p className={cn('font-semibold mb-1', isCorrect ? 'text-[var(--color-success)]' : 'text-[var(--color-warning)]')}>
            {isCorrect ? '✅ Great catch!' : '💡 Here\'s the bug:'}
          </p>
          <p className="text-[var(--color-text-secondary)]">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
