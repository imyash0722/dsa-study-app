import { useState } from 'react';
import type { RevisionCard as RevisionCardType } from '../../types';
import { BookmarkButton } from '../shared/BookmarkButton';
import { cn } from '../../utils/cn';

interface RevisionCardProps {
  card: RevisionCardType;
  className?: string;
}

export function RevisionCard({ card, className }: RevisionCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={cn(
        'glass-card relative cursor-pointer transition-all duration-300 min-h-[140px]',
        'hover:shadow-[var(--shadow-elevated)] hover:border-[var(--color-border-accent)]',
        flipped && 'ring-1 ring-[var(--color-accent-primary)]/30',
        className
      )}
      onClick={() => setFlipped(!flipped)}
    >
      {/* Bookmark in corner */}
      <div className="absolute top-2 right-2 z-10" onClick={(e) => e.stopPropagation()}>
        <BookmarkButton
          id={`bm-rc-${card.id}`}
          type="revision-card"
          targetId={card.id}
          title={card.front}
        />
      </div>

      <div className="p-5 flex flex-col items-center justify-center min-h-[140px] text-center">
        {flipped ? (
          <div className="animate-fade-in space-y-2">
            <p className="text-[10px] font-semibold text-[var(--color-accent-primary)] uppercase tracking-widest">Answer</p>
            <p className="text-sm text-[var(--color-text-primary)] leading-relaxed">{card.back}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-3">Click to flip back</p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-[var(--color-text-muted)] uppercase tracking-widest">Question</p>
            <p className="text-sm font-medium text-[var(--color-text-primary)] leading-relaxed">{card.front}</p>
            <p className="text-[10px] text-[var(--color-text-muted)] mt-3">Click to reveal</p>
          </div>
        )}
      </div>

      {/* Tags */}
      {card.tags.length > 0 && (
        <div className="px-4 pb-3 flex gap-1 flex-wrap justify-center">
          {card.tags.map((tag) => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--color-bg-hover)] text-[var(--color-text-muted)]">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
