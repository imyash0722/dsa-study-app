import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { searchContent, type SearchResult } from '../utils/search';
import { Badge } from '../components/shared/Badge';
import { EmptyState } from '../components/shared/EmptyState';

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    setResults(searchContent(query));
  }, [query]);

  return (
    <div className="space-y-6">
      <div className="glass-card p-6">
        <h1 className="text-2xl font-bold text-[var(--color-text-primary)] mb-2">Search Results</h1>
        <p className="text-sm text-[var(--color-text-secondary)]">
          {results.length} results for "<span className="text-[var(--color-accent-primary)]">{query}</span>"
        </p>
      </div>

      {results.length > 0 ? (
        <div className="space-y-2">
          {results.map((result) => (
            <Link
              key={result.id}
              to={result.path}
              className="glass-card p-4 flex items-start gap-3 hover:bg-[var(--color-bg-hover)] transition-all block"
            >
              <Badge text={result.type} variant={result.type === 'unit' ? 'accent' : 'default'} className="mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">{result.title}</p>
                <p className="text-xs text-[var(--color-text-tertiary)] mt-0.5">{result.description}</p>
                {result.unitTitle && <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{result.unitTitle}</p>}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState title="No Results" message={`No matches found for "${query}".`} icon="search" />
      )}
    </div>
  );
}
