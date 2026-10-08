import React from 'react';
import {
  Flame, TrendingUp, Zap, Sparkles,
  ExternalLink, Bookmark, CheckCircle2,
  ThumbsUp, MessageSquare, Repeat,
  Music2, Eye, Clock, Twitter,
  Youtube, Instagram
} from 'lucide-react';

/* ── Platform config ─────────────────────────────────────── */
const PLATFORM_CONFIG = {
  youtube: {
    label: 'YouTube',
    bg: '#FEF2F2', color: '#DC2626', border: '#FECACA',
    Icon: Youtube,
  },
  twitter: {
    label: 'X / Twitter',
    bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD',
    Icon: Twitter,
  },
  instagram: {
    label: 'Instagram',
    bg: '#FDF2F8', color: '#BE185D', border: '#FBCFE8',
    Icon: Instagram,
  },
  reddit: {
    label: 'Reddit',
    bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA',
    Icon: MessageSquare,
  },
};

/* ── Status badge ────────────────────────────────────────── */
function StatusBadge({ status }) {
  if (status === 'Peak Viral')
    return (
      <span className="badge" style={{ background: '#FEF2F2', color: '#DC2626' }}>
        <Flame className="w-2.5 h-2.5" /> Peak Viral
      </span>
    );
  if (status === 'Brewing Fast')
    return (
      <span className="badge" style={{ background: '#FFFBEB', color: '#D97706' }}>
        <Zap className="w-2.5 h-2.5" /> Brewing
      </span>
    );
  return (
    <span className="badge" style={{ background: '#F0FDF4', color: '#16A34A' }}>
      <TrendingUp className="w-2.5 h-2.5" /> Early Spark
    </span>
  );
}

