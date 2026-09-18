/** Convert a title string to a URL-safe slug */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/** Extract unit slug and topic slug from a combined path */
export function parseTopicPath(path: string): { unitSlug: string; topicSlug: string } | null {
  const match = path.match(/^\/unit\/([^/]+)\/([^/]+)/);
  if (!match) return null;
  return { unitSlug: match[1], topicSlug: match[2] };
}
