import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { ScrollToTop } from '../shared/ScrollToTop';
import { useAppStore } from '../../store';
import { useEffect } from 'react';

export function MainLayout() {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const mobileSidebarOpen = useAppStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);
  const location = useLocation();

  // Always use dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname, setMobileSidebarOpen]);

  // Handle Cmd+K globally to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchBtn = document.querySelector('button[aria-label="Search"]') as HTMLButtonElement;
        if (searchBtn) searchBtn.click();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] font-sans selection:bg-[var(--color-accent-primary)]/30 overflow-x-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileSidebarOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 md:hidden animate-slide-in-left">
            <Sidebar forceMobileExpanded />
          </div>
        </>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col min-h-screen transition-[margin-left] duration-300 ease-in-out md:ml-64"
        style={sidebarCollapsed ? { marginLeft: '64px' } : undefined}
      >
        <TopBar />
          <main className="flex-1 overflow-y-auto scroll-smooth pb-20 md:pb-0">
            <div className="max-w-5xl mx-auto p-4 md:p-8 lg:p-10 w-full animate-fade-in">
              <Outlet />
            </div>
          </main>
          <ScrollToTop />
      </div>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
}