/* ── Velocity bar ────────────────────────────────────────── */
function VelocityBar({ score = 75 }) {
  const color = score >= 90 ? '#DC2626' : score >= 70 ? '#F59E0B' : '#22C55E';
  return (
    <div className="flex items-center gap-2 mt-1">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#EEF0FF' }}>
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${score}%`, background: color }}
        />
      </div>
      <span className="text-xs font-bold font-mono" style={{ color }}>{score}</span>
    </div>
  );
}

/* ── Main TrendCard ──────────────────────────────────────── */
export default function TrendCard({ trend, onGenerateStrategy, onQuickSave, isSaved }) {
  const {
    platform, genre, title, sourceUrl, community,
    metrics = {}, status, summary, thumbnail,
    duration, sampleHook, sampleTweet, audioTrack, viralFormat,
  } = trend;

  const pc = PLATFORM_CONFIG[platform] || PLATFORM_CONFIG.reddit;
  const PlatformIcon = pc.Icon;

  return (
    <article className="card flex flex-col group">

      {/* Thumbnail */}
      {thumbnail && (
        <div className="relative w-full h-44 overflow-hidden" style={{ background: '#EEF0FF' }}>
          <img
            src={thumbnail} alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={e => { e.target.parentElement.style.display = 'none'; }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, rgba(18,17,42,0.55) 0%, transparent 55%)' }} />

          {/* Genre chip */}
          <div className="absolute top-3 left-3">
            <span className="badge text-white font-black uppercase tracking-wider"
              style={{ background: '#4B35E8' }}>
              {genre}
            </span>
          </div>

          {/* Duration (YouTube) */}
          {duration && (
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-white text-xs font-bold px-2 py-0.5 rounded-lg"
              style={{ background: 'rgba(0,0,0,0.75)' }}>
              <Clock className="w-3 h-3" />{duration}
            </div>
          )}

          {/* Author bottom-left */}
          <p className="absolute bottom-3 left-3 text-white text-xs font-semibold drop-shadow truncate max-w-[180px]">
            {community}
          </p>
        </div>
      )}

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">

        {/* Platform + Status row */}
        <div className="flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: pc.bg, color: pc.color, border: `1.5px solid ${pc.border}` }}>
            <PlatformIcon className="w-3 h-3" />
            {pc.label}
          </span>
          <StatusBadge status={status} />
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-base leading-snug line-clamp-2 group-hover:text-brand transition-colors"
          style={{ color: '#12112A' }}>
          {title}
        </h3>

        {/* Velocity bar */}
        <div>
          <div className="flex items-center justify-between text-xs mb-1" style={{ color: '#7A788F' }}>
            <span className="font-semibold">Velocity Score</span>
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-0.5 font-bold hover:text-brand transition-colors"
              style={{ color: '#4B35E8' }}>
              Source <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <VelocityBar score={metrics.velocityScore || 70} />
        </div>

        {/* Platform-specific rich content */}

        {/* YouTube: proven hook */}
        {platform === 'youtube' && sampleHook && (
          <div className="rounded-xl p-3 text-xs" style={{ background: '#FEF2F2', borderLeft: '3px solid #EF4444' }}>
            <p className="font-bold mb-1" style={{ color: '#991B1B' }}>Sample Hook That Works:</p>
            <p className="italic leading-relaxed" style={{ color: '#7F1D1D' }}>"{sampleHook}"</p>
          </div>
        )}

        {/* Twitter: top tweet quote */}
        {platform === 'twitter' && sampleTweet && (
          <div className="rounded-xl p-3 text-xs" style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD' }}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-bold" style={{ color: '#0284C7' }}>{sampleTweet.author}</span>
              <span className="font-mono font-bold text-[10px]" style={{ color: '#7A788F' }}>
                {metrics.velocityChange}
              </span>
            </div>
            <p className="leading-relaxed" style={{ color: '#0C4A6E' }}>"{sampleTweet.text}"</p>
            <div className="flex items-center gap-3 mt-2 pt-2" style={{ borderTop: '1px solid #BAE6FD', color: '#7A788F' }}>
              <span className="flex items-center gap-1"><ThumbsUp className="w-3 h-3 text-red-400" />{sampleTweet.likes}</span>
              <span className="flex items-center gap-1"><Repeat className="w-3 h-3 text-green-500" />{sampleTweet.retweets}</span>
            </div>
          </div>
        )}

        {/* Instagram: audio + format */}
        {platform === 'instagram' && (
          <div className="rounded-xl p-3 text-xs space-y-1.5"
            style={{ background: '#FDF2F8', border: '1.5px solid #FBCFE8' }}>
            {audioTrack && (
              <p className="flex items-center gap-1.5 font-semibold truncate" style={{ color: '#BE185D' }}>
                <Music2 className="w-3 h-3 shrink-0" />{audioTrack}
              </p>
            )}
            {viralFormat && (
              <p className="leading-relaxed line-clamp-2" style={{ color: '#9D174D' }}>
                <span className="font-bold">Format: </span>{viralFormat}
              </p>
            )}
          </div>
        )}

        {/* Reddit: summary */}
        {platform === 'reddit' && summary && (
          <p className="text-xs leading-relaxed line-clamp-3" style={{ color: '#7A788F' }}>
            {summary}
          </p>
        )}

        {/* Fallback summary */}
        {!['youtube', 'twitter', 'instagram', 'reddit'].includes(platform) && summary && (
          <p className="text-xs leading-relaxed line-clamp-2" style={{ color: '#7A788F' }}>
            {summary}
          </p>
        )}

        {/* Metrics row */}
        <div className="flex items-center justify-between text-xs font-semibold pt-2"
          style={{ borderTop: '1.5px solid #EEF0FF', color: '#7A788F' }}>
          {platform === 'youtube' && (
            <>
              <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{metrics.views}</span>
              <span>Retention {metrics.retentionRate}</span>
            </>
          )}
          {platform === 'twitter' && (
            <>
              <span>{metrics.volume} posts</span>
              <span>{metrics.sentiment}</span>
            </>
          )}
          {platform === 'instagram' && (
            <>
              <span>{metrics.avgViews} avg views</span>
              <span className="font-bold" style={{ color: '#BE185D' }}>Save Rate {metrics.saveRate}</span>
            </>
          )}
          {platform === 'reddit' && (
            <>
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-3.5 h-3.5 text-orange-500" />{metrics.upvotes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5 text-blue-500" />{metrics.comments} comments
              </span>
            </>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* CTA Row */}
        <div className="flex items-center gap-2 pt-2">
          <button
            onClick={() => onGenerateStrategy(trend)}
            className="btn-brand flex-1 justify-center text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Generate Strategy
          </button>
          <button
            onClick={() => onQuickSave(trend)}
            title={isSaved ? 'Saved' : 'Save to Studio'}
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border-2 transition-all"
            style={isSaved
              ? { background: '#ECFDF5', borderColor: '#6EE7B7', color: '#059669' }
              : { background: '#EEF0FF', borderColor: '#DDD9FF', color: '#4B35E8' }}
          >
            {isSaved
              ? <CheckCircle2 className="w-4 h-4" />
              : <Bookmark className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </article>
  );
}
