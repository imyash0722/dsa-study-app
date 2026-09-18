import { cn } from '../../utils/cn';

interface DescriptionRendererProps {
  description: string;
  className?: string;
}

export function DescriptionRenderer({ description, className }: DescriptionRendererProps) {
  if (!description) return null;

  // Split on double newlines to create separate paragraphs
  const paragraphs = description.split(/\n\n+/).filter((p) => p.trim() !== '');

  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((paragraph, index) => {
        // Check if paragraph starts with a phrase followed by a colon (e.g., "Stack memory:")
        // Pattern: Starts with alphanumeric/spaces (up to 40 chars) followed by a colon
        const match = paragraph.match(/^([A-Za-z0-9\s-]+):\s*/);
        
        const isFirst = index === 0;

        if (match) {
          const boldText = match[1];
          const remainingText = paragraph.substring(match[0].length);

          return (
            <p 
              key={index} 
              className={cn(
                "leading-relaxed text-[var(--color-text-secondary)]",
                isFirst ? "text-base font-medium" : "text-base"
              )}
            >
              <strong className="text-[var(--color-text-primary)] font-bold">{boldText}:</strong> {remainingText}
            </p>
          );
        }

        return (
          <p 
            key={index} 
            className={cn(
              "leading-relaxed text-[var(--color-text-secondary)]",
              isFirst ? "text-base font-medium" : "text-base"
            )}
          >
            {paragraph}
          </p>
        );
      })}
    </div>
  );
}
