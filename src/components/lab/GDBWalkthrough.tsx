import { useState } from 'react';
import { cn } from '../../utils/cn';
import type { GDBWalkthrough as GDBWalkthroughType } from '../../types';

interface GDBWalkthroughProps {
  walkthrough: GDBWalkthroughType;
}

export function GDBWalkthrough({ walkthrough }: GDBWalkthroughProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const step = walkthrough.steps[currentStep];

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] flex items-center gap-2">
          <span className="text-[var(--color-error)]">🐛</span> {walkthrough.title}
        </h2>
      </div>

      <div className="grid md:grid-cols-2">
        {/* Left: Code Context */}
        <div className="p-5 border-b md:border-b-0 md:border-r border-[var(--color-border-primary)] bg-[var(--color-bg-primary)]">
          <h3 className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wide mb-3">Code Target</h3>
          <div className="text-sm text-[var(--color-text-secondary)]">
            <p>Target file: <code className="text-[var(--color-accent-primary)] font-mono">{walkthrough.programFile}</code></p>
            {walkthrough.breakpoints && walkthrough.breakpoints.length > 0 && (
              <p className="mt-2">Breakpoints at lines: {walkthrough.breakpoints.join(', ')}</p>
            )}
            {walkthrough.watchedVariables && walkthrough.watchedVariables.length > 0 && (
              <p className="mt-2">Watched Variables: {walkthrough.watchedVariables.join(', ')}</p>
            )}
          </div>
        </div>

        {/* Right: GDB Terminal */}
        <div className="flex flex-col bg-[var(--color-terminal-bg)] relative">
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#1e293b]/50 border-b border-[#334155] flex items-center px-4">
            <span className="text-[10px] text-[var(--color-text-muted)] font-mono">gdb (interactive)</span>
          </div>
          
          <div className="flex-1 p-5 pt-12 overflow-y-auto font-mono text-sm">
            <div className="space-y-4">
              <div className="text-[var(--color-text-muted)]">
                Reading symbols from ./debug_target... done.<br/>
                (gdb)
              </div>
              
              <div className="animate-fade-in">
                <div className="text-[var(--color-terminal-prompt)]">
                  <span className="text-[var(--color-text-muted)]">(gdb) </span> 
                  {step.command}
                </div>
                <div className="text-[var(--color-terminal-text)] whitespace-pre-wrap mt-2">
                  {step.output}
                </div>
              </div>
            </div>
          </div>

          {/* Explanation & Controls */}
          <div className="p-5 border-t border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
            <div className="mb-4 md:h-10 min-h-[40px]">
              <span className="inline-block bg-[var(--color-accent-primary)] text-white text-[10px] font-bold px-2 py-0.5 rounded mr-2 uppercase tracking-widest align-middle">
                Step {currentStep + 1}/{walkthrough.steps.length}
              </span>
              <span className="text-sm text-[var(--color-text-primary)] align-middle leading-relaxed">{step.explanation}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <button
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-[var(--color-bg-hover)] text-[var(--color-text-primary)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              
              <span className="text-xs text-[var(--color-text-tertiary)] font-medium">
                Step {currentStep + 1} of {walkthrough.steps.length}
              </span>

              <button
                onClick={() => setCurrentStep(Math.min(walkthrough.steps.length - 1, currentStep + 1))}
                disabled={currentStep === walkthrough.steps.length - 1}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  currentStep === walkthrough.steps.length - 1 
                    ? "opacity-50 cursor-not-allowed bg-[var(--color-bg-hover)] text-[var(--color-text-primary)]" 
                    : "bg-[var(--color-accent-primary)] text-white hover:bg-[var(--color-accent-hover)]"
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
