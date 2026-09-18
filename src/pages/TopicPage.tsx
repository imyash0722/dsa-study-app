import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTopicBySlug, getTopicById, getUnitBySlug, curriculumMap } from '../data';
import { useAppStore } from '../store';
import { Tabs } from '../components/shared/Tabs';
import { Badge, DifficultyBadge } from '../components/shared/Badge';
import { BookmarkButton } from '../components/shared/BookmarkButton';
import { EmptyState } from '../components/shared/EmptyState';
import { DescriptionRenderer } from '../components/shared/DescriptionRenderer';
import { CodeBlock } from '../components/content/CodeBlock';
import { cn } from '../utils/cn';
import type { TabItem, TheoryQuestion, ProgrammingProblem } from '../types';

const topicTabs: TabItem[] = [
  { id: 'learn', label: 'Learn' },
  { id: 'examples', label: 'Code Examples' },
  { id: 'practice', label: 'Practice' },
  { id: 'mistakes', label: 'Common Mistakes' },
  { id: 'revision', label: 'Revision' },
];

export function TopicPage() {
  const { unitSlug, topicSlug } = useParams<{ unitSlug: string; topicSlug: string }>();
  const [activeTab, setActiveTab] = useState('learn');
  const unit = getUnitBySlug(unitSlug || '');
  const topic = getTopicBySlug(unitSlug || '', topicSlug || '');
  const markTopicVisited = useAppStore((s) => s.markTopicVisited);
  const markTopicStatus = useAppStore((s) => s.markTopicStatus);
  const topicProgress = useAppStore((s) => s.topicProgress);

  useEffect(() => {
    if (topic) {
      markTopicVisited(topic.id);
      window.scrollTo(0, 0);
    }
  }, [topic?.id, markTopicVisited]);

  if (!topic || !unit) {
    return <EmptyState title="Topic Not Found" message="The requested topic doesn't exist." icon="book" />;
  }

  const progress = topicProgress[topic.id];
  const prereqTopics = topic.prerequisites.map(getTopicById).filter(Boolean);

  // Find prev/next topics
  const unitIndex = curriculumMap.findIndex(u => u.id === unit.id);
  const topicIndex = unit.topics.findIndex(t => t.id === topic.id);
  
  let prevTopic = null;
  let nextTopic = null;

  if (topicIndex > 0) {
    prevTopic = { unit: unit.slug, topic: unit.topics[topicIndex - 1] };
  } else if (unitIndex > 0) {
    const prevUnit = curriculumMap[unitIndex - 1];
    if (prevUnit.topics.length > 0) {
      prevTopic = { unit: prevUnit.slug, topic: prevUnit.topics[prevUnit.topics.length - 1] };
    }
  }

  if (topicIndex < unit.topics.length - 1) {
    nextTopic = { unit: unit.slug, topic: unit.topics[topicIndex + 1] };
  } else if (unitIndex < curriculumMap.length - 1) {
    const nextUnit = curriculumMap[unitIndex + 1];
    if (nextUnit.topics.length > 0) {
      nextTopic = { unit: nextUnit.slug, topic: nextUnit.topics[0] };
    }
  }

  return (
    <div className="space-y-8 pb-16">


      {/* Topic Header */}
      <div className="glass-card p-4 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <DifficultyBadge level={topic.difficulty} />
              <Badge text={`${topic.estimatedMinutes} min`} variant="default" />
              {progress?.status === 'completed' && <Badge text="Completed" variant="success" />}
              {progress?.status === 'in-progress' && <Badge text="In Progress" variant="warning" />}
            </div>
            <h1 className="text-3xl font-bold text-[var(--color-text-primary)] mb-3">{topic.title}</h1>
            <DescriptionRenderer description={topic.description} className="mb-6" />

            <div className="flex items-center gap-4 flex-wrap">
              <button 
                onClick={() => markTopicStatus(topic.id, progress?.status === 'completed' ? 'in-progress' : 'completed')}
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors text-sm",
                  progress?.status === 'completed' 
                    ? "bg-[var(--color-success)]/10 text-[var(--color-success)] border border-[var(--color-success)]/20 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20" 
                    : "bg-[var(--color-accent-primary)] hover:bg-[var(--color-accent-hover)] text-white"
                )}
              >
                {progress?.status === 'completed' ? '✓ Completed (Undo)' : 'Mark as Complete'}
              </button>

              {/* Prerequisites */}
              {prereqTopics.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap ml-4 pl-4 border-l border-[var(--color-border-primary)]">
                  <span className="text-xs text-[var(--color-text-muted)]">Prereqs:</span>
                  {prereqTopics.map((pt) => pt && (
                    <Link key={pt.id} to={`/unit/${pt.unitId.replace('unit-','') /* simplification */}/${pt.slug}`}>
                      <Badge text={pt.title} variant="default" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
          <BookmarkButton
            id={`bm-${topic.id}`}
            type="topic"
            targetId={topic.id}
            title={topic.title}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <Tabs tabs={topicTabs} activeTab={activeTab} onChange={setActiveTab}>
        {/* ═══ Learn Tab ═══ */}
        {activeTab === 'learn' && (
          <div className="space-y-8 animate-fade-in">
            {topic.subtopics.length > 0 ? (
              <div className="space-y-8">
                {topic.subtopics.map((subtopic, idx) => (
                  <div key={subtopic.id}>
                    {idx > 0 && <hr className="my-8 border-t border-[var(--color-border-primary)]/50" />}
                    <div className="glass-card p-4 md:p-8">
                      <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-4">{subtopic.title}</h2>
                      <DescriptionRenderer description={subtopic.description} className="mb-6" />
                      
                      <h3 className="text-sm font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider mt-8 mb-4 border-l-4 border-[var(--color-accent-primary)] pl-3">Key Concepts</h3>
                    {subtopic.keyPoints.length > 0 && (
                      <ul className="space-y-3">
                        {subtopic.keyPoints.map((point, i) => (
                          <li key={i} className="flex items-start gap-3 text-base text-[var(--color-text-primary)] p-3 rounded-lg bg-[var(--color-bg-tertiary)] mb-3">
                            <span className="text-[var(--color-accent-primary)] mt-1 flex-shrink-0">✦</span>
                            <span className="leading-relaxed">{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="Content Coming Soon" message="Theory content for this topic will be added in upcoming updates." icon="book" />
            )}
          </div>
        )}

        {/* ═══ Code Examples Tab ═══ */}
        {activeTab === 'examples' && (
          <div className="space-y-8 animate-fade-in">
            {topic.subtopics.some((s) => s.codeExamples.length > 0) ? (
              topic.subtopics.flatMap((s) => s.codeExamples).map((example) => (
                <div key={example.id} className="glass-card p-4 md:p-8 space-y-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-2">{example.title}</h3>
                      <p className="text-base text-[var(--color-text-secondary)]">{example.explanation}</p>
                    </div>
                    <BookmarkButton id={`bm-${example.id}`} type="example" targetId={example.id} title={example.title} />
                  </div>
                  
                  <div className="rounded-xl overflow-hidden shadow-lg border border-[var(--color-border-secondary)]">
                    <CodeBlock code={example.code} title={`${example.id || 'example'}.c`} />
                  </div>

                  {/* Expected Output */}
                  <div>
                    <h4 className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-3">Expected Output</h4>
                    <div className="bg-[#0D1117] border border-[#30363d] rounded-lg p-4 font-mono text-sm text-[#e6edf3] whitespace-pre-wrap overflow-x-auto shadow-inner">
                      <span className="text-[#3fb950] font-bold">$ ./program</span>
                      <br/>
                      {example.expectedOutput}
                    </div>
                  </div>

                  {/* Line-by-Line Breakdown */}
                  {example.lineBreakdown.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-[var(--color-border-primary)] overflow-x-auto">
                      <h4 className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-4">Line Breakdown</h4>
                      <div className="space-y-3 min-w-[500px] md:min-w-0">
                        {example.lineBreakdown.map((line, idx) => (
                          <div key={idx} className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm p-3 bg-[var(--color-bg-secondary)] rounded-lg">
                            <div className="flex items-center gap-3 sm:w-1/3 flex-shrink-0">
                              <span className="text-xs font-mono font-bold text-[var(--color-accent-primary)] bg-[var(--color-accent-primary)]/10 px-2 py-0.5 rounded">L{line.lineNumber}</span>
                              <code className="text-xs font-mono text-[var(--color-text-primary)] truncate" title={line.code}>{line.code.trim()}</code>
                            </div>
                            <span className="text-sm text-[var(--color-text-secondary)] sm:w-2/3">{line.explanation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <EmptyState title="Code Examples Coming Soon" message="Code examples with line-by-line breakdowns will be added for this topic." icon="code" />
            )}
          </div>
        )}

        {/* ═══ Practice Tab ═══ */}
        {activeTab === 'practice' && (
          <div className="space-y-12 animate-fade-in">
            {/* Theory Questions */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[var(--color-accent-primary)] rounded-full" />
                Theory Questions
              </h2>
              {topic.theoryQuestions.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {topic.theoryQuestions.map((q) => (
                    <TheoryQuestionCard key={q.id} q={q} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Questions Coming Soon" message="Theory questions will be added here." icon="book" />
              )}
            </section>

            {/* Programming Problems */}
            <section>
              <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-[var(--color-success)] rounded-full" />
                Programming Problems
              </h2>
              {topic.programmingProblems.length > 0 ? (
                <div className="space-y-8">
                  {topic.programmingProblems.map((p) => (
                    <ProblemCard key={p.id} p={p} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Problems Coming Soon" message="Coding problems will be added here." icon="code" />
              )}
            </section>
          </div>
        )}

        {/* ═══ Common Mistakes Tab ═══ */}
        {activeTab === 'mistakes' && (
          <div className="space-y-6 animate-fade-in">
            {topic.subtopics.some((s) => s.commonMistakes.length > 0) ? (
              topic.subtopics.flatMap((s) => s.commonMistakes).map((mistake) => (
                <div key={mistake.id} className="glass-card p-4 md:p-8 border-l-4 border-red-500 overflow-x-auto">
                  <h3 className="text-xl font-bold text-[var(--color-text-primary)] mb-3 flex items-center gap-3">
                    <span className="text-red-500 text-2xl">⚠️</span> {mistake.title}
                  </h3>
                  <p className="text-base text-[var(--color-text-secondary)] mb-6">{mistake.explanation}</p>

                  <div className="grid lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-red-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-400"></span>
                        WRONG
                      </h4>
                      <div className="border border-red-500/30 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-red-500/5 pointer-events-none z-10" />
                        <CodeBlock code={mistake.wrongCode} showLineNumbers={false} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-green-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-400"></span>
                        CORRECT
                      </h4>
                      <div className="border border-green-500/30 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 bg-green-500/5 pointer-events-none z-10" />
                        <CodeBlock code={mistake.correctCode} showLineNumbers={false} />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex gap-3 items-start">
                    <span className="text-red-500 mt-0.5">💥</span>
                    <div>
                      <span className="text-sm font-bold text-red-500 block mb-1">Consequence</span>
                      <p className="text-sm text-red-400/90">{mistake.consequence}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <EmptyState title="Common Mistakes Coming Soon" message="Wrong vs correct code comparisons will be added here." icon="code" />
            )}
          </div>
        )}

        {/* ═══ Revision Tab ═══ */}
        {activeTab === 'revision' && (
          <div className="space-y-12 animate-fade-in">
            {/* Flashcards */}
            <section>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Flashcards</h2>
              {topic.subtopics.some((s) => s.revisionCards.length > 0) ? (
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {topic.subtopics.flatMap((s) => s.revisionCards).map((card) => (
                    <RevisionFlipCard key={card.id} front={card.front} back={card.back} />
                  ))}
                </div>
              ) : (
                <EmptyState title="Flashcards Coming Soon" message="Quick-review flashcards will be added here." icon="book" />
              )}
            </section>

            {/* Checkpoints */}
            <section>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Self-Assessment Checkpoints</h2>
              {topic.subtopics.some((s) => s.checkpoints.length > 0) ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {topic.subtopics.flatMap((s) => s.checkpoints).map((cp) => (
                    <div key={cp.id} className="glass-card p-4 md:p-6 border-t-2 border-[var(--color-success)]">
                      <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2">{cp.title}</h4>
                      <p className="text-sm text-[var(--color-text-tertiary)] mb-4">{cp.description}</p>
                      <ul className="space-y-3">
                        {cp.criteria.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-[var(--color-text-secondary)]">
                            <input type="checkbox" className="mt-1 w-4 h-4 rounded border-[var(--color-border-secondary)] bg-transparent text-[var(--color-success)] focus:ring-[var(--color-success)] focus:ring-offset-0" />
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-text-muted)] text-sm">No checkpoints available.</p>
              )}
            </section>

            {/* Interview Callouts */}
            <section>
              <h2 className="text-xl font-bold text-[var(--color-text-primary)] mb-6">Interview Insights</h2>
              {topic.subtopics.some((s) => s.interviewCallouts.length > 0) ? (
                <div className="space-y-4">
                  {topic.subtopics.flatMap((s) => s.interviewCallouts).map((callout) => (
                    <div key={callout.id} className="glass-card p-4 md:p-6 border-l-4 border-[var(--color-warning)] bg-[var(--color-warning)]/5">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">💡</span>
                        <h4 className="text-lg font-bold text-[var(--color-text-primary)]">{callout.title}</h4>
                        <Badge text={callout.frequency} variant={callout.frequency === 'common' ? 'warning' : 'default'} />
                      </div>
                      <p className="text-base text-[var(--color-text-secondary)] leading-relaxed pl-9">{callout.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--color-text-muted)] text-sm">No interview insights available.</p>
              )}
            </section>
          </div>
        )}
      </Tabs>

      {/* Prev / Next Navigation */}
      <div className="flex items-center justify-between pt-8 mt-8 border-t border-[var(--color-border-primary)]">
        {prevTopic ? (
          <Link to={`/unit/${prevTopic.unit}/${prevTopic.topic.slug}`} className="flex flex-col gap-1 group">
            <span className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest group-hover:text-[var(--color-accent-primary)] transition-colors">Previous</span>
            <span className="text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">← {prevTopic.topic.title}</span>
          </Link>
        ) : <div />}
        
        {nextTopic ? (
          <Link to={`/unit/${nextTopic.unit}/${nextTopic.topic.slug}`} className="flex flex-col gap-1 text-right group">
            <span className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest group-hover:text-[var(--color-accent-primary)] transition-colors">Next</span>
            <span className="text-base text-[var(--color-text-secondary)] group-hover:text-[var(--color-text-primary)] transition-colors">{nextTopic.topic.title} →</span>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}

// ─── Inline Components ───

function RevisionFlipCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="glass-card p-6 cursor-pointer transition-transform duration-500 min-h-[160px] flex items-center justify-center text-center group perspective-1000 relative"
      style={{ transformStyle: 'preserve-3d', transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)' }}
    >
      {flipped ? (
        <div className="animate-fade-in w-full" style={{ transform: 'rotateY(180deg)' }}>
          <p className="text-xs font-bold text-[var(--color-accent-primary)] uppercase tracking-widest mb-3">Answer</p>
          <p className="text-base text-[var(--color-text-primary)] leading-relaxed">{back}</p>
        </div>
      ) : (
        <div className="w-full">
          <p className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-3 group-hover:text-[var(--color-accent-primary)] transition-colors">Question</p>
          <p className="text-base font-medium text-[var(--color-text-primary)]">{front}</p>
        </div>
      )}
    </div>
  );
}

function TheoryQuestionCard({ q }: { q: TheoryQuestion }) {
  const [selected, setSelected] = useState<string | boolean | null>(null);
  const [revealed, setRevealed] = useState(false);
  
  const isMcq = q.type === 'mcq';
  const isTF = q.type === 'true-false';
  const isOpen = q.type === 'predict-output' || q.type === 'spot-bug';

  return (
    <div className="glass-card p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <Badge text={q.type} variant="accent" />
        <DifficultyBadge level={q.difficulty} />
      </div>
      <p className="text-base text-[var(--color-text-primary)] mb-4">{q.question}</p>
      
      {q.code && (
        <div className="mb-4">
          <CodeBlock code={q.code} showLineNumbers={false} />
        </div>
      )}

      <div className="mt-auto space-y-3">
        {isMcq && q.options?.map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === q.correctAnswer;
          const showColors = selected !== null;
          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              disabled={selected !== null}
              className={cn(
                "w-full text-left p-3 rounded-lg text-sm border transition-all duration-200",
                !showColors ? "bg-[var(--color-bg-secondary)] border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]" :
                isCorrect ? "bg-green-500/20 border-green-500 text-green-300" :
                isSelected ? "bg-red-500/20 border-red-500 text-red-300" :
                "bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-tertiary)] opacity-50"
              )}
            >
              {opt}
            </button>
          );
        })}

        {isTF && [true, false].map((opt) => {
          const isSelected = selected === opt;
          const isCorrect = opt === q.correctAnswer;
          const showColors = selected !== null;
          return (
            <button
              key={opt.toString()}
              onClick={() => setSelected(opt)}
              disabled={selected !== null}
              className={cn(
                "w-full text-left p-3 rounded-lg text-sm border transition-all duration-200",
                !showColors ? "bg-[var(--color-bg-secondary)] border-[var(--color-border-primary)] hover:border-[var(--color-accent-primary)] hover:bg-[var(--color-bg-hover)] text-[var(--color-text-secondary)]" :
                isCorrect ? "bg-green-500/20 border-green-500 text-green-300" :
                isSelected ? "bg-red-500/20 border-red-500 text-red-300" :
                "bg-[var(--color-bg-secondary)] border-transparent text-[var(--color-text-tertiary)] opacity-50"
              )}
            >
              {opt ? "True" : "False"}
            </button>
          );
        })}

        {isOpen && (
          <button
            onClick={() => setRevealed(true)}
            disabled={revealed}
            className={cn(
              "w-full py-2.5 rounded-lg text-sm font-medium transition-colors",
              !revealed 
                ? "bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border-primary)]" 
                : "bg-transparent border border-[var(--color-success)] text-[var(--color-success)] opacity-50 cursor-default"
            )}
          >
            {revealed ? 'Answer Revealed' : 'Reveal Answer'}
          </button>
        )}
      </div>

      {(selected !== null || revealed) && (
        <div className="mt-4 p-4 bg-[var(--color-bg-secondary)] border border-[var(--color-border-primary)] rounded-lg animate-fade-in">
          {isOpen && <p className="text-sm font-bold text-[var(--color-success)] mb-2">{q.correctAnswer?.toString()}</p>}
          <p className="text-sm text-[var(--color-text-secondary)]">{q.explanation}</p>
        </div>
      )}
    </div>
  );
}

function ProblemCard({ p }: { p: ProgrammingProblem }) {
  const [showSolution, setShowSolution] = useState(false);
  const [hintsRevealed, setHintsRevealed] = useState(0);

  return (
    <div className="glass-card p-4 md:p-8 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <DifficultyBadge level={p.difficulty} />
            {p.leetcodeRef && <Badge text="LeetCode" variant="warning" />}
          </div>
          <h3 className="text-2xl font-bold text-[var(--color-text-primary)]">{p.title}</h3>
        </div>
      </div>

      <div className="prose prose-invert max-w-none">
        <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">{p.problemStatement}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {p.sampleInput && (
          <div>
            <h4 className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-2">Sample Input</h4>
            <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-primary)] font-mono text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {p.sampleInput}
            </div>
          </div>
        )}
        {p.sampleOutput && (
          <div>
            <h4 className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest mb-2">Sample Output</h4>
            <div className="bg-[var(--color-bg-secondary)] p-3 rounded-lg border border-[var(--color-border-primary)] font-mono text-sm text-[var(--color-text-secondary)] whitespace-pre-wrap">
              {p.sampleOutput}
            </div>
          </div>
        )}
      </div>

      {p.hints && p.hints.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-[var(--color-text-tertiary)] uppercase tracking-widest">Hints</h4>
          {p.hints.slice(0, hintsRevealed).map((hint, i) => (
            <div key={i} className="flex gap-3 text-sm p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-200/90 animate-fade-in">
              <span>💡</span>
              <span>{hint}</span>
            </div>
          ))}
          {hintsRevealed < p.hints.length && (
            <button 
              onClick={() => setHintsRevealed(h => h + 1)}
              className="text-sm font-medium text-[var(--color-accent-primary)] hover:text-[var(--color-accent-hover)] transition-colors"
            >
              + Reveal Hint {hintsRevealed + 1}
            </button>
          )}
        </div>
      )}

      <div className="pt-4 border-t border-[var(--color-border-primary)]">
        {!showSolution ? (
          <button
            onClick={() => setShowSolution(true)}
            className="px-6 py-2.5 bg-[var(--color-bg-secondary)] hover:bg-[var(--color-bg-hover)] border border-[var(--color-border-primary)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] transition-all"
          >
            Show Solution
          </button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-bold text-[var(--color-success)]">Solution</h4>
              <button 
                onClick={() => setShowSolution(false)}
                className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
              >
                Hide
              </button>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-[var(--color-border-secondary)]">
              <CodeBlock code={p.solution} />
            </div>

            <div className="p-4 bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border-primary)]">
              <h5 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Explanation</h5>
              <div className="space-y-4">
                {p.solutionExplanation.split('\n\n').map((para, i) => (
                  <p key={i} className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{para}</p>
                ))}
              </div>
            </div>

            {p.dryRun && p.dryRun.length > 0 && (
              <div>
                <h5 className="text-sm font-bold text-[var(--color-text-primary)] mb-4">Dry Run Table</h5>
                <div className="overflow-x-auto pb-2">
                  <table className="w-full text-sm text-left border-collapse min-w-[600px] md:min-w-0">
                    <thead>
                      <tr className="border-b border-[var(--color-border-secondary)] bg-[var(--color-bg-secondary)]">
                        <th className="p-3 font-bold text-[var(--color-text-tertiary)] uppercase text-xs w-16">Step</th>
                        <th className="p-3 font-bold text-[var(--color-text-tertiary)] uppercase text-xs w-16">Line</th>
                        <th className="p-3 font-bold text-[var(--color-text-tertiary)] uppercase text-xs min-w-[120px]">Variables</th>
                        <th className="p-3 font-bold text-[var(--color-text-tertiary)] uppercase text-xs min-w-[100px]">Output</th>
                        <th className="p-3 font-bold text-[var(--color-text-tertiary)] uppercase text-xs">Explanation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {p.dryRun.map((row, i) => (
                        <tr key={i} className={`border-b border-[var(--color-border-primary)] last:border-0 hover:bg-[var(--color-bg-hover)]/50 transition-colors ${i % 2 === 0 ? 'bg-[var(--color-bg-secondary)]/50' : 'bg-transparent'}`}>
                          <td className="p-3 text-[var(--color-text-secondary)]">{row.step}</td>
                          <td className="p-3"><span className="px-2 py-0.5 bg-[var(--color-bg-secondary)] rounded font-mono text-xs border border-[var(--color-border-primary)]">L{row.line}</span></td>
                          <td className="p-3 font-mono text-xs text-[var(--color-accent-primary)] whitespace-pre-wrap">
                            {Object.entries(row.variables).map(([k, v]) => `${k}=${v}`).join(', ')}
                          </td>
                          <td className="p-3 font-mono text-xs text-[var(--color-success)] whitespace-pre-wrap">{row.output}</td>
                          <td className="p-3 text-[var(--color-text-secondary)]">{row.explanation}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
