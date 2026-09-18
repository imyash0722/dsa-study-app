import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { curriculumMap } from '../../data/curriculum-map';
import { useAppStore } from '../../store';
import { cn } from '../../utils/cn';
import type { CompletionStatus } from '../../types';

// ─── Icons (inline SVG for zero dependencies) ───

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={cn('w-4 h-4 transition-transform duration-200', open && 'rotate-90')}
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

function StatusDot({ status }: { status: CompletionStatus }) {
  const colors: Record<CompletionStatus, string> = {
    'not-started': 'bg-[var(--color-text-muted)]',
    'in-progress': 'bg-[var(--color-warning)]',
    'completed': 'bg-[var(--color-success)]',
  };
  return <span className={cn('w-2 h-2 rounded-full flex-shrink-0', colors[status])} />;
}

function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function BookIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
    </svg>
  );
}

function BeakerIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.299 4.887a1.5 1.5 0 01-1.45 1.113H7.749a1.5 1.5 0 01-1.45-1.113L5 14.5m14 0H5" />
    </svg>
  );
}

function QuizIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
    </svg>
  );
}

function EyeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );
}

function TheoryIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
    </svg>
  );
}

function BugIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75c1.148 0 2.278.08 3.383.237 1.037.146 1.866.966 1.866 2.013 0 3.728-2.35 6.75-5.25 6.75S6.75 18.728 6.75 15c0-1.046.83-1.867 1.866-2.013A24.204 24.204 0 0112 12.75zm0 0c2.883 0 5.647.508 8.207 1.44a23.91 23.91 0 01-1.152-6.135 3.001 3.001 0 00-2.536-2.89 14.088 14.088 0 00-9.038 0 3.001 3.001 0 00-2.536 2.89 23.911 23.911 0 01-1.152 6.135A23.86 23.86 0 0112 12.75z" />
    </svg>
  );
}


function CardIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
    </svg>
  );
}

// ─── Sidebar Section Link ───

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

function SidebarNavItem({ to, icon, label, collapsed }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          'flex items-center rounded-lg text-sm font-medium transition-all duration-200',
          'hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]',
          isActive
            ? 'bg-[var(--color-bg-active)] text-[var(--color-accent-primary)] glow-border'
            : 'text-[var(--color-text-secondary)]',
          collapsed 
            ? 'justify-center w-10 h-10 mx-auto'
            : 'gap-3 px-3 py-2.5'
        )
      }
      title={collapsed ? label : undefined}
    >
      {icon}
      <span className={cn(
        "whitespace-nowrap overflow-hidden transition-all duration-300",
        collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
      )}>
        {label}
      </span>
    </NavLink>
  );
}

// ─── Unit Accordion ───

interface UnitAccordionProps {
  unit: typeof curriculumMap[number];
  collapsed: boolean;
}

