import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';
import type { TabItem } from '../../types';

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (tabId: string) => void;
  children: ReactNode;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, children, className }: TabsProps) {
  return (
    <div className={className}>
      <div 
        className="flex items-center gap-1 border-b border-[var(--color-border-primary)] overflow-x-auto whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style>{`.overflow-x-auto::-webkit-scrollbar { display: none; }`}</style>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 -mb-px',
              activeTab === tab.id
                ? 'border-[var(--color-accent-primary)] text-[var(--color-accent-primary)]'
                : 'border-transparent text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:border-[var(--color-border-secondary)]'
            )}
          >
            {tab.icon && <span>{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4 animate-fade-in">
        {children}
      </div>
    </div>
  );
}
