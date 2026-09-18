import { useState } from 'react';
import { EmptyState } from '../components/shared/EmptyState';
import { curriculumMap } from '../data/curriculum-map';
import { Badge } from '../components/shared/Badge';

export function RevisionPage() {
  const [selectedUnitId, setSelectedUnitId] = useState<string>(curriculumMap[0]?.id || '');

  const selectedUnit = curriculumMap.find((u) => u.id === selectedUnitId);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Revision Notes</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Quick-review flashcards grouped by unit and topic. Click to flip and reveal answers.
        </p>
      </div>

      {/* Unit selector */}
      <div 
        className="flex gap-2 overflow-x-auto whitespace-nowrap pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
        {curriculumMap.map((u) => {
          const cardCount = u.topics.reduce(
            (acc, t) => acc + t.subtopics.reduce((subAcc, s) => subAcc + s.revisionCards.length, 0),
            0
          );
          return (
            <button
              key={u.id}
              onClick={() => setSelectedUnitId(u.id)}
              className={`glass-card px-4 py-2.5 text-sm font-medium transition-all ${
                selectedUnitId === u.id
                  ? 'text-[var(--color-accent-primary)] ring-2 ring-[var(--color-accent-primary)] bg-[var(--color-bg-hover)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-hover)]'
              }`}
            >
              <Badge text={`U${u.number}`} variant="accent" className="mr-2" />
              {u.title}
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[var(--color-bg-secondary)] text-xs text-[var(--color-text-tertiary)]">
                {cardCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Flashcards Grouped by Topic */}
      {selectedUnit ? (
        <div className="space-y-12 animate-fade-in">
          {selectedUnit.topics.filter(t => t.subtopics.some(s => s.revisionCards.length > 0)).length > 0 ? (
            selectedUnit.topics.map((topic) => {
              const cards = topic.subtopics.flatMap(s => s.revisionCards);
              if (cards.length === 0) return null;

              return (
                <div key={topic.id} className="space-y-4">
                  <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-[var(--color-accent-primary)] rounded-full" />
                    {topic.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cards.map((card) => (
                      <RevisionFlipCard key={card.id} front={card.front} back={card.back} />
                    ))}
                  </div>
                </div>
              );
            })
          ) : (
            <EmptyState title="No Flashcards Yet" message="Flashcards will appear here when content is added to this unit." icon="book" />
          )}
        </div>
      ) : (
        <EmptyState title="Unit Not Found" message="Select a unit to view flashcards." icon="book" />
      )}
    </div>
  );
}

function RevisionFlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="glass-card p-6 cursor-pointer transition-all duration-300 min-h-[160px] flex items-center justify-center text-center group perspective-1000 relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {flipped ? (
        <div className="animate-fade-in w-full">
          <p className="text-xs font-bold text-[var(--color-accent-primary)] uppercase tracking-widest mb-3">Answer</p>
          <p className="text-base text-[var(--color-text-primary)] leading-relaxed">{back}</p>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors">Question</p>
          <p className="text-base font-medium text-[var(--color-text-primary)]">{front}</p>
        </div>
      )}
    </div>
  );
}
