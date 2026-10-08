import { FALLBACK_TRENDS, generateClientClaudeStrategy } from './claudeEngine.js';

// Sample-only APIs. The real-source feed uses /api/trends separately.
export const fetchTrends = async (filters = {}) => {
    let filtered = [...FALLBACK_TRENDS];
    if (filters.genre && filters.genre !== 'all') {
      filtered = filtered.filter(t => t.genre === filters.genre);
    }
    if (filters.platform && filters.platform !== 'all') {
      filtered = filtered.filter(t => t.platform === filters.platform);
    }
    if (filters.status && filters.status !== 'all') {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(t => 
        t.title.toLowerCase().includes(q) || 
        (t.summary && t.summary.toLowerCase().includes(q))
      );
    }
    return {
      success: true,
      count: filtered.length,
      data: filtered,
      crawler: {
        lastCrawledAt: null,
        totalItems: filtered.length,
        isCrawling: false,
        platformBreakdown: {
          youtube: filtered.filter(t => t.platform === 'youtube').length,
          twitter: filtered.filter(t => t.platform === 'twitter').length,
          instagram: filtered.filter(t => t.platform === 'instagram').length,
          reddit: filtered.filter(t => t.platform === 'reddit').length
        }
      }
    };
};

export const refreshCrawlers = async () => ({
  success: true, message: 'Sample cards reloaded', count: FALLBACK_TRENDS.length
});
export const generateIdeaStrategy = async (trend, preferences = {}) => ({
  success: true, strategy: generateClientClaudeStrategy(trend, preferences)
});

const LOCAL_STORAGE_KEY = 'trendpulse_saved_ideas_v1';
const readIdeas = () => {
  const value = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!value) return [];
  const list = JSON.parse(value);
  if (!Array.isArray(list)) throw new Error('Saved ideas are not a valid list. Data has not been overwritten.');
  return list;
};
const writeIdeas = list => localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
export const fetchSavedIdeas = async () => ({ success: true, ideas: readIdeas() });
export const saveIdeaToBacklog = async idea => {
  const newItem = { ...idea, id: `saved-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`, savedAt: new Date().toISOString(), status: 'Idea' };
  const list = readIdeas();
  list.unshift(newItem); writeIdeas(list);
  return { success: true, idea: newItem };
};
export const updateSavedIdeaStatus = async (id, status) => {
  const list = readIdeas();
  const item = list.find(i => i.id === id);
  if (!item) throw new Error('Saved idea not found');
  item.status = status; writeIdeas(list);
  return { success: true, idea: item };
};
export const deleteSavedIdea = async id => {
  writeIdeas(readIdeas().filter(i => i.id !== id));
  return { success: true, message: 'Deleted locally' };
};
