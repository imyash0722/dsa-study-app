import { useState, useMemo } from 'react';
import { EmptyState } from '../components/shared/EmptyState';
import { curriculumMap } from '../data/curriculum-map';
import { CodeBlock } from '../components/content/CodeBlock';
import { Badge, DifficultyBadge } from '../components/shared/Badge';

export function DebuggingLabPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [markedCorrect, setMarkedCorrect] = useState<Record<string, boolean>>({});

  // Collect all spot-bug questions
  const allChallenges = useMemo(() => {
    const rawChallenges: any[] = [];
    curriculumMap.forEach(unit => {
      unit.topics.forEach(topic => {
        topic.theoryQuestions.forEach(q => {
          if (q.type === 'spot-bug') {
            rawChallenges.push({
              ...q,
              unitId: unit.id,
              unitTitle: unit.title,
              topicTitle: topic.title,
            });
          }
        });
      });
    });

    const seen = new Set<string>();
    return rawChallenges.filter(c => {
      const key = `${c.type}|${c.question.trim()}|${(c.code || '').trim()}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  // Filter challenges
  const filteredChallenges = useMemo(() => {
    return allChallenges.filter(c => {
      const matchUnit = selectedUnit === 'all' || c.unitId === selectedUnit;
      const matchDiff = selectedDifficulty === 'all' || c.difficulty === selectedDifficulty;
      return matchUnit && matchDiff;
    });
  }, [allChallenges, selectedUnit, selectedDifficulty]);

  // Reset progress when filters change
  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentIndex(0);
    setRevealed(false);
  };

  const currentChallenge = filteredChallenges[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredChallenges.length - 1) {
      setCurrentIndex(c => c + 1);
      setRevealed(false);
    }
  };

  const markCorrect = () => {
    if (!markedCorrect[currentChallenge.id]) {
      setScore(s => s + 1);
      setMarkedCorrect(prev => ({ ...prev, [currentChallenge.id]: true }));
    }
    setRevealed(true);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Debugging Lab</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Practice spotting bugs in C code. Build your ability to defensively analyze systems.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 items-center bg-[var(--color-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--color-border-primary)] w-full md:w-auto mt-4 md:mt-0">
          <div className="text-center">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">Score</span>
            <span className="text-xl font-bold text-[var(--color-success)]">{score}</span>
          </div>
          <div className="w-px h-8 bg-[var(--color-border-primary)]" />
          <div className="text-center">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">Total Found</span>
            <span className="text-xl font-bold text-[var(--color-accent-primary)]">{Object.keys(markedCorrect).length}</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <select 
          value={selectedUnit} 
          onChange={(e) => handleFilterChange(setSelectedUnit, e.target.value)}
          className="w-full md:w-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] block p-2.5"
        >
          <option value="all">All Units</option>
          {curriculumMap.map(u => (
            <option key={u.id} value={u.id}>{u.title}</option>
          ))}
        </select>

        <select 
          value={selectedDifficulty} 
          onChange={(e) => handleFilterChange(setSelectedDifficulty, e.target.value)}
          className="w-full md:w-auto bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] text-sm rounded-lg focus:ring-[var(--color-accent-primary)] focus:border-[var(--color-accent-primary)] block p-2.5"
        >
          <option value="all">All Difficulties</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>
      </div>

      {filteredChallenges.length > 0 ? (
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-lg">
                Challenge {currentIndex + 1} of {filteredChallenges.length}
              </span>
              <DifficultyBadge level={currentChallenge.difficulty} />
              <Badge text={currentChallenge.topicTitle} variant="default" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">{currentChallenge.question}</h3>

          <div className="mb-6 border-l-4 border-red-500 rounded-xl overflow-x-auto shadow-lg relative">
            <div className="absolute inset-0 bg-red-500/5 pointer-events-none z-10" />
            <CodeBlock code={currentChallenge.code || ''} />
          </div>

          {!revealed ? (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--color-border-primary)]">
              <button
                onClick={() => setRevealed(true)}
                className="w-full md:w-auto flex-1 px-6 py-3 min-h-[44px] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] font-bold rounded-lg transition-colors"
              >
                Reveal Bug
              </button>
              <button
                onClick={markCorrect}
                className="w-full md:w-auto flex-1 px-6 py-3 min-h-[44px] bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20 border border-[var(--color-success)]/20 text-[var(--color-success)] font-bold rounded-lg transition-colors"
              >
                I Found It Correctly! (+1)
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl">
                <h4 className="text-sm font-bold text-green-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400"></span>
                  The Bug
                </h4>
                <p className="text-lg font-bold text-[var(--color-text-primary)] mb-4">{currentChallenge.correctAnswer}</p>
                
                <h4 className="text-sm font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-2">Explanation</h4>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">{currentChallenge.explanation}</p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={currentIndex === filteredChallenges.length - 1}
                  className="w-full md:w-auto px-8 py-3 min-h-[44px] bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                >
                  {currentIndex === filteredChallenges.length - 1 ? 'End of Challenges' : 'Next Challenge →'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState 
          title="No Challenges Found" 
          message="No spot-bug challenges match your current filters. Try selecting a different unit or difficulty." 
          icon="code" 
        />
      )}
    </div>
  );
}
