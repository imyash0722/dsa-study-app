import { useState, useMemo } from 'react';
import { EmptyState } from '../components/shared/EmptyState';
import { curriculumMap } from '../data/curriculum-map';
import { ProblemCard } from '../components/practice/ProblemCard';
import type { DifficultyLevel } from '../types';

export function ProgrammingPracticePage() {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);

  const filteredProblems = useMemo(() => {
    const allProblems = curriculumMap.flatMap((u) =>
      u.topics.flatMap((t) => (t.programmingProblems || []).map(p => ({ ...p, unitId: u.id, topicId: t.id })))
    );

    const seen = new Set<string>();
    let problems = allProblems.filter(p => {
      const key = `${p.title.trim()}|${p.problemStatement.trim()}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (selectedDifficulty) {
      problems = problems.filter((p) => p.difficulty === selectedDifficulty);
    }
    if (selectedUnit) {
      problems = problems.filter((p) => p.unitId === selectedUnit);
    }
    return problems;
  }, [selectedDifficulty, selectedUnit]);

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Programming Practice Zone</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Solve coding problems with progressive hints, view solutions with dry-run walkthroughs, and prepare for LeetCode/HackerRank.
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide">Unit:</span>
          <button 
            onClick={() => setSelectedUnit(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!selectedUnit ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)]'}`}
          >
            All
          </button>
          {curriculumMap.map((u) => (
            <button 
              key={u.id}
              onClick={() => setSelectedUnit(u.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${selectedUnit === u.id ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)] hover:text-[var(--color-text-primary)]'}`}
            >
              U{u.number}
            </button>
          ))}
        </div>
        <div className="hidden sm:block w-px h-6 bg-[var(--color-border-primary)]"></div>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide">Difficulty:</span>
          <button 
            onClick={() => setSelectedDifficulty(null)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${!selectedDifficulty ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)]'}`}
          >
            All
          </button>
          {(['beginner', 'intermediate', 'advanced'] as const).map((d) => (
            <button 
              key={d} 
              onClick={() => setSelectedDifficulty(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors capitalize ${selectedDifficulty === d ? 'bg-[var(--color-accent-primary)] text-white' : 'bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-active)]'}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {filteredProblems.length > 0 ? (
        <div className="space-y-6">
          {filteredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} topicId={problem.topicId} />
          ))}
        </div>
      ) : (
        <EmptyState title="Problems Coming Soon" message="Programming problems with hints, solutions, and dry-run walkthroughs will appear here." icon="code" />
      )}
    </div>
  );
}
