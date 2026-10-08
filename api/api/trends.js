import Parser from 'rss-parser';
import { createHash } from 'node:crypto';

const SOURCE = 'https://trends.google.com/trending/rss?geo=IN';
const parser = new Parser({
  timeout: 10000,
  customFields: { item: ['ht:approx_traffic', 'ht:picture', ['ht:news_item', 'newsItems', { keepArray: true }]] }
});
const text = value => typeof value === 'string' ? value : '';
const safeUrl = value => {
  try { const u = new URL(value); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; }
  catch { return ''; }
};
const first = v => Array.isArray(v) ? v[0] : v;
export async function parseTrends(xml, fetchedAt = new Date().toISOString()) {
  const feed = await parser.parseString(xml);
  const items = (feed.items || []).slice(0, 20).map(item => {
    const title = text(item.title).slice(0, 250);
    const timestamp = Date.parse(item.isoDate || item.pubDate || '');
    const articles = (item.newsItems || []).map(article => ({
      title: text(first(article['ht:news_item_title'])).slice(0, 400),
      url: safeUrl(first(article['ht:news_item_url'])),
      publisher: text(first(article['ht:news_item_source'])).slice(0, 100),
    })).filter(article => article.title && article.url).slice(0, 3);
    return {
      id: createHash('sha256').update(title + String(timestamp)).digest('hex').slice(0, 20),
      title, source: 'Google Trends', region: 'India', sourceUrl: SOURCE,
      publishedAt: Number.isFinite(timestamp) ? new Date(timestamp).toISOString() : null,
      fetchedAt, approximateTraffic: text(item['ht:approx_traffic']) || null,
      thumbnail: safeUrl(item['ht:picture']), articles,
    };
  }).filter(item => item.title);
  if (!items.length) throw new Error('Source returned no items');
  return { success: true, source: 'Google Trends India RSS', sourceUrl: SOURCE, fetchedAt, items };
}
export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, must-revalidate');
  try {
    const upstream = await fetch(SOURCE, { signal: AbortSignal.timeout(10000), headers: { Accept: 'application/rss+xml' } });
    if (!upstream.ok) throw new Error('Feed unavailable');
    const xml = await upstream.text();
    if (xml.length > 1000000) throw new Error('Feed too large');
    const data = await parseTrends(xml);
    return res.status(200).json(data);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(502).json({ success: false, error: 'Google Trends is unavailable. No sample data has been substituted.' });
  }
}
