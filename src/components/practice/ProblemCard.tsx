import { useState } from 'react';
import type { ProgrammingProblem } from '../../types';
import { Badge, DifficultyBadge } from '../shared/Badge';
import { CodeBlock } from '../content/CodeBlock';
import { DryRunTable } from '../content/DryRunTable';
import { BookmarkButton } from '../shared/BookmarkButton';
import { useAppStore } from '../../store';

interface ProblemCardProps {
  problem: ProgrammingProblem;
  topicId: string;
}

export function ProblemCard({ problem, topicId }: ProblemCardProps) {
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  
  const addSolvedProblem = useAppStore(s => s.addSolvedProblem);
  const isSolved = useAppStore(s => s.topicProgress[topicId]?.problemsSolved?.includes(problem.id));

  const handleMarkSolved = () => {
    addSolvedProblem(topicId, problem.id);
  };

  return (
    <div className="glass-card p-6 md:p-8 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <DifficultyBadge level={problem.difficulty} />
            {problem.leetcodeRef && (
              <Badge text={`LeetCode ${problem.leetcodeRef}`} variant="warning" />
            )}
            {isSolved && <Badge text="Solved" variant="success" />}
          </div>
          <h2 className="text-xl font-bold text-[var(--color-text-primary)]">{problem.title}</h2>
        </div>
        <BookmarkButton id={`bm-${problem.id}`} type="example" targetId={problem.id} title={problem.title} />
      </div>

      <div>
        <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Problem Statement</h3>
        <p className="text-base text-[var(--color-text-primary)] leading-relaxed whitespace-pre-wrap">{problem.problemStatement}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Sample Input</h3>
          <pre className="text-sm text-[var(--color-code-string)] bg-[var(--color-bg-hover)] p-3 rounded-lg border border-[var(--color-border-primary)] overflow-x-auto">{problem.sampleInput}</pre>
        </div>
        <div>
          <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-2">Sample Output</h3>
          <pre className="text-sm text-[var(--color-success)] bg-[var(--color-bg-hover)] p-3 rounded-lg border border-[var(--color-border-primary)] overflow-x-auto">{problem.sampleOutput}</pre>
        </div>
      </div>

      {problem.constraints && problem.constraints.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-3">Constraints</h3>
          <ul className="list-disc list-inside space-y-1 text-sm text-[var(--color-text-secondary)] font-mono bg-[var(--color-bg-hover)] p-4 rounded-lg border border-[var(--color-border-primary)]">
            {problem.constraints.map((c, idx) => (
              <li key={idx}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row flex-wrap gap-3 pt-4 border-t border-[var(--color-border-primary)]">
        {problem.hints && problem.hints.length > 0 && (
          <button
            onClick={() => setShowHint(!showHint)}
            className="w-full md:w-auto px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium border border-[var(--color-warning)] text-[var(--color-warning)] hover:bg-[var(--color-warning-bg)] transition-colors"
          >
            {showHint ? 'Hide Hints' : 'Show Hints'}
          </button>
        )}
        
        <button
          onClick={() => setShowSolution(!showSolution)}
          className="w-full md:w-auto px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium border border-[var(--color-accent-primary)] text-[var(--color-accent-primary)] hover:bg-[var(--color-accent-glow)] transition-colors"
        >
          {showSolution ? 'Hide Solution' : 'Show Solution'}
        </button>

        <div className="flex-1 hidden md:block" />

        {!isSolved && (
          <button
            onClick={handleMarkSolved}
            className="w-full md:w-auto px-4 py-2 min-h-[44px] rounded-lg text-sm font-medium bg-[var(--color-success)] text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>✓</span> Mark as Solved
          </button>
        )}
      </div>

      {/* Dynamic Content Areas */}
      {showHint && problem.hints && (
        <div className="animate-fade-in bg-[var(--color-warning-bg)] border border-[var(--color-warning)] p-5 rounded-lg space-y-2">
          <h4 className="text-sm font-semibold text-[var(--color-warning)]">Hints</h4>
          <ul className="list-decimal list-inside space-y-1 text-sm text-[var(--color-text-primary)]">
            {problem.hints.map((hint, i) => (
              <li key={i}>{hint}</li>
            ))}
          </ul>
        </div>
      )}

      {showSolution && problem.solution && (
        <div className="animate-fade-in space-y-4">
          <h3 className="text-sm font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">Reference Solution</h3>
          {problem.solutionExplanation && (
            <div className="p-4 bg-[var(--color-bg-hover)] rounded-lg">
              <h4 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Approach</h4>
              <div className="space-y-4">
                {problem.solutionExplanation.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          )}
          <CodeBlock code={problem.solution} />
          {problem.dryRun && problem.dryRun.length > 0 && (
            <div className="mt-4">
              <DryRunTable steps={problem.dryRun} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
