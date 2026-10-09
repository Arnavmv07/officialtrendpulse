import React, { useState, useEffect } from 'react';
import {
  X, Sparkles, Copy, Check, Bookmark, Download,
  Flame, Clock, Lightbulb, ChevronRight, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {authClient,addCreatorIdea} from '../services/dashboard';
import { generateClientClaudeStrategy } from '../services/claudeEngine.js';

/* ── Section heading helper ───────────────────────────── */
function SectionHeading({ number, children }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black text-white"
        style={{ background: '#4B35E8' }}>
        {number}
      </span>
      <h3 className="font-extrabold text-base" style={{ color: '#12112A' }}>{children}</h3>
    </div>
  );
}

/* ── Copy button ──────────────────────────────────────── */
function CopyBtn({ text, label }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button onClick={handle}
      className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer"
      style={copied
        ? { background: '#ECFDF5', color: '#059669' }
        : { background: '#EEF0FF', color: '#4B35E8' }}>
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? 'Copied!' : label || 'Copy'}
    </button>
  );
}

export default function IdeaGeneratorModal({ trend, isOpen, onClose, onSaveToBacklog, isSaved }) {
  const [strategy, setStrategy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [format, setFormat] = useState('shortForm');
  const [tone, setTone] = useState('engaging');
  const [savedLocally, setSavedLocally] = useState(isSaved);
  const [accountUser,setAccountUser]=useState(null),[accountMessage,setAccountMessage]=useState('');
  useEffect(()=>{if(authClient)authClient.auth.getUser().then(({data})=>setAccountUser(data.user));setAccountMessage('');},[isOpen]);

  useEffect(() => {
    if (isOpen && trend) { setStrategy(null); setSavedLocally(isSaved); fetchStrategy(); }
  }, [isOpen, trend, tone]);

  const fetchStrategy = async () => {
    setLoading(true);
    try {
      setStrategy(generateClientClaudeStrategy(trend, { tone }));
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSave = async () => {
    if (!strategy) return;
    try { confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } }); } catch {}
    const saved = await onSaveToBacklog({
      topic: strategy.topic, genre: strategy.genre,
      targetPlatform: trend.platform || 'youtube',
      titleVariant: strategy.titleVariants[0]?.title || strategy.topic,
      hookText: strategy.hooks[format]?.spokenHook,
      viralScore: null, sourceUrl: trend.sourceUrl || null, contextDate:trend.publishedAt||trend.fetchedAt||null, searchVolume:trend.approximateTraffic||null, headline:trend.articles?.[0]?.title||null, sourcePublisher:trend.articles?.[0]?.publisher||null, fullBrief:[strategy.hooks[format]?.spokenHook,...strategy.outline.map(o=>o.name+"\n"+o.details)].join("\n\n"),
      notes: (trend.isRealTopic ? trend.summary + "\n" : "") + `Format: ${format} | Thumbnail: "${strategy.thumbnailConcept.mainTextOverlay}"`,
    });
    if (saved !== false) setSavedLocally(true);
  };

  const exportMarkdown = () => {
    if (!strategy) return;
    const md = [
      `# Content Brief: ${strategy.topic}`,
      `Template brief. Check the facts before publishing.`,
      '',
      `## Title Options`,
      ...strategy.titleVariants.map((v, i) => `${i + 1}. **${v.title}**\n   *${v.whyItWorks}*`),
      '',
      `## Hook (${format === 'shortForm' ? 'Shorts/Reels' : 'Long-Form'})`,
      `"${strategy.hooks[format]?.spokenHook}"`,
      `Visual: ${strategy.hooks[format]?.visualAction}`,
      '',
      `## Script Outline`,
      ...strategy.outline.map(o => `### [${o.step}] ${o.name}\n${o.details}`),
      '',
      `## Thumbnail`,
      `Text: ${strategy.thumbnailConcept.mainTextOverlay}`,
      `Colors: ${strategy.thumbnailConcept.colorPalette}`,
    ].join('\n');
    navigator.clipboard.writeText(md);
  };

  if (!isOpen || !trend) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      style={{ background: 'rgba(18,17,42,0.65)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto"
        style={{ maxHeight: '92vh', boxShadow: '0 24px 80px rgba(75,53,232,0.22)' }}>

        {/* ── Header Bar ────────────────────────────── */}
        <div className="flex items-start justify-between gap-4 p-6 border-b-2" style={{ borderColor: '#EEF0FF' }}>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="badge" style={{ background: '#EEF0FF', color: '#4B35E8' }}>
                <Sparkles className="w-3 h-3" /> Video brief
              </span>
              <span className="badge uppercase" style={{ background: '#F6F5FF', color: '#7A788F' }}>
                {trend.genre}
              </span>
            </div>
            <h2 className="font-extrabold text-lg leading-snug line-clamp-2" style={{ color: '#12112A' }}>
              {trend.title}
            </h2>
          </div>
          <button onClick={onClose} aria-label="Close brief"
            className="p-2 rounded-xl flex-shrink-0 transition-all hover:scale-105"
            style={{ background: '#F6F5FF', color: '#7A788F' }}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ── Tone + Format selectors ───────────────── */}
        <div className="px-6 py-3 border-b-2 flex flex-wrap items-center justify-between gap-3"
          style={{ borderColor: '#EEF0FF', background: '#F6F5FF' }}>
          <div className="flex gap-1 p-1 rounded-xl" style={{ background: '#EEF0FF' }}>
            {[['shortForm', 'Shorts / Reels'], ['longForm', 'Long-Form (10m+)']].map(([f, label]) => (
              <button key={f} onClick={() => setFormat(f)}
                className="px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer"
                style={format === f ? { background: '#4B35E8', color: '#fff' } : { color: '#7A788F' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Scrollable Body ───────────────────────── */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
{accountUser&&trend.isRealTopic&&<div className="text-sm"><button className="btn-outline" onClick={async()=>{try{await addCreatorIdea({topic:trend.title,hook:strategy?.hooks[format]?.spokenHook||trend.sampleHook,notes:trend.summary,source_url:trend.sourceUrl});setAccountMessage('Saved in your private account dashboard. Reload the dashboard to see it.');}catch{setAccountMessage('Could not save to your account. Please try again.');}}}>Save to account dashboard</button><p role="status" className="mt-2">{accountMessage}</p></div>}{trend.isRealTopic&&<aside className="bg-surface rounded-xl p-4 text-sm"><p className="font-bold text-brand">Source-backed topic, rule-based brief</p><p className="mt-2">Original topic: {trend.originalTitle}. Read these sources before publishing. The outline is a template, not a verified script.</p>{trend.articles?.map(a=><a key={a.url} className="block text-brand mt-2" target="_blank" rel="noopener noreferrer" href={a.url}>{a.title} ({a.publisher})</a>)}</aside>}


          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center"
                style={{ background: '#EEF0FF' }}>
                <Sparkles className="w-7 h-7 animate-spin" style={{ color: '#4B35E8' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#7A788F' }}>
                Preparing your template demo brief...
              </p>
            </div>
          ) : strategy ? (
            <>

              {/* ── 2. Hook ──────────────────────── */}
              <div>
                <SectionHeading number="1">
                  Opening hook: {format === 'shortForm' ? 'Vertical Shorts / Reels' : 'YouTube Long-Form'}
                </SectionHeading>
                <div className="rounded-2xl p-5 border-l-4 space-y-4"
                  style={{ background: '#F6F5FF', borderLeftColor: '#4B35E8' }}>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#4B35E8' }}>
                        Spoken Script
                      </p>
                      <CopyBtn text={strategy.hooks[format]?.spokenHook} label="Copy Hook" />
                    </div>
                    <p className="text-base font-bold italic leading-relaxed" style={{ color: '#12112A' }}>
                      {strategy.hooks[format]?.spokenHook.replace(/^"|"$/g,'')}
                    </p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-xl p-3 border-2" style={{ borderColor: '#DDD9FF', background: '#fff' }}>
                      <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#7A788F' }}>
                        📹 Camera Action
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: '#3D3B5C' }}>
                        {strategy.hooks[format]?.visualAction}
                      </p>
                    </div>
                    <div className="rounded-xl p-3 border-2" style={{ borderColor: '#DDD9FF', background: '#fff' }}>
                      <p className="text-[11px] font-bold uppercase tracking-wider mb-1.5" style={{ color: '#7A788F' }}>
                        🔤 On-Screen Text
                      </p>
                      <p className="text-xs font-mono font-bold" style={{ color: '#3D3B5C' }}>
                        {strategy.hooks[format]?.textOnScreen}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 1. Title Options ─────────────── */}
              <div>
                <SectionHeading number="2">Title options</SectionHeading>
                <div className="space-y-3">
                  {strategy.titleVariants.map((v, i) => (
                    <div key={i} className="rounded-2xl p-4 border-2 hover:border-brand transition-all group/t"
                      style={{ borderColor: '#EEF0FF', background: '#FAFAFE' }}>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <span className="badge" style={{ background: '#EEF0FF', color: '#4B35E8' }}>
                          {v.style}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold font-mono" style={{ color: '#10B981' }}>
                            Title idea
                          </span>
                          <CopyBtn text={v.title} />
                        </div>
                      </div>
                      <p className="font-extrabold text-base leading-snug mb-1.5" style={{ color: '#12112A' }}>
                        {v.title}
                      </p>
                      <p className="text-xs leading-relaxed" style={{ color: '#7A788F' }}>{v.whyItWorks}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 3. Script Outline ────────────── */}
              <div>
                <SectionHeading number="3">5-Beat Script Outline</SectionHeading>
                <div className="space-y-2">
                  {strategy.outline.map((beat, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl p-3.5 border-2 transition-all hover:border-brand"
                      style={{ borderColor: '#EEF0FF' }}>
                      <span className="text-xs font-black font-mono px-2 py-1 rounded-lg whitespace-nowrap shrink-0"
                        style={{ background: '#EEF0FF', color: '#4B35E8' }}>
                        {beat.step}
                      </span>
                      <div>
                        <p className="font-bold text-sm mb-0.5" style={{ color: '#12112A' }}>{beat.name}</p>
                        <p className="text-xs leading-relaxed" style={{ color: '#7A788F' }}>{beat.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── 4. Thumbnail ─────────────────── */}
              <div>
                <SectionHeading number="4">Thumbnail Blueprint</SectionHeading>
                <div className="rounded-2xl p-5 border-2" style={{ borderColor: '#EEF0FF', background: '#FAFAFE' }}>
                  <div className="flex items-center justify-between mb-3 pb-3 border-b-2" style={{ borderColor: '#EEF0FF' }}>
                    <div>
                      <p className="text-xs font-bold" style={{ color: '#7A788F' }}>Main Text Badge</p>
                      <p className="text-2xl font-black" style={{ color: '#4B35E8' }}>
                        {strategy.thumbnailConcept.mainTextOverlay}
                      </p>
                    </div>

                  </div>
                  <p className="text-xs mb-2 leading-relaxed" style={{ color: '#3D3B5C' }}>
                    <span className="font-bold">Scene: </span>{strategy.thumbnailConcept.visualDescription}
                  </p>
                  <p className="text-xs font-mono" style={{ color: '#7A788F' }}>
                    Colors: {strategy.thumbnailConcept.colorPalette}
                  </p>
                </div>
              </div>

              {/* ── 5. Audience ──────────────────── */}
              <div className="rounded-2xl p-5 flex items-start gap-3 border-2"
                style={{ background: '#FFFBEB', borderColor: '#FDE68A' }}>
                <Lightbulb className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#F59E0B' }} />
                <div className="space-y-1 text-xs" style={{ color: '#92400E' }}>
                  <p className="font-bold text-sm mb-2" style={{ color: '#78350F' }}>Audience and format</p>
                  <p><span className="font-bold">Who:</span> {strategy.targetAudience.demographic}</p>
                  <p><span className="font-bold">Structure:</span> {strategy.targetAudience.retentionSecret}</p>
                </div>
              </div>

              <p className="text-xs text-ink-3 border-t border-line pt-4">This brief uses local templates, not AI. Check sources and adapt the wording before publishing. No performance prediction is made.</p>
            </>
          ) : null}
        </div>

        {/* ── Footer Actions ────────────────────────── */}
        <div className="p-5 border-t-2 flex items-center justify-between gap-3 flex-wrap"
          style={{ borderColor: '#EEF0FF', background: '#F6F5FF' }}>
          <button onClick={exportMarkdown}
            className="btn-outline text-sm">
            <Download className="w-4 h-4" />
            Copy Full Brief (.md)
          </button>
          <div className="flex items-center gap-3">
            <button onClick={onClose}
              className="text-sm font-bold px-4 py-2 rounded-full transition-all hover:bg-surface-2"
              style={{ color: '#7A788F' }}>
              Close
            </button>
            <button
              onClick={handleSave}
              disabled={savedLocally}
              className={savedLocally ? 'btn-outline !cursor-default' : 'btn-brand'}
            >
              <Bookmark className="w-4 h-4" />
              {savedLocally ? 'Saved to Idea board ✓' : 'Save to Idea board'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
      }
