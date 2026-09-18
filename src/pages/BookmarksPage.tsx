import { useAppStore } from '../store';
import { EmptyState } from '../components/shared/EmptyState';
import { Badge } from '../components/shared/Badge';
import type { Bookmark } from '../types';

export function BookmarksPage() {
  const bookmarks = useAppStore((s) => s.bookmarks);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);

  const grouped = bookmarks.reduce<Record<Bookmark['type'], Bookmark[]>>((acc, b) => {
    (acc[b.type] = acc[b.type] || []).push(b);
    return acc;
  }, {} as Record<Bookmark['type'], Bookmark[]>);

  const typeLabels: Record<Bookmark['type'], string> = {
    topic: 'Topics',
    example: 'Code Examples',
    problem: 'Problems',
    lab: 'Labs',
    question: 'Questions',
    'revision-card': 'Revision Cards',
  };

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Bookmarks</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          Your saved topics, examples, problems, and more. {bookmarks.length} items bookmarked.
        </p>
      </div>

      {bookmarks.length > 0 ? (
        Object.entries(grouped).map(([type, items]) => (
          <div key={type}>
            <h2 className="text-sm font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3 flex items-center gap-2">
              {typeLabels[type as Bookmark['type']]}
              <Badge text={String(items.length)} variant="accent" />
            </h2>
            <div className="space-y-2">
              {items.map((b) => (
                <div key={b.id} className="glass-card p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-[var(--color-text-primary)]">{b.title}</p>
                    <p className="text-xs text-[var(--color-text-muted)]">
                      {new Date(b.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleBookmark(b)}
                    className="text-[var(--color-warning)] hover:text-[var(--color-error)] transition-colors p-1"
                    title="Remove bookmark"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <EmptyState title="No Bookmarks Yet" message="Bookmark topics, code examples, or problems to find them quickly later." icon="bookmark" />
      )}
    </div>
  );
}
