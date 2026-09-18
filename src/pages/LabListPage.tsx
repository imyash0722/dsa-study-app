import { Link } from 'react-router-dom';
import { Badge } from '../components/shared/Badge';
import { allLabs } from '../data';

export function LabListPage() {
  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Lab Companion</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Complete lab programs with objectives, solutions, viva Q&A, and GDB debugging walkthroughs.
        </p>
        <div className="flex items-center gap-2 mt-3">
          <Badge text="9 Labs" variant="accent" />
          <Badge text="14 Hours" variant="default" />
          <Badge text="GCC + GDB" variant="default" />
        </div>
      </div>

      <div className="grid gap-3">
        {allLabs.map((lab) => (
          <Link
            key={lab.id}
            to={`/labs/${lab.slug}`}
            className="glass-card p-5 flex items-center gap-4 hover:bg-[var(--color-bg-hover)] transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">{lab.number}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-primary)] transition-colors">
                {lab.title}
              </h3>
              <div className="flex gap-1.5 mt-1">
                {lab.unitIds.map((u) => (
                  <Badge key={u} text={u.replace('-', ' ').toUpperCase()} variant="default" />
                ))}
              </div>
            </div>
            <svg className="w-5 h-5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent-primary)] group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        ))}
      </div>
    </div>
  );
}
