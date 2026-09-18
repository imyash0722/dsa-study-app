import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { VivaQuestion } from '../../types';

export function VivaQuestions({ questions }: { questions: VivaQuestion[] }) {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggleReveal = (index: number) => {
    const newRevealed = new Set(revealed);
    if (newRevealed.has(index)) {
      newRevealed.delete(index);
    } else {
      newRevealed.add(index);
    }
    setRevealed(newRevealed);
  };

  return (
    <div className="space-y-4">
      {questions.map((q, idx) => {
        const isRevealed = revealed.has(idx);
        return (
          <div 
            key={idx} 
            className="glass-card p-5 cursor-pointer hover:border-[var(--color-border-secondary)] transition-colors w-full"
            onClick={() => toggleReveal(idx)}
          >
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--color-bg-active)] flex items-center justify-center flex-shrink-0 text-sm font-bold text-[var(--color-text-tertiary)]">
                Q{idx + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-base font-medium text-[var(--color-text-primary)] mb-2">{q.question}</h3>
                
                <div className={cn(
                  "grid transition-all duration-300",
                  isRevealed ? "grid-rows-[1fr] opacity-100 mt-3" : "grid-rows-[0fr] opacity-0 mt-0"
                )}>
                  <div className="overflow-hidden">
                    <div className="p-4 rounded-lg bg-[var(--color-bg-hover)] border-l-2 border-[var(--color-accent-primary)] text-sm text-[var(--color-text-primary)]">
                      <div className="flex gap-2">
                        <span className="font-semibold text-[var(--color-accent-primary)] flex-shrink-0">A:</span>
                        <div className="space-y-4">
                          {q.answer.split('\n\n').map((para, i) => (
                            <p key={i} className="leading-relaxed">{para}</p>
                          ))}
                        </div>
                      </div>
                      {q.followUp && (
                        <div className="mt-4 pt-3 border-t border-[var(--color-border-primary)] text-[var(--color-text-secondary)]">
                          <span className="font-medium text-[var(--color-text-primary)]">Follow-up:</span> {q.followUp}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {!isRevealed && (
                  <p className="text-xs text-[var(--color-text-muted)] mt-2">Click to reveal answer</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
