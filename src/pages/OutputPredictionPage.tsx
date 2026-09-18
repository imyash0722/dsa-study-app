import { useState, useMemo } from 'react';
import { EmptyState } from '../components/shared/EmptyState';
import { curriculumMap } from '../data/curriculum-map';
import { CodeBlock } from '../components/content/CodeBlock';
import { Badge, DifficultyBadge } from '../components/shared/Badge';

export function OutputPredictionPage() {
  const [selectedUnit, setSelectedUnit] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [markedCorrect, setMarkedCorrect] = useState<Record<string, boolean>>({});

  // Collect all predict-output questions
  const allQuestions = useMemo(() => {
    const rawQuestions: any[] = [];
    curriculumMap.forEach(unit => {
      unit.topics.forEach(topic => {
        topic.theoryQuestions.forEach(q => {
          if (q.type === 'predict-output') {
            rawQuestions.push({
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
    return rawQuestions.filter(q => {
      const key = `${q.type}|${q.question.trim()}|${(q.code || '').trim()}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, []);

  // Filter questions
  const filteredQuestions = useMemo(() => {
    return allQuestions.filter(q => {
      const matchUnit = selectedUnit === 'all' || q.unitId === selectedUnit;
      const matchDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
      return matchUnit && matchDiff;
    });
  }, [allQuestions, selectedUnit, selectedDifficulty]);

  // Reset progress when filters change
  const handleFilterChange = (setter: any, value: string) => {
    setter(value);
    setCurrentIndex(0);
    setRevealed(false);
  };

  const currentQuestion = filteredQuestions[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(c => c + 1);
      setRevealed(false);
    }
  };

  const markCorrect = () => {
    if (!markedCorrect[currentQuestion.id]) {
      setScore(s => s + 1);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setMarkedCorrect(prev => ({ ...prev, [currentQuestion.id]: true }));
    }
    setRevealed(true);
  };

  const markWrong = () => {
    setStreak(0);
    setRevealed(true);
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Output Prediction Lab</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">
            Rapid-fire "What does this code print?" drills. Build your ability to mentally execute C code.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 items-center bg-[var(--color-bg-secondary)] px-4 py-3 rounded-xl border border-[var(--color-border-primary)] w-full md:w-auto mt-4 md:mt-0">
          <div className="text-center">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">Score</span>
            <span className="text-xl font-bold text-[var(--color-success)]">{score}</span>
          </div>
          <div className="w-px h-8 bg-[var(--color-border-primary)]" />
          <div className="text-center">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">Streak 🔥</span>
            <span className="text-xl font-bold text-orange-400">{streak}</span>
          </div>
          <div className="w-px h-8 bg-[var(--color-border-primary)]" />
          <div className="text-center">
            <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wider block mb-1">Best</span>
            <span className="text-xl font-bold text-[var(--color-accent-primary)]">{bestStreak}</span>
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

      {filteredQuestions.length > 0 ? (
        <div className="glass-card p-6 md:p-8 animate-fade-in">
          <div className="flex flex-wrap gap-3 items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-lg">
                Question {currentIndex + 1} of {filteredQuestions.length}
              </span>
              <DifficultyBadge level={currentQuestion.difficulty} />
              <Badge text={currentQuestion.topicTitle} variant="default" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">{currentQuestion.question}</h3>

          <div className="mb-6 rounded-xl overflow-x-auto shadow-lg border border-[var(--color-border-secondary)]">
            <CodeBlock code={currentQuestion.code || ''} />
          </div>

          {!revealed ? (
            <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-[var(--color-border-primary)]">
              <button
                onClick={markWrong}
                className="w-full md:w-auto flex-1 px-6 py-3 min-h-[44px] bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border-primary)] text-[var(--color-text-primary)] font-bold rounded-lg transition-colors"
              >
                I Got It Wrong
              </button>
              <button
                onClick={markCorrect}
                className="w-full md:w-auto flex-1 px-6 py-3 min-h-[44px] bg-[var(--color-success)]/10 hover:bg-[var(--color-success)]/20 border border-[var(--color-success)]/20 text-[var(--color-success)] font-bold rounded-lg transition-colors"
              >
                I Got It Right! (+1)
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              <div className="p-6 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-xl">
                <h4 className="text-sm font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-2">The Output</h4>
                <div className="bg-[#0D1117] border border-[#30363d] rounded-lg p-4 font-mono text-sm text-[#e6edf3] whitespace-pre-wrap overflow-x-auto shadow-inner mb-4">
                  {currentQuestion.correctAnswer}
                </div>
                
                <h4 className="text-sm font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-2">Explanation</h4>
                <p className="text-base text-[var(--color-text-secondary)] leading-relaxed">{currentQuestion.explanation}</p>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={handleNext}
                  disabled={currentIndex === filteredQuestions.length - 1}
                  className="w-full md:w-auto px-8 py-3 min-h-[44px] bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
                >
                  {currentIndex === filteredQuestions.length - 1 ? 'End of Drills' : 'Next Question →'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState 
          title="No Questions Found" 
          message="No predict-output questions match your current filters. Try selecting a different unit or difficulty." 
          icon="code" 
        />
      )}
    </div>
  );
}
