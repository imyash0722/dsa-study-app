import { useState, useRef } from 'react';
import type { ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export function Tooltip({ content, children, position = 'top', className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div 
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      ref={triggerRef}
    >
      {children}
      
      {isVisible && (
        <div
          ref={tooltipRef}
          className={cn(
            'absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded shadow-lg animate-fade-in pointer-events-none whitespace-nowrap',
            positionClasses[position],
            className
          )}
          role="tooltip"
        >
          {content}
          
          {/* Arrow */}
          <div className={cn(
            'absolute w-2 h-2 bg-gray-900 transform rotate-45',
            position === 'top' && 'bottom-[-4px] left-1/2 -translate-x-1/2',
            position === 'bottom' && 'top-[-4px] left-1/2 -translate-x-1/2',
            position === 'left' && 'right-[-4px] top-1/2 -translate-y-1/2',
            position === 'right' && 'left-[-4px] top-1/2 -translate-y-1/2'
          )} />
        </div>
      )}
    </div>
  );
}
