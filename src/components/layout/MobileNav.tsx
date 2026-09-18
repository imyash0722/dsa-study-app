import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

export function MobileNav() {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/', icon: '🏠' },
    { label: 'Practice', path: '/theory-practice', icon: '📝' },
    { label: 'Labs', path: '/labs', icon: '🧪' },
    { label: 'Progress', path: '/progress', icon: '📈' },
    { label: 'Bookmarks', path: '/bookmarks', icon: '🔖' },
  ];

  return (
    <div 
      className="md:hidden fixed bottom-0 left-0 right-0 bg-[var(--color-bg-card)] border-t border-[var(--color-border-primary)] z-40 flex items-center justify-around px-2 min-h-[64px]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center justify-center min-w-[64px] min-h-[64px] space-y-1 transition-colors py-1',
              isActive ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
            )}
          >
            <span className={cn("text-xl", isActive && "scale-110 transition-transform")}>{item.icon}</span>
            <span className={cn("text-[10px] font-medium tracking-wide", isActive && "font-bold")}>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
