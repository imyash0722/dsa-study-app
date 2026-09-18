import { useParams, Link } from 'react-router-dom';
import { getUnitBySlug } from '../data';
import { useAppStore } from '../store';
import { Badge, DifficultyBadge } from '../components/shared/Badge';
import { ProgressBar } from '../components/progress/ProgressBar';
import { EmptyState } from '../components/shared/EmptyState';
import type { CompletionStatus } from '../types';

function StatusIcon({ status }: { status: CompletionStatus }) {
  if (status === 'completed') {
    return (
      <div className="w-6 h-6 rounded-full bg-[var(--color-success)] flex items-center justify-center flex-shrink-0">
        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
    );
  }
  if (status === 'in-progress') {
    return <div className="w-6 h-6 rounded-full border-2 border-[var(--color-warning)] bg-[var(--color-warning-bg)] flex-shrink-0" />;
  }
  return <div className="w-6 h-6 rounded-full border-2 border-[var(--color-border-secondary)] flex-shrink-0" />;
}

export function UnitPage() {
  const { unitSlug } = useParams<{ unitSlug: string }>();
  const unit = getUnitBySlug(unitSlug || '');
  const topicProgress = useAppStore((s) => s.topicProgress);

  if (!unit) {
    return <EmptyState title="Unit Not Found" message="The requested unit doesn't exist." icon="book" />;
  }

  const completedCount = unit.topics.filter(
    (t) => topicProgress[t.id]?.status === 'completed'
  ).length;

  return (
    <div className="space-y-8">
      {/* Unit Header */}
      <div className="glass-card p-8">
        <div className="flex items-center gap-2 mb-3">
          <Badge text={`Unit ${unit.number}`} variant="accent" />
          <Badge text={`${unit.hours} hours`} variant="default" />
          <Badge text={`${unit.topics.length} topics`} variant="default" />
        </div>
        <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-2">{unit.title}</h1>
        <p className="text-base text-[var(--color-text-secondary)] mb-6">{unit.description}</p>
        <ProgressBar
          value={completedCount}
          max={unit.topics.length}
          label={`${completedCount} of ${unit.topics.length} topics completed`}
        />
      </div>

      {/* Topic List */}
      <div className="space-y-2">
        {unit.topics.map((topic, index) => {
          const status: CompletionStatus = topicProgress[topic.id]?.status ?? 'not-started';
          return (
            <Link
              key={topic.id}
              to={`/unit/${unit.slug}/${topic.slug}`}
              className="glass-card p-5 flex items-center gap-4 hover:bg-[var(--color-bg-hover)] transition-all group hover:-translate-y-0.5 hover:shadow-md hover:border-[var(--color-border-secondary)]"
            >
              <StatusIcon status={status} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-mono text-[var(--color-text-muted)]">
                    {unit.number}.{index + 1}
                  </span>
                  <DifficultyBadge level={topic.difficulty} />
                </div>
                <h3 className="text-lg font-medium text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors truncate">
                  {topic.title}
                </h3>
                <p className="text-sm text-[var(--color-text-tertiary)] truncate mt-1">
                  {topic.description}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-[var(--color-text-muted)]">{topic.estimatedMinutes} min</span>
                <svg className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
