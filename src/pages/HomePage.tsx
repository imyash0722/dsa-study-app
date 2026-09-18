import { Link } from 'react-router-dom';
import { curriculumMap } from '../data/curriculum-map';
import { useAppStore } from '../store';
import { ProgressRing } from '../components/progress/ProgressRing';
import { ProgressBar } from '../components/progress/ProgressBar';
import { Badge } from '../components/shared/Badge';

export function HomePage() {
  const topicProgress = useAppStore((s) => s.topicProgress);
  const streak = useAppStore((s) => s.streak);

  const allTopics = curriculumMap.flatMap((u) => u.topics);
  const completedTopics = allTopics.filter((t) => topicProgress[t.id]?.status === 'completed').length;
  const inProgressTopics = allTopics.filter((t) => topicProgress[t.id]?.status === 'in-progress').length;
  const overallPercentage = allTopics.length > 0 ? Math.round((completedTopics / allTopics.length) * 100) : 0;

  // Find last visited topic for "continue learning"
  const lastVisited = Object.values(topicProgress)
    .filter((tp) => tp.lastVisited)
    .sort((a, b) => b.lastVisited - a.lastVisited)[0];

  const lastTopic = lastVisited
    ? allTopics.find((t) => t.id === lastVisited.topicId)
    : null;
  const lastUnit = lastTopic
    ? curriculumMap.find((u) => u.id === lastTopic.unitId)
    : null;

  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="glass-card p-8">
        <div className="flex items-start justify-between flex-wrap md:flex-nowrap gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl font-bold mb-2">
              <span className="gradient-text">Data Structures and its Applications</span>
            </h1>
            <p className="text-base text-[var(--color-text-secondary)]">
              UE25CS252A — PES University, Bangalore
            </p>
            {streak.current > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-lg">🔥</span>
                <span className="text-sm font-semibold text-[var(--color-warning)]">
                  {streak.current} day streak
                </span>
              </div>
            )}
          </div>
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <ProgressRing percentage={overallPercentage} size={90} label="Overall" />
          </div>
        </div>
      </div>

      {/* Continue Learning */}
      {lastTopic && lastUnit && (
        <Link
          to={`/unit/${lastUnit.slug}/${lastTopic.slug}`}
          className="block glass-card p-6 glow-border hover:bg-[var(--color-bg-hover)] transition-all group hover:-translate-y-1"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[var(--color-accent-glow)] flex items-center justify-center">
              <svg className="w-5 h-5 text-[var(--color-accent-primary)] group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-1">Continue Learning</p>
              <p className="text-base font-semibold text-[var(--color-text-primary)]">{lastTopic.title}</p>
              <p className="text-sm text-[var(--color-text-muted)] mt-0.5">Unit {lastUnit.number} — {lastUnit.title}</p>
            </div>
          </div>
        </Link>
      )}

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Topics', value: allTopics.length, icon: '📚' },
          { label: 'Completed', value: completedTopics, icon: '✅' },
          { label: 'In Progress', value: inProgressTopics, icon: '📝' },
          { label: 'Labs', value: 9, icon: '🧪' },
        ].map((stat) => (
          <div key={stat.label} className="glass-card p-6 text-center hover:bg-[var(--color-bg-hover)] transition-colors">
            <span className="text-3xl mb-2 block">{stat.icon}</span>
            <p className="text-2xl font-bold text-[var(--color-text-primary)] mt-1">{stat.value}</p>
            <p className="text-sm font-medium text-[var(--color-text-tertiary)]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Units Overview */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Course Units</h2>
        <div className="grid gap-6">
          {curriculumMap.map((unit) => {
            const unitCompleted = unit.topics.filter(
              (t) => topicProgress[t.id]?.status === 'completed'
            ).length;
            return (
              <Link
                key={unit.id}
                to={`/unit/${unit.slug}`}
                className="glass-card p-4 md:p-6 hover:bg-[var(--color-bg-hover)] transition-all group hover:border-[var(--color-border-secondary)]"
              >
                <div className="flex flex-col md:flex-row items-start justify-between gap-4 md:gap-6">
                  <div className="flex-1 min-w-0 w-full">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge text={`Unit ${unit.number}`} variant="accent" />
                      <Badge text={`${unit.hours} hrs`} variant="default" />
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                      {unit.title}
                    </h3>
                    <p className="text-base text-[var(--color-text-tertiary)] mt-1 line-clamp-2">
                      {unit.description}
                    </p>
                  </div>
                  <div className="self-center md:self-auto flex-shrink-0">
                    <ProgressRing percentage={Math.round((unitCompleted / unit.topics.length) * 100)} size={56} strokeWidth={4} />
                  </div>
                </div>
                <ProgressBar
                  value={unitCompleted}
                  max={unit.topics.length}
                  label={`${unitCompleted} of ${unit.topics.length} topics`}
                  size="sm"
                  className="mt-4"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Quick Access</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          {[
            { label: 'Theory Practice', path: '/theory-practice', icon: '📖', color: 'var(--color-info)' },
            { label: 'Coding Practice', path: '/programming-practice', icon: '💻', color: 'var(--color-success)' },
            { label: 'Lab Companion', path: '/labs', icon: '🧪', color: 'var(--color-warning)' },
            { label: 'Quiz Zone', path: '/quiz', icon: '🎯', color: 'var(--color-accent-primary)' },
            { label: 'Debugging Lab', path: '/debugging-lab', icon: '🐛', color: 'var(--color-error)' },
            { label: 'Revision Notes', path: '/revision', icon: '📋', color: 'var(--color-accent-secondary)' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="glass-card p-5 flex items-center gap-4 hover:bg-[var(--color-bg-hover)] transition-all group hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-2xl transition-transform group-hover:scale-110">{link.icon}</span>
              <span className="text-base font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                {link.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
