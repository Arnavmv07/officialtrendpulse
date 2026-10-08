import { fetchRedditTrends } from '../crawlers/redditCrawler.js';
import { fetchGoogleTrends } from '../crawlers/googleTrendsCrawler.js';
import { fetchYouTubeTrends } from '../crawlers/youtubeCrawler.js';
import { fetchTwitterTrends } from '../crawlers/twitterCrawler.js';
import { fetchInstagramTrends } from '../crawlers/instagramCrawler.js';

let cachedTrends = [];
let lastCrawledAt = null;
let isCrawling = false;

export async function aggregateTrends(forceRefresh = false) {
  // Use cached data if less than 10 minutes old and not forced
  const now = Date.now();
  if (!forceRefresh && cachedTrends.length > 0 && lastCrawledAt && (now - lastCrawledAt < 10 * 60 * 1000)) {
    return cachedTrends;
  }

  if (isCrawling) {
    return cachedTrends;
  }

  try {
    isCrawling = true;
    console.log('[Crawler] Initiating multi-platform trend crawler across YouTube, X, Instagram, Reddit...');

    const [redditData, googleData, youtubeData, twitterData, instagramData] = await Promise.allSettled([
      fetchRedditTrends('all'),
      fetchGoogleTrends(),
      fetchYouTubeTrends('all'),
      fetchTwitterTrends('all'),
      fetchInstagramTrends('all')
    ]);

    const redditItems = redditData.status === 'fulfilled' ? redditData.value : [];
    const googleItems = googleData.status === 'fulfilled' ? googleData.value : [];
    const youtubeItems = youtubeData.status === 'fulfilled' ? youtubeData.value : [];
    const twitterItems = twitterData.status === 'fulfilled' ? twitterData.value : [];
    const instagramItems = instagramData.status === 'fulfilled' ? instagramData.value : [];

    // Combine all sources
    const combined = [
      ...youtubeItems,
      ...googleItems,
      ...twitterItems,
      ...instagramItems,
      ...redditItems
    ];

    // Sort by velocity score descending
    combined.sort((a, b) => {
      const vA = a.metrics?.velocityScore || 50;
      const vB = b.metrics?.velocityScore || 50;
      return vB - vA;
    });

    cachedTrends = combined;
    lastCrawledAt = now;
    console.log(`[Crawler] Completed. Aggregated ${combined.length} trending items.`);
    return combined;
  } catch (err) {
    console.error('[Crawler] Error aggregating trends:', err);
    return cachedTrends;
  } finally {
    isCrawling = false;
  }
}

export function filterTrends(trends, { genre = 'all', platform = 'all', status = 'all', searchQuery = '' }) {
  return trends.filter(item => {
    if (genre !== 'all' && item.genre !== genre) return false;
    if (platform !== 'all' && item.platform !== platform) return false;
    if (status !== 'all' && item.status !== status) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title?.toLowerCase().includes(q);
      const matchSummary = item.summary?.toLowerCase().includes(q);
      const matchCommunity = item.community?.toLowerCase().includes(q);
      if (!matchTitle && !matchSummary && !matchCommunity) return false;
    }
    return true;
  });
}

export function getCrawlerStatus() {
  return {
    lastCrawledAt: lastCrawledAt ? new Date(lastCrawledAt).toISOString() : null,
    totalItems: cachedTrends.length,
    isCrawling,
    platformBreakdown: {
      youtube: cachedTrends.filter(t => t.platform === 'youtube').length,
      twitter: cachedTrends.filter(t => t.platform === 'twitter').length,
      instagram: cachedTrends.filter(t => t.platform === 'instagram').length,
      reddit: cachedTrends.filter(t => t.platform === 'reddit').length
    }
  };
}
