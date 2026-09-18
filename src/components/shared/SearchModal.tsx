import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchContent, type SearchResult } from '../../utils/search';
import { Badge } from './Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setResults([]);
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        navigate(results[selectedIndex].path);
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, navigate, onClose]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setQuery(q);
    setResults(searchContent(q));
    setSelectedIndex(0);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-[var(--color-bg-primary)]/80 backdrop-blur-sm">
      {/* Backdrop click layer */}
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[var(--color-bg-card)] rounded-xl border border-[var(--color-border-primary)] shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[80vh]">
        {/* Search Input Header */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)]">
          <svg className="w-5 h-5 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Search topics, questions, code examples..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--color-text-primary)] placeholder-[var(--color-text-muted)]"
          />
          <button onClick={onClose} className="text-xs text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] px-2 py-1 rounded bg-[var(--color-bg-hover)]">
            ESC
          </button>
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1">
          {query.trim().length === 0 ? (
            <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
              Start typing to search the entire curriculum.
            </div>
          ) : results.length > 0 ? (
            <div className="p-2 space-y-1">
              {results.map((result, i) => (
                <button
                  key={result.id}
                  onClick={() => {
                    navigate(result.path);
                    onClose();
                  }}
                  onMouseEnter={() => setSelectedIndex(i)}
                  className={`w-full text-left flex items-start gap-3 p-3 rounded-lg transition-colors ${
                    i === selectedIndex ? 'bg-[var(--color-accent-glow)] border border-[var(--color-accent-primary)]/30' : 'hover:bg-[var(--color-bg-hover)] border border-transparent'
                  }`}
                >
                  <div className="mt-0.5">
                    <Badge text={result.type} variant={result.type === 'unit' ? 'accent' : 'default'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${i === selectedIndex ? 'text-[var(--color-accent-primary)]' : 'text-[var(--color-text-primary)]'}`}>
                      {result.title}
                    </p>
                    <p className="text-xs text-[var(--color-text-tertiary)] truncate mt-0.5">
                      {result.description}
                    </p>
                    {result.unitTitle && (
                      <p className="text-[10px] text-[var(--color-text-muted)] mt-1">{result.unitTitle}</p>
                    )}
                  </div>
                  {i === selectedIndex && (
                    <div className="flex-shrink-0 text-[10px] font-semibold text-[var(--color-accent-primary)] mt-1">
                      ENTER ↵
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-[var(--color-text-muted)] text-sm">
              No results found for "<span className="text-[var(--color-text-primary)]">{query}</span>"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
