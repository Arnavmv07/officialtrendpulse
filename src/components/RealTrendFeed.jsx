import React, { useState, useEffect } from 'react';
import { ExternalLink, RefreshCw, Search } from 'lucide-react';

function SourceImage({ item }) {
  const [failed, setFailed] = useState(false);
  if (!item.thumbnail || failed) return <div className="rounded-xl bg-surface p-5 text-xs text-ink-3">Source image unavailable</div>;
  return <figure><img src={item.thumbnail} alt={'Image supplied by Google Trends for ' + item.title} className="w-full h-40 object-contain rounded-xl bg-surface" loading="lazy" referrerPolicy="no-referrer" onError={() => setFailed(true)} /><figcaption className="text-[10px] text-ink-3 mt-1">Image supplied by Google Trends for this topic. Not a TrendPulse illustration. External image may be unavailable.</figcaption></figure>;
}

const formatTime = value => value ? new Date(value).toLocaleString() : 'Not provided';
export default function RealTrendFeed() {
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const load = async () => {
    setLoading(true); setError('');
    try {
      const response = await fetch('/api/trends');
      if (!response.ok) throw new Error('Source unavailable');
      const data = await response.json();
      if (!data.success || !Array.isArray(data.items)) throw new Error('Invalid source response');
      setResult(data);
    } catch { setError('Google Trends is unavailable. No sample data has been substituted.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);
  const items = (result?.items || []).filter(item => item.title.toLowerCase().includes(search.toLowerCase()));
  return <section id="real-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <span className="section-label">REAL SOURCE FEED · INDIA</span>
        <h2 className="text-3xl font-extrabold text-ink mt-2">Google Search Trends</h2>
        <p className="text-sm text-ink-3 mt-2">Topics from Google Trends India RSS, not YouTube or social-platform rankings. Source data is cached for up to one hour.</p>
        <p className="text-xs text-ink-3 mt-1">Approximate traffic is Google's feed value, not a TrendPulse audience or performance prediction. No AI scoring is applied.</p>
        {result && <p className="text-xs text-ink-3 mt-2">Fetched: {formatTime(result.fetchedAt)}{error ? ' · Previously fetched data shown below' : ''}</p>}
      </div>
      <button className="btn-outline text-xs shrink-0" onClick={load} disabled={loading}><RefreshCw className="w-4 h-4" />{loading ? 'Loading...' : 'Check Feed'}</button>
    </div>
    <div className="relative mb-5"><Search className="absolute left-4 top-3.5 w-4 h-4 text-ink-3" /><input aria-label="Search real Google Trends topics" placeholder="Search these source topics..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-11 pr-4 py-3 rounded-2xl border-2 border-line bg-white text-sm" /></div>
    {error && <p role="alert" className="rounded-2xl p-4 bg-amber-50 text-amber-800 text-sm mb-5">{error}</p>}
    {loading && !result && <p className="text-sm text-ink-3 py-8">Loading Google Trends...</p>}
    {!loading && result && !items.length && <p className="text-sm text-ink-3 py-8">No source topics match this search.</p>}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {items.map(item => <article key={item.id} className="card p-5 space-y-3">
        <span className="text-[10px] font-bold text-brand">SOURCE DATA · GOOGLE TRENDS · INDIA</span>
        <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
        <SourceImage item={item} />
        <p className="text-sm text-ink-2">Approximate traffic: <strong>{item.approximateTraffic || 'Not provided'}</strong></p>
        <p className="text-xs text-ink-3">Source published: {formatTime(item.publishedAt)}</p>
        {item.articles.length > 0 && <div className="space-y-2 pt-2 border-t border-line"><p className="text-xs font-bold text-ink-3">Related headlines supplied by the feed</p>{item.articles.map(article => <a key={article.url} href={article.url} target="_blank" rel="noopener noreferrer" className="block text-xs text-brand hover:underline">{article.title}<span className="block text-ink-3 mt-0.5">{article.publisher}</span></a>)}</div>}
        <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-bold text-brand">Open source feed<ExternalLink className="w-3 h-3" /></a>
      </article>)}
    </div>
  </section>;
}
