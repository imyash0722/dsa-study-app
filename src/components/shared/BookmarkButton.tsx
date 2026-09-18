import { useAppStore } from '../../store';
import { cn } from '../../utils/cn';
import type { Bookmark } from '../../types';

interface BookmarkButtonProps {
  id: string;
  type: Bookmark['type'];
  targetId: string;
  title: string;
  className?: string;
}

export function BookmarkButton({ id, type, targetId, title, className }: BookmarkButtonProps) {
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const bookmarks = useAppStore((s) => s.bookmarks);
  const isActive = bookmarks.some((b) => b.targetId === targetId);

  return (
    <button
      onClick={() => toggleBookmark({ id, type, targetId, title })}
      className={cn(
        'p-1.5 rounded-md transition-all duration-200',
        isActive
          ? 'text-[var(--color-warning)] hover:text-[var(--color-warning)]/80'
          : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]',
        className
      )}
      title={isActive ? 'Remove bookmark' : 'Add bookmark'}
    >
      <svg
        className="w-5 h-5"
        fill={isActive ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
      </svg>
    </button>
  );
}
