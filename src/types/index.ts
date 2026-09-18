export * from './curriculum';
export * from './content';
export * from './practice';
export * from './lab';
export * from './progress';

// ─── UI / Navigation Interfaces ───

import type { CompletionStatus } from './progress';

export interface SidebarItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  children?: SidebarItem[];
  status?: CompletionStatus;
}

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export interface TabItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}
