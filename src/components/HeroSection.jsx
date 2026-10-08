import React from 'react';
import { Youtube, Twitter, Instagram, MessageSquare, ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

const PLATFORM_BLOCKS = [
  {
    id: 'youtube',
    icon: Youtube,
    label: 'YouTube',
    stat: 'Sample video topics',
    tagline: 'Breakout videos, retention hooks & view-velocity radar',
    bg: '#FEF2F2', color: '#DC2626', border: '#FECACA',
    pill: '#DC2626',
  },
  {
    id: 'twitter',
    icon: Twitter,
    label: 'X / Twitter',
    stat: 'Sample discussions',
    tagline: 'Viral hashtags, controversy score & debate dynamics',
    bg: '#F0F9FF', color: '#0284C7', border: '#BAE6FD',
    pill: '#0284C7',
  },
  {
    id: 'instagram',
    icon: Instagram,
    label: 'Instagram',
    stat: 'Sample reel concepts',
    tagline: 'Trending audio surge, viral format blueprints & save rate',
    bg: '#FDF2F8', color: '#BE185D', border: '#FBCFE8',
    pill: '#BE185D',
  },
  {
    id: 'reddit',
    icon: MessageSquare,
    label: 'Reddit',
    stat: 'Sample community topics',
    tagline: 'Deep community discussions, upvote spikes & contrarian ideas',
    bg: '#FFF7ED', color: '#C2410C', border: '#FED7AA',
    pill: '#C2410C',
  },
];

export default function HeroSection({ trendCount = 0, onScrollToFeed, onPickPlatform, onOpenTrial, onOpenContact }) {
  return (
    <section className="relative overflow-hidden" style={{ background: '#FFFFFF' }}>

      {/* Decorative gradient blobs */}
      <div className="absolute -top-36 -right-36 w-[520px] h-[520px] rounded-full pointer-events-none"
        style={{ background: '#EEF0FF', opacity: 0.8 }} />
      <div className="absolute -bottom-24 -left-24 w-[320px] h-[320px] rounded-full pointer-events-none"
        style={{ background: '#F4FFD6', opacity: 0.7 }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">

        {/* Hero text block */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14">

          {/* Left: Copy & Value Proposition */}
          <div className="flex-1 text-center lg:text-left">

            {/* Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border-2"
                style={{ borderColor: '#DDD9FF', background: '#F6F5FF' }}>
                <span className="live-dot"></span>
                <span className="text-xs font-bold" style={{ color: '#4B35E8' }}>
                  {trendCount} Sample Trend Cards
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold"
                style={{ background: '#12112A', color: '#C5FF00' }}>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Interactive Creator Prototype</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.08] tracking-tight mb-6 text-ink">
              Stop guessing what to film.
              <br />
              <span className="relative inline-block mt-1">
                <span style={{ color: '#4B35E8' }}>Create with conviction.</span>
                <svg className="absolute -bottom-1.5 left-0 w-full" height="8" viewBox="0 0 100 8" preserveAspectRatio="none">
                  <path d="M0 6 Q50 1 100 6" stroke="#C5FF00" strokeWidth="6" fill="none" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 text-ink-3">
              TrendPulse is a creator-workflow prototype with <strong className="text-ink">sample topics inspired by YouTube, X, Instagram & Reddit</strong>. Explore filters, template-based video briefs, and a browser-local idea board. A separate Google Trends India feed is live below. One private <strong className="text-brand">Claude brief test has passed</strong>; public generation and social-platform feeds are not active.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center lg:justify-start">
              <button onClick={onScrollToFeed} className="btn-brand text-sm sm:text-base !py-3 !px-6">
                <span>Explore Sample Trend Feed</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button onClick={onOpenContact} className="btn-outline text-sm sm:text-base !py-3 !px-5">
                <span>Contact the Builder</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-4 mt-6 text-xs font-semibold text-ink-3">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                Demo runs in your browser
              </span>
              <span>•</span>
              <span>Review ideas before publishing</span>
            </div>

          </div>

          {/* Right: Interactive 4-Platform Preview Cards */}
          <div className="flex-1 w-full max-w-md lg:max-w-none">
            <div className="grid grid-cols-2 gap-3.5">
              {PLATFORM_BLOCKS.map(p => {
                const Icon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => onPickPlatform(p.id)}
                    className="text-left rounded-3xl p-4 sm:p-5 border-2 hover:shadow-card-hover hover:-translate-y-1 transition-all cursor-pointer"
                    style={{ background: p.bg, borderColor: p.border }}
                  >
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center mb-3 text-white shadow-sm"
                      style={{ background: p.pill }}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <p className="font-extrabold text-sm sm:text-base mb-0.5 text-ink">{p.label}</p>
                    <p className="text-[11px] font-bold mb-1.5" style={{ color: p.color }}>{p.stat}</p>
                    <p className="text-xs leading-relaxed text-ink-2">{p.tagline}</p>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Bottom Fast Metrics Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 border-t-2"
          style={{ borderColor: '#EEF0FF' }}>
          {[
            { value: '4 Categories', label: 'Platform-Inspired Sample Topics' },
            { value: 'Templates', label: 'Example Creative Briefs' },
            { value: 'Local Board', label: 'Save Ideas in This Browser' },
            { value: 'October 2026', label: 'Started in Pune, India' },
          ].map(s => (
            <div key={s.label} className="text-center lg:text-left">
              <p className="text-xl sm:text-2xl font-black text-brand">{s.value}</p>
              <p className="text-xs font-semibold text-ink-3 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
              }
