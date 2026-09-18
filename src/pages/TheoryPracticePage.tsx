import { useState, useMemo } from 'react';
import { EmptyState } from '../components/shared/EmptyState';
import { Badge } from '../components/shared/Badge';
import { curriculumMap } from '../data/curriculum-map';
import { MCQCard } from '../components/practice/MCQCard';
import { TrueFalseCard } from '../components/practice/TrueFalseCard';
import { PredictOutputCard } from '../components/practice/PredictOutputCard';
import { FillBlankCard } from '../components/practice/FillBlankCard';
import { SpotBugCard } from '../components/practice/SpotBugCard';
import type { QuestionType } from '../types';

export function TheoryPracticePage() {
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<QuestionType | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);

  const filteredQuestions = useMemo(() => {
    const allQuestions = curriculumMap.flatMap(u => 
      u.topics.flatMap(t => 
        (t.theoryQuestions || []).map(q => ({ ...q, unitId: u.id }))
      )
    );

    const seen = new Set<string>();
    let questions = allQuestions.filter(q => {
      const key = `${q.type}|${q.question.trim()}|${(q.code || '').trim()}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
    if (selectedUnit) {
      questions = questions.filter(q => q.unitId === selectedUnit);
    }
    if (selectedType) {
      questions = questions.filter(q => q.type === selectedType);
    }
    return questions;
  }, [selectedUnit, selectedType]);

  // Reset progress when filters change
  useMemo(() => {
    setCurrentIndex(0);
    setScore(0);
    setAnsweredCount(0);
    setHasAnsweredCurrent(false);
  }, [selectedUnit, selectedType]);

  const currentQuestion = filteredQuestions[currentIndex];

  const handleAnswer = (correct: boolean) => {
    if (hasAnsweredCurrent) return;
    setHasAnsweredCurrent(true);
    setAnsweredCount(prev => prev + 1);
    if (correct) setScore(prev => prev + 1);
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setHasAnsweredCurrent(false);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Theory Practice Zone</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Test your understanding with MCQs, true/false, fill-in-the-blank, predict-output, and spot-the-bug questions.
        </p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {(['mcq', 'true-false', 'fill-blank', 'predict-output', 'spot-bug'] as const).map((type) => (
            <button 
              key={type}
              onClick={() => setSelectedType(type === selectedType ? null : type)}
              className="transition-all"
            >
              <Badge text={type} variant={type === selectedType ? "success" : "accent"} />
            </button>
          ))}
        </div>
      </div>

      {/* Filter bar */}
      <div className="glass-card p-4 flex flex-col md:flex-row md:items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs text-[var(--color-text-tertiary)] uppercase tracking-wide">Filter by Unit:</span>
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
            Unit {u.number}
            </button>
          ))}
        </div>
        
        <div className="flex-1 hidden md:block"></div>
        <div className="text-sm font-semibold text-[var(--color-text-primary)] mt-2 md:mt-0 bg-[var(--color-bg-secondary)] px-3 py-1.5 rounded-lg border border-[var(--color-border-primary)] self-start md:self-auto">
          Score: <span className="text-[var(--color-accent-primary)]">{score}</span> / {answeredCount}
        </div>
      </div>

      {filteredQuestions.length > 0 && currentQuestion ? (
        <div className="space-y-6">
          <div className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide">
            Question {currentIndex + 1} of {filteredQuestions.length}
          </div>
          
          <div key={currentQuestion.id}>
            {currentQuestion.type === 'mcq' && <MCQCard question={currentQuestion} onAnswer={handleAnswer} />}
            {currentQuestion.type === 'true-false' && <TrueFalseCard question={currentQuestion} onAnswer={handleAnswer} />}
            {currentQuestion.type === 'predict-output' && <PredictOutputCard question={currentQuestion} onAnswer={handleAnswer} />}
            {currentQuestion.type === 'fill-blank' && <FillBlankCard question={currentQuestion} onAnswer={handleAnswer} />}
            {currentQuestion.type === 'spot-bug' && <SpotBugCard question={currentQuestion} onAnswer={handleAnswer} />}
          </div>

          {hasAnsweredCurrent && currentIndex < filteredQuestions.length - 1 && (
            <button 
              onClick={handleNext}
              className="px-6 py-3 rounded-lg font-bold bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)] transition-colors w-full md:w-auto min-h-[44px]"
            >
              Next Question →
            </button>
          )}
          {hasAnsweredCurrent && currentIndex === filteredQuestions.length - 1 && (
            <div className="p-4 bg-[var(--color-success-bg)] text-[var(--color-success)] rounded-lg text-center font-bold">
              You have completed all questions in this filter!
            </div>
          )}
        </div>
      ) : (
        <EmptyState title="No Questions Found" message="Try adjusting your filters or checking back later as more content is added." icon="book" />
      )}
    </div>
  );
}
