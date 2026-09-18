import { useState } from 'react';
import type { LabProgram } from '../../types';
import { Badge } from '../shared/Badge';
import { CodeBlock } from '../content/CodeBlock';
import { BookmarkButton } from '../shared/BookmarkButton';
import { cn } from '../../utils/cn';

interface LabProgramCardProps {
  program: LabProgram;
}

export function LabProgramCard({ program }: LabProgramCardProps) {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Badge text={`Lab ${program.number}`} variant="accent" />
            {program.unitIds.map(unitId => (
              <Badge key={unitId} text={unitId.toUpperCase()} variant="default" />
            ))}
          </div>
          <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{program.title}</h2>
        </div>
        <BookmarkButton id={`bm-${program.id}`} type="example" targetId={program.id} title={program.title} />
      </div>

      {/* Objective & Description */}
      <div>
        <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Objective</h3>
        <p className="text-base text-[var(--color-text-primary)] mb-4">{program.objective}</p>
        
        <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Description</h3>
        <p className="text-base text-[var(--color-text-secondary)]">{program.description}</p>
      </div>

      {/* Solution Toggle */}
      <div>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-lg font-medium transition-all",
            showSolution 
              ? "bg-[var(--color-bg-active)] text-[var(--color-text-primary)]" 
              : "bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <span>{showSolution ? 'Hide Reference Solution' : 'Show Reference Solution'}</span>
          <svg className={cn("w-5 h-5 transition-transform", showSolution ? "rotate-180" : "")} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showSolution && (
          <div className="mt-4 animate-fade-in space-y-4">
            <CodeBlock code={program.solution} title={`${program.slug}.c`} />
            <div className="bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] p-4 rounded-lg mt-4">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-2">Explanation</h4>
              <p className="text-sm text-[var(--color-text-secondary)]">
                {program.solutionExplanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
