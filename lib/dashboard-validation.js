export const IDEA_STATES = ['Idea', 'Scripting', 'Filming', 'Published'];
export function validateIdea(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid idea');
  const clean = {};
  for (const [key, max] of Object.entries({ topic: 250, hook: 2000, notes: 10000 })) {
    const v = input[key] ?? '';
    if (typeof v !== 'string' || v.length > max || /[\x00-\x08\x0b\x0c\x0e-\x1f]/.test(v)) throw new Error('Invalid ' + key);
    clean[key] = v.trim();
  }
  if (!clean.topic) throw new Error('Topic is required');
  clean.status = input.status ?? 'Idea';
  if (!IDEA_STATES.includes(clean.status)) throw new Error('Invalid status');
  clean.source_url = null;
  if (input.source_url) {
    if (typeof input.source_url !== 'string' || input.source_url.length > 2000) throw new Error('Invalid source URL');
    let u; try { u = new URL(input.source_url); } catch { throw new Error('Invalid source URL'); }
    if (u.protocol !== 'https:' || u.username || u.password) throw new Error('Invalid source URL');
    clean.source_url = u.href;
  }
  // Ignore injected IDs, owner IDs and timestamps. Never render HTML from text.
  return clean;
}