function UnitAccordion({ unit, collapsed }: UnitAccordionProps) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const topicProgress = useAppStore((s) => s.topicProgress);

  const isUnitActive = location.pathname.includes(`/unit/${unit.slug}`);
  const completedCount = unit.topics.filter(
    (t) => topicProgress[t.id]?.status === 'completed'
  ).length;

  // Auto-expand if this unit is active
  const isOpen = open || isUnitActive;

  if (collapsed) {
    return (
      <NavLink
        to={`/unit/${unit.slug}`}
        className={cn(
          'flex items-center justify-center w-10 h-10 mx-auto rounded-lg transition-all',
          'hover:bg-[var(--color-bg-hover)]',
          isUnitActive
            ? 'text-[var(--color-accent-primary)] bg-[var(--color-bg-active)]'
            : 'text-[var(--color-text-secondary)]'
        )}
        title={`Unit ${unit.number}: ${unit.title}`}
      >
        <BookIcon />
      </NavLink>
    );
  }

  return (
    <div className="space-y-0.5">
      <button
        onClick={() => setOpen(!isOpen)}
        className={cn(
          'w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
          'hover:bg-[var(--color-bg-hover)]',
          isUnitActive
            ? 'text-[var(--color-accent-primary)]'
            : 'text-[var(--color-text-primary)]'
        )}
      >
        <ChevronIcon open={isOpen} />
        <span className="flex-1 text-left truncate">
          <span className="text-[var(--color-accent-secondary)] mr-1.5">U{unit.number}</span>
          {unit.title}
        </span>
        <span className="text-xs text-[var(--color-text-tertiary)]">
          {completedCount}/{unit.topics.length}
        </span>
      </button>

      {isOpen && (
        <div className="ml-4 pl-3 border-l border-[var(--color-border-primary)] space-y-0.5 animate-fade-in">
          {unit.topics.map((topic) => {
            const status: CompletionStatus =
              topicProgress[topic.id]?.status ?? 'not-started';
            return (
              <NavLink
                key={topic.id}
                to={`/unit/${unit.slug}/${topic.slug}`}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] transition-all duration-150',
                    'hover:bg-[var(--color-bg-hover)] hover:text-[var(--color-text-primary)]',
                    isActive
                      ? 'bg-[var(--color-bg-active)] text-[var(--color-accent-tertiary)] font-medium'
                      : 'text-[var(--color-text-secondary)]'
                  )
                }
              >
                <StatusDot status={status} />
                <span className="truncate">{topic.title}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Main Sidebar ───

interface SidebarProps {
  forceMobileExpanded?: boolean;
}

export function Sidebar({ forceMobileExpanded }: SidebarProps = {}) {
  const sidebarCollapsed = useAppStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useAppStore((s) => s.toggleSidebar);
  const setMobileSidebarOpen = useAppStore((s) => s.setMobileSidebarOpen);

  // When used in mobile drawer, always show expanded
  const isCollapsed = forceMobileExpanded ? false : sidebarCollapsed;

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 h-screen flex flex-col bg-[var(--color-bg-secondary)] border-r border-[var(--color-border-primary)] transition-all duration-300 z-40',
        forceMobileExpanded ? 'w-72' : (isCollapsed ? 'w-16' : 'w-64')
      )}
    >
      {/* Logo / Header */}
      <div className={cn(
        'flex items-center h-[var(--topbar-height)] border-b border-[var(--color-border-primary)] px-4 flex-shrink-0',
        isCollapsed && 'justify-center px-2'
      )}>
        <div className={cn(
          "flex items-center gap-2 flex-1 min-w-0 transition-all duration-300 whitespace-nowrap overflow-hidden",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--color-accent-primary)] to-[var(--color-accent-secondary)] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-xs">DSA</span>
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-[var(--color-text-primary)] truncate">DSA</h1>
            <p className="text-[10px] text-[var(--color-text-tertiary)] truncate">UE25CS252A</p>
          </div>
        </div>
        {forceMobileExpanded ? (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-md hover:bg-[var(--color-bg-hover)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors flex-shrink-0"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <svg className={cn('w-4 h-4 transition-transform', isCollapsed && 'rotate-180')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        )}
      </div>

      {/* Scrollable Content */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {/* Main Navigation */}
        <SidebarNavItem to="/" icon={<HomeIcon />} label="Dashboard" collapsed={isCollapsed} />

        {/* Divider + Section Label */}
        <p className={cn(
          "px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-all duration-300 whitespace-nowrap overflow-hidden",
          isCollapsed ? "h-0 w-0 opacity-0 p-0 m-0" : "opacity-100"
        )}>
          Curriculum
        </p>
        {isCollapsed && <div className="border-t border-[var(--color-border-primary)] my-2" />}

        {/* Unit Accordions */}
        {curriculumMap.map((unit) => (
          <UnitAccordion key={unit.id} unit={unit} collapsed={isCollapsed} />
        ))}

        {/* Divider */}
        <p className={cn(
          "px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-all duration-300 whitespace-nowrap overflow-hidden",
          isCollapsed ? "h-0 w-0 opacity-0 p-0 m-0" : "opacity-100"
        )}>
          Practice
        </p>
        {isCollapsed && <div className="border-t border-[var(--color-border-primary)] my-2" />}

        <SidebarNavItem to="/theory-practice" icon={<TheoryIcon />} label="Theory Practice" collapsed={isCollapsed} />
        <SidebarNavItem to="/programming-practice" icon={<CodeIcon />} label="Coding Practice" collapsed={isCollapsed} />
        <SidebarNavItem to="/quiz" icon={<QuizIcon />} label="Quiz Zone" collapsed={isCollapsed} />
        <SidebarNavItem to="/output-prediction" icon={<EyeIcon />} label="Output Prediction" collapsed={isCollapsed} />
        <SidebarNavItem to="/debugging-lab" icon={<BugIcon />} label="Debugging Lab" collapsed={isCollapsed} />

        {/* Divider */}
        <p className={cn(
          "px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)] transition-all duration-300 whitespace-nowrap overflow-hidden",
          isCollapsed ? "h-0 w-0 opacity-0 p-0 m-0" : "opacity-100"
        )}>
          Resources
        </p>
        {isCollapsed && <div className="border-t border-[var(--color-border-primary)] my-2" />}

        <SidebarNavItem to="/labs" icon={<BeakerIcon />} label="Lab Companion" collapsed={isCollapsed} />
        <SidebarNavItem to="/revision" icon={<CardIcon />} label="Revision Notes" collapsed={isCollapsed} />
        <SidebarNavItem to="/bookmarks" icon={<BookmarkIcon />} label="Bookmarks" collapsed={isCollapsed} />
        <SidebarNavItem to="/progress" icon={<ChartIcon />} label="Progress" collapsed={isCollapsed} />
      </nav>

      {/* Footer */}
      <div className={cn(
        "p-3 border-t border-[var(--color-border-primary)] flex-shrink-0 transition-all duration-300 overflow-hidden whitespace-nowrap",
        isCollapsed ? "h-0 opacity-0 p-0 border-0" : "opacity-100"
      )}>
        <div className="glass-card p-3 text-center">
          <p className="text-xs text-[var(--color-text-tertiary)]">PES University</p>
          <p className="text-[10px] text-[var(--color-text-muted)]">Problem Solving with C</p>
        </div>
      </div>
    </aside>
  );
}
