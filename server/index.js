import express from 'express';
import cors from 'cors';
import { aggregateTrends, filterTrends, getCrawlerStatus } from './services/trendAggregator.js';
import { generateCreatorStrategy } from './services/ideaGenerator.js';
import { getSavedIdeas, saveIdea, updateIdeaStatus, deleteSavedIdea } from './services/storageService.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Initial warm-up crawl on startup
aggregateTrends(false).catch(err => console.error('Startup crawl error:', err));

// 1. Get Trend Feed
app.get('/api/trends', async (req, res) => {
  try {
    const { genre = 'all', platform = 'all', status = 'all', search = '' } = req.query;
    const allTrends = await aggregateTrends(false);
    const filtered = filterTrends(allTrends, {
      genre: String(genre),
      platform: String(platform),
      status: String(status),
      searchQuery: String(search)
    });
    res.json({
      success: true,
      count: filtered.length,
      data: filtered,
      crawler: getCrawlerStatus()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Crawler Status
app.get('/api/trends/status', (req, res) => {
  res.json({ success: true, ...getCrawlerStatus() });
});

// 3. Force Refresh Crawler
app.post('/api/trends/refresh', async (req, res) => {
  try {
    console.log('[API] Refresh requested by client...');
    const refreshed = await aggregateTrends(true);
    res.json({
      success: true,
      message: 'Crawlers refreshed successfully across YouTube, X, Instagram, and Reddit',
      count: refreshed.length,
      crawler: getCrawlerStatus()
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 4. Generate AI Creator Strategy for a Trend
app.post('/api/ideas/generate', async (req, res) => {
  try {
    const { trend, customPreferences } = req.body;
    if (!trend) {
      return res.status(400).json({ success: false, error: 'Trend data is required' });
    }
    const strategy = generateCreatorStrategy(trend, customPreferences || {});
    res.json({ success: true, strategy });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// 5. Creator Studio: Saved Ideas & Backlog
app.get('/api/saved-ideas', (req, res) => {
  res.json({ success: true, ideas: getSavedIdeas() });
});

app.post('/api/saved-ideas', (req, res) => {
  try {
    const saved = saveIdea(req.body);
    res.json({ success: true, idea: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/saved-ideas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = updateIdeaStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Idea not found' });
    }
    res.json({ success: true, idea: updated });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete('/api/saved-ideas/:id', (req, res) => {
  try {
    const { id } = req.params;
    const deleted = deleteSavedIdea(id);
    res.json({ success: deleted, message: deleted ? 'Deleted successfully' : 'Not found' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 TrendFeed Aggregator Server running on http://localhost:${PORT}`);
});
