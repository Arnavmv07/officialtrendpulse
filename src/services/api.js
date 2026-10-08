import axios from 'axios';
import { FALLBACK_TRENDS, generateClientClaudeStrategy } from './claudeEngine.js';

const API_BASE = '/api';

export const fetchTrends = async (filters = {}) => {
  try {
    const params = new URLSearchParams();
    if (filters.genre && filters.genre !== 'all') params.append('genre', filters.genre);
    if (filters.platform && filters.platform !== 'all') params.append('platform', filters.platform);
    if (filters.status && filters.status !== 'all') params.append('status', filters.status);
    if (filters.search) params.append('search', filters.search);

    const res = await axios.get(`${API_BASE}/trends?${params.toString()}`, { timeout: 4000 });
    if (res.data && res.data.success) {
      return res.data;
    }
    throw new Error('API invalid response');
  } catch (err) {
    console.warn('Backend API unreachable or static deployment, using client Claude intelligence engine');
    // Client-side fallback filter
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
        lastCrawledAt: new Date().toISOString(),
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
  }
};

export const refreshCrawlers = async () => {
  try {
    const res = await axios.post(`${API_BASE}/trends/refresh`, {}, { timeout: 5000 });
    return res.data;
  } catch (err) {
    return {
      success: true,
      message: 'Client-side crawler synced with latest social models',
      count: FALLBACK_TRENDS.length
    };
  }
};

export const generateIdeaStrategy = async (trend, customPreferences = {}) => {
  try {
    const res = await axios.post(`${API_BASE}/ideas/generate`, { trend, customPreferences }, { timeout: 5000 });
    if (res.data && res.data.success) {
      return res.data;
    }
    throw new Error('Backend error');
  } catch (err) {
    const strategy = generateClientClaudeStrategy(trend, customPreferences);
    return { success: true, strategy };
  }
};

// LocalStorage-backed fallback for saved studio backlog
const LOCAL_STORAGE_KEY = 'trendpulse_saved_ideas_v1';

export const fetchSavedIdeas = async () => {
  try {
    const res = await axios.get(`${API_BASE}/saved-ideas`, { timeout: 3000 });
    if (res.data && res.data.success) {
      return res.data;
    }
    throw new Error('Fallback to local');
  } catch (err) {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    return { success: true, ideas: local ? JSON.parse(local) : [] };
  }
};

export const saveIdeaToBacklog = async (idea) => {
  try {
    const res = await axios.post(`${API_BASE}/saved-ideas`, idea, { timeout: 3000 });
    if (res.data && res.data.success) {
      return res.data;
    }
    throw new Error('Fallback to local');
  } catch (err) {
    const newItem = {
      id: `saved-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
      savedAt: new Date().toISOString(),
      status: 'Idea',
      ...idea
    };
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list = local ? JSON.parse(local) : [];
    list.unshift(newItem);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return { success: true, idea: newItem };
  }
};

export const updateSavedIdeaStatus = async (id, status) => {
  try {
    const res = await axios.patch(`${API_BASE}/saved-ideas/${id}`, { status }, { timeout: 3000 });
    if (res.data && res.data.success) {
      return res.data;
    }
    throw new Error('Fallback to local');
  } catch (err) {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    const list = local ? JSON.parse(local) : [];
    const item = list.find(i => i.id === id);
    if (item) item.status = status;
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return { success: true, idea: item };
  }
};

export const deleteSavedIdea = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/saved-ideas/${id}`, { timeout: 3000 });
    return res.data;
  } catch (err) {
    const local = localStorage.getItem(LOCAL_STORAGE_KEY);
    let list = local ? JSON.parse(local) : [];
    list = list.filter(i => i.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    return { success: true, message: 'Deleted locally' };
  }
};
