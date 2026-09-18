import { useState, useEffect } from 'react';
import { curriculumMap } from '../data/curriculum-map';
import { useAppStore } from '../store';
import type { DifficultyLevel, TheoryQuestion } from '../types';
import { MCQCard } from '../components/practice/MCQCard';
import { TrueFalseCard } from '../components/practice/TrueFalseCard';
import { PredictOutputCard } from '../components/practice/PredictOutputCard';
import { FillBlankCard } from '../components/practice/FillBlankCard';
import { SpotBugCard } from '../components/practice/SpotBugCard';

export function QuizPage() {
  const [selectedUnits, setSelectedUnits] = useState<Set<string>>(new Set());
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [questionCount, setQuestionCount] = useState(10);
  
  const { activeQuiz, startQuiz, answerQuestion, nextQuestion, finishQuiz } = useAppStore();
  const [questionsMap, setQuestionsMap] = useState<Record<string, TheoryQuestion>>({});
  
  useEffect(() => {
    const map: Record<string, TheoryQuestion> = {};
    curriculumMap.forEach(u => {
      u.topics.forEach(t => {
        t.theoryQuestions?.forEach(q => {
          map[q.id] = q;
        });
      });
    });
    setQuestionsMap(map);
  }, []);

  const handleStart = () => {
    let pool = Object.values(questionsMap);
    if (selectedUnits.size > 0) {
      const allowedTopics = new Set<string>();
      curriculumMap.filter(u => selectedUnits.has(u.id)).forEach(u => u.topics.forEach(t => allowedTopics.add(t.id)));
      pool = pool.filter(q => allowedTopics.has(q.topicId));
    }
    if (selectedDifficulty !== 'all') {
      pool = pool.filter(q => q.difficulty === selectedDifficulty);
    }

    if (pool.length === 0) {
      alert("No questions match your filters!");
      return;
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(questionCount, shuffled.length));
    
    startQuiz(
      `quiz-${Date.now()}`,
      selected.map(q => q.id),
      []
    );
  };

  const toggleUnit = (id: string) => {
    const next = new Set(selectedUnits);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedUnits(next);
  };

  if (activeQuiz) {
    const currentQId = activeQuiz.questions[activeQuiz.currentIndex];
    const question = questionsMap[currentQId];
    const isLast = activeQuiz.currentIndex === activeQuiz.questions.length - 1;

    return (
      <div className="space-y-6 pb-20 max-w-3xl mx-auto">
        <div className="flex items-center justify-between glass-card p-4">
          <div className="font-semibold text-[var(--color-text-primary)]">
            Question {activeQuiz.currentIndex + 1} of {activeQuiz.questions.length}
          </div>
          <button 
            onClick={finishQuiz}
            className="text-sm font-semibold px-3 py-1.5 rounded-lg border border-[var(--color-error)] text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors"
          >
            End Quiz
          </button>
        </div>

        {question && (
          <div key={question.id}>
            {question.type === 'mcq' && <MCQCard question={question} onAnswer={(c) => answerQuestion(question.id, c)} />}
            {question.type === 'true-false' && <TrueFalseCard question={question} onAnswer={(c) => answerQuestion(question.id, c)} />}
            {question.type === 'predict-output' && <PredictOutputCard question={question} onAnswer={(c) => answerQuestion(question.id, c)} />}
            {question.type === 'fill-blank' && <FillBlankCard question={question} onAnswer={(c) => answerQuestion(question.id, c)} />}
            {question.type === 'spot-bug' && <SpotBugCard question={question} onAnswer={(c) => answerQuestion(question.id, c)} />}
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-[var(--color-border-primary)]">
          <button
            onClick={isLast ? finishQuiz : nextQuestion}
            className="px-6 py-2 rounded-lg bg-[var(--color-accent-primary)] text-white font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            {isLast ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Quiz Builder</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Create custom quizzes by selecting topics, question count, and time limit. Review your answers after completion.
        </p>
      </div>

      <div className="glass-card p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Select Units</h3>
          <div className="flex flex-wrap gap-2">
            {curriculumMap.map((u) => (
              <button
                key={u.id}
                onClick={() => toggleUnit(u.id)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors border ${selectedUnits.has(u.id) ? 'bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)]' : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]'}`}
              >
                Unit {u.number}: {u.title}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(d => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-4 py-2 rounded-lg text-sm capitalize transition-colors border ${selectedDifficulty === d ? 'bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)]' : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">Number of Questions</h3>
          <div className="flex gap-2">
            {[5, 10, 15, 20].map(n => (
              <button
                key={n}
                onClick={() => setQuestionCount(n)}
                className={`px-4 py-2 rounded-lg text-sm transition-colors border ${questionCount === n ? 'bg-[var(--color-accent-primary)] text-white border-[var(--color-accent-primary)]' : 'bg-transparent text-[var(--color-text-secondary)] border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)]'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="w-full py-3 rounded-lg bg-[var(--color-success)] text-white font-bold hover:opacity-90 transition-opacity"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
