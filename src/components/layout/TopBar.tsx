import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useAppStore } from '../../store';
import { SearchModal } from '../shared/SearchModal';
import { curriculumMap } from '../../data/curriculum-map';
import { getTopicBySlug } from '../../data';
import { Tooltip } from '../shared/Tooltip';

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const streak = useAppStore((s) => s.streak);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);

  // Generate breadcrumbs based on route
  const pathParts = location.pathname.split('/').filter(Boolean);
  let breadcrumbs = [{ label: 'Home', path: '/' }];

  if (pathParts[0] === 'unit' && pathParts[1]) {
    const unit = curriculumMap.find((u) => u.slug === pathParts[1]);
    if (unit) {
      breadcrumbs.push({ label: `Unit ${unit.number}`, path: `/unit/${unit.slug}` });
      if (pathParts[2]) {
        const topic = getTopicBySlug(unit.slug, pathParts[2]);
        if (topic) {
          breadcrumbs.push({ label: topic.title, path: `/unit/${unit.slug}/${topic.slug}` });
        }
      }
    }
  } else if (pathParts[0] === 'labs') {
    breadcrumbs.push({ label: 'Labs', path: '/labs' });
    if (pathParts[1]) {
      breadcrumbs.push({ label: pathParts[1], path: `/labs/${pathParts[1]}` });
    }
  } else if (pathParts[0]) {
    // Capitalize first letter for other routes
    const title = pathParts[0].split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    breadcrumbs.push({ label: title, path: `/${pathParts[0]}` });
  }

  return (
    <>
      <header className="h-14 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 lg:px-6 gap-2">
        
        <div className="flex items-center gap-3 overflow-hidden">
          {/* Hamburger Menu (Mobile Only) */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)] flex items-center justify-center transition-colors"
            aria-label="Open menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumbs (Hidden on Mobile) */}
          <nav className="hidden md:flex items-center text-sm overflow-hidden">
          {breadcrumbs.map((crumb, i) => (
            <div key={crumb.path} className="flex items-center">
              {i > 0 && (
                <svg className="w-4 h-4 mx-2 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              )}
              {i === breadcrumbs.length - 1 ? (
                <span className="font-medium text-[var(--color-text-primary)] truncate max-w-[200px] lg:max-w-[300px]">
                  {crumb.label}
                </span>
              ) : (
                <Link to={crumb.path} className="text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors truncate max-w-[150px]">
                  {crumb.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Title */}
        <div className="md:hidden font-semibold text-[var(--color-text-primary)] truncate flex-1 text-left">
          {breadcrumbs[breadcrumbs.length - 1]?.label}
        </div>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {/* Search trigger */}
          <button
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
            className="flex items-center justify-center md:justify-start gap-2 px-2 md:px-3 py-1.5 md:min-w-0 min-w-[44px] min-h-[44px] rounded-lg md:bg-[var(--color-bg-secondary)] md:border border-[var(--color-border-primary)] border-transparent hover:border-[var(--color-border-secondary)] transition-colors text-sm text-[var(--color-text-muted)]"
          >
            <svg className="w-5 h-5 md:w-4 md:h-4 text-[var(--color-text-primary)] md:text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span className="hidden md:inline">Search...</span>
            <span className="hidden lg:inline text-[10px] bg-[var(--color-bg-primary)] px-1.5 py-0.5 rounded border border-[var(--color-border-primary)] ml-2">Cmd+K</span>
          </button>

          {/* Streak Indicator */}
          {streak.current > 0 && (
            <Tooltip content={`${streak.current} day learning streak!`}>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-warning)]/10 text-[var(--color-warning)] text-sm font-semibold border border-[var(--color-warning)]/20 cursor-default">
                <span>🔥</span>
                <span>{streak.current}</span>
              </div>
            </Tooltip>
          )}

        </div>
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
