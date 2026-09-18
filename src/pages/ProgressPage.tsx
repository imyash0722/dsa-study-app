import { curriculumMap } from '../data/curriculum-map';
import { useAppStore } from '../store';
import { ProgressRing } from '../components/progress/ProgressRing';
import { ProgressBar } from '../components/progress/ProgressBar';

export function ProgressPage() {
  const topicProgress = useAppStore((s) => s.topicProgress);
  const quizAttempts = useAppStore((s) => s.quizAttempts);
  const streak = useAppStore((s) => s.streak);

  const allTopics = curriculumMap.flatMap((u) => u.topics);
  const completed = allTopics.filter((t) => topicProgress[t.id]?.status === 'completed').length;
  const inProgress = allTopics.filter((t) => topicProgress[t.id]?.status === 'in-progress').length;
  const overallPct = allTopics.length > 0 ? Math.round((completed / allTopics.length) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Progress Dashboard</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">Track your learning journey across all units and topics.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 text-center">
          <ProgressRing percentage={overallPct} size={64} strokeWidth={5} />
          <p className="text-xs text-[var(--color-text-tertiary)] mt-2">Overall</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--color-success)]">{completed}</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">Completed</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--color-warning)]">{inProgress}</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">In Progress</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl font-bold text-[var(--color-accent-primary)]">🔥 {streak.current}</p>
          <p className="text-xs text-[var(--color-text-tertiary)]">Day Streak</p>
        </div>
      </div>

      {/* Per-unit breakdown */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">Unit Breakdown</h2>
        {curriculumMap.map((unit) => {
          const unitCompleted = unit.topics.filter((t) => topicProgress[t.id]?.status === 'completed').length;
          return (
            <div key={unit.id} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-[var(--color-text-primary)]">
                  Unit {unit.number}: {unit.title}
                </h3>
                <span className="text-xs text-[var(--color-text-tertiary)]">{unitCompleted}/{unit.topics.length}</span>
              </div>
              <ProgressBar value={unitCompleted} max={unit.topics.length} showPercentage={false} size="sm" />
            </div>
          );
        })}
      </div>

      {/* Quiz History */}
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)] mb-3">Quiz History</h2>
        {quizAttempts.length > 0 ? (
          <div className="space-y-2">
            {quizAttempts.slice(-10).reverse().map((attempt, i) => (
              <div key={i} className="glass-card p-3 flex items-center justify-between">
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {new Date(attempt.timestamp).toLocaleDateString()}
                </span>
                <span className="text-sm font-semibold text-[var(--color-accent-primary)]">
                  {attempt.score}/{attempt.total}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-card p-4 text-center">
            <p className="text-sm text-[var(--color-text-tertiary)]">No quizzes attempted yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
