import { curriculumMap } from '../data/curriculum-map';
export interface SearchResult {
  type: 'unit' | 'topic';
  id: string;
  title: string;
  description: string;
  path: string;
  unitTitle?: string;
  matchField: string;
}

/** Search across all curriculum content for matching text */
export function searchContent(query: string): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  for (const unit of curriculumMap) {
    // Search unit titles/descriptions
    if (matchesQuery(unit.title, normalizedQuery) || matchesQuery(unit.description, normalizedQuery)) {
      results.push({
        type: 'unit',
        id: unit.id,
        title: unit.title,
        description: unit.description,
        path: `/unit/${unit.slug}`,
        matchField: matchesQuery(unit.title, normalizedQuery) ? 'title' : 'description',
      });
    }

    // Search topics
    for (const topic of unit.topics) {
      if (matchesQuery(topic.title, normalizedQuery) || matchesQuery(topic.description, normalizedQuery)) {
        results.push({
          type: 'topic',
          id: topic.id,
          title: topic.title,
          description: topic.description,
          path: `/unit/${unit.slug}/${topic.slug}`,
          unitTitle: unit.title,
          matchField: matchesQuery(topic.title, normalizedQuery) ? 'title' : 'description',
        });
      }
    }
  }

  // Sort: title matches first, then description matches
  results.sort((a, b) => {
    if (a.matchField === 'title' && b.matchField !== 'title') return -1;
    if (a.matchField !== 'title' && b.matchField === 'title') return 1;
    return 0;
  });

  return results.slice(0, 20);
}

function matchesQuery(text: string, query: string): boolean {
  return text.toLowerCase().includes(query);
}
