import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: ['ht:approx_traffic', 'ht:news_item', 'ht:picture']
  }
});

export async function fetchGoogleTrends() {
  try {
    const feed = await parser.parseURL('https://trends.google.com/trending/rss?geo=US');
    return (feed.items || []).slice(0, 8).map((item, idx) => {
      const traffic = item['ht:approx_traffic'] || '100K+';
      const newsTitle = item.title;
      const snippet = item.contentSnippet || item.content || '';
      const picture = item['ht:picture'] || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&auto=format&fit=crop&q=80';

      return {
        id: `gtrend-${idx}-${Date.now().toString(36)}`,
        platform: 'youtube', // mapped to YouTube / Search demand
        genre: inferGenre(newsTitle + ' ' + snippet),
        title: `Search Surge: "${newsTitle}" (${traffic} searches in 24h)`,
        sourceUrl: item.link || 'https://trends.google.com',
        community: 'Google & YouTube Search Radar',
        author: 'Trending Search Engine',
        metrics: {
          searchVolume: traffic,
          velocityScore: 94,
          spikeMultiplier: '4.8x normal volume',
          engagementRate: '9.8%'
        },
        status: 'Peak Viral',
        summary: snippet || `Rapidly surging topic with over ${traffic} searches today across YouTube and Google. High demand for explainer & reaction content right now.`,
        publishedAt: item.pubDate || new Date().toISOString(),
        thumbnail: picture
      };
    });
  } catch (err) {
    console.warn('Google Trends crawler error:', err.message);
    return [];
  }
}

function inferGenre(text) {
  const lower = text.toLowerCase();
  if (lower.match(/game|gta|nintendo|playstation|xbox|steam|esports/)) return 'gaming';
  if (lower.match(/stock|crypto|bitcoin|fed|economy|money|inflation|market/)) return 'finance';
  if (lower.match(/movie|film|trailer|celebrity|oscar|grammy|concert|actor|album/)) return 'entertainment';
  if (lower.match(/health|workout|diet|gym|doctor|fda|weight|fitness/)) return 'fitness';
  if (lower.match(/habit|routine|focus|morning|lifestyle/)) return 'lifestyle';
  return 'tech';
}
