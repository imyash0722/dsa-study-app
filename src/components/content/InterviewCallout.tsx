import type { InterviewCallout as InterviewCalloutType } from '../../types';
import { Badge } from '../shared/Badge';
import { cn } from '../../utils/cn';

interface InterviewCalloutProps {
  callout: InterviewCalloutType;
  className?: string;
}

const frequencyConfig = {
  common: { variant: 'warning' as const, label: 'Frequently Asked' },
  occasional: { variant: 'accent' as const, label: 'Sometimes Asked' },
  rare: { variant: 'default' as const, label: 'Rarely Asked' },
};

export function InterviewCallout({ callout, className }: InterviewCalloutProps) {
  const config = frequencyConfig[callout.frequency];

  return (
    <div className={cn(
      'glass-card p-4 border-l-4 border-[var(--color-warning)] relative overflow-hidden',
      className
    )}>
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-[var(--color-warning)]/5 rounded-full -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-base">💡</span>
          <span className="text-sm font-semibold text-[var(--color-text-primary)] flex-1">{callout.title}</span>
          <Badge text={config.label} variant={config.variant} />
        </div>
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{callout.content}</p>
      </div>
    </div>
  );
}
