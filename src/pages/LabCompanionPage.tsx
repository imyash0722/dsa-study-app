import { useParams, Navigate } from 'react-router-dom';
import { getLabBySlug } from '../data';
import { CodeBlock } from '../components/content/CodeBlock';
import { VivaQuestions } from '../components/lab/VivaQuestions';
import { GDBWalkthrough } from '../components/lab/GDBWalkthrough';
import { DescriptionRenderer } from '../components/shared/DescriptionRenderer';

export function LabCompanionPage() {
  const { labSlug } = useParams<{ labSlug: string }>();
  const lab = getLabBySlug(labSlug || '');

  if (!lab) {
    return <Navigate to="/labs" replace />;
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">
          Lab {lab.number}: {lab.title}
        </h1>
        <DescriptionRenderer description={`Objective: ${lab.objective}\n\n${lab.description}`} />
      </div>

      {/* Solution Code */}
      <div className="glass-card overflow-hidden">
        <div className="p-4 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
          <h2 className="font-semibold text-[var(--color-text-primary)]">Solution Code</h2>
        </div>
        <CodeBlock code={lab.solution} language="c" />
      </div>

      {/* Explanation */}
      <div className="glass-card p-6">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-4">Explanation</h2>
        <div className="text-[var(--color-text-secondary)] space-y-4 text-sm leading-relaxed">
          {lab.solutionExplanation.split('\n\n').map((para, idx) => (
            <p key={idx}>{para}</p>
          ))}
        </div>
      </div>

      {/* GDB Walkthrough */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">GDB Walkthrough</h2>
        <GDBWalkthrough walkthrough={lab.gdbWalkthrough} />
      </div>

      {/* Viva Questions */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Viva Questions</h2>
        <VivaQuestions questions={lab.vivaQuestions} />
      </div>
    </div>
  );
}
