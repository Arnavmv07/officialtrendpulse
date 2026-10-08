import React, { useState } from 'react';
import { Plus, ArrowRight, Trash2, Copy, Check, Flame, ChevronRight } from 'lucide-react';

const STAGES = ['Idea', 'Scripting', 'Recording', 'Published'];

const STAGE_CONFIG = {
  Idea:      { bg: '#EEF0FF', color: '#4B35E8', dot: '#4B35E8', label: '💡 Idea' },
  Scripting: { bg: '#FFFBEB', color: '#D97706', dot: '#F59E0B', label: '✍️ Scripting' },
  Recording: { bg: '#F5F3FF', color: '#7C3AED', dot: '#8B5CF6', label: '🎬 Recording' },
  Published: { bg: '#ECFDF5', color: '#059669', dot: '#10B981', label: '✅ Published' },
};

function KanbanCard({ idea, onUpdateStatus, onDelete }) {
  const [copied, setCopied] = useState(false);

  const copyHook = () => {
    if (!idea.hookText) return;
    navigator.clipboard.writeText(idea.hookText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const stage = STAGE_CONFIG[idea.status] || STAGE_CONFIG.Idea;

  return (
    <div className="bg-white rounded-2xl border-2 p-4 space-y-3 shadow-card hover:shadow-card-hover transition-all"
      style={{ borderColor: '#EEF0FF' }}>

      {/* Top: genre + score */}
      <div className="flex items-center justify-between">
        <span className="badge uppercase" style={{ background: stage.bg, color: stage.color }}>
          {idea.genre || 'tech'}
        </span>
        {idea.viralScore && (
          <span className="flex items-center gap-1 text-xs font-bold font-mono" style={{ color: '#DC2626' }}>
            <Flame className="w-3 h-3" />{idea.viralScore}
          </span>
        )}
      </div>

      {/* Title */}
      <h4 className="font-extrabold text-sm leading-snug line-clamp-2" style={{ color: '#12112A' }}>
        {idea.titleVariant || idea.topic}
      </h4>

      {/* Hook preview */}
      {idea.hookText && (
        <div className="rounded-xl p-2.5 text-xs" style={{ background: '#F6F5FF' }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-bold" style={{ color: '#7A788F' }}>Hook:</span>
            <button onClick={copyHook} className="cursor-pointer" style={{ color: '#4B35E8' }}>
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
          <p className="italic line-clamp-2" style={{ color: '#3D3B5C' }}>"{idea.hookText}"</p>
        </div>
      )}

      {/* Notes */}
      {idea.notes && (
        <p className="text-xs line-clamp-2" style={{ color: '#B8B6CC' }}>{idea.notes}</p>
      )}

      {/* Bottom: stage selector + delete */}
      <div className="flex items-center justify-between gap-2 pt-1 border-t-2" style={{ borderColor: '#EEF0FF' }}>
        <select
          value={idea.status || 'Idea'}
          onChange={e => onUpdateStatus(idea.id, e.target.value)}
          className="text-xs font-bold rounded-lg px-2 py-1.5 border-2 cursor-pointer outline-none transition-all"
          style={{ borderColor: stage.color, color: stage.color, background: stage.bg }}
        >
          {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <button onClick={() => onDelete(idea.id)}
          className="p-1.5 rounded-lg transition-all cursor-pointer hover:scale-105"
          style={{ color: '#DC2626', background: '#FEF2F2' }}>
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function CreatorBacklog({ savedIdeas, onUpdateStatus, onDeleteIdea, onAddNewIdea, onSwitchToFeed }) {
  const [showAdd, setShowAdd] = useState(false);
  const [topic, setTopic] = useState('');
  const [genre, setGenre] = useState('tech');
  const [notes, setNotes] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!topic.trim()) return;
    onAddNewIdea({
      topic: topic.trim(), genre, targetPlatform: 'youtube',
      titleVariant: topic.trim(),
      hookText: `What if everything you knew about ${topic.trim()} was wrong?`,
      notes, viralScore: 88,
    });
    setTopic(''); setNotes(''); setShowAdd(false);
  };

  return (
    <div className="space-y-6">

      {/* Page Header */}
      <div className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="section-label">Your saved ideas</span>
          </div>
          <h2 className="text-2xl font-extrabold" style={{ color: '#12112A' }}>
            Idea board
          </h2>
          <p className="text-sm mt-1" style={{ color: '#7A788F' }}>
            Manage your video pipeline from idea to published.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setShowAdd(true)} className="btn-brand">
            <Plus className="w-4 h-4" /> Add Concept
          </button>
          <button onClick={onSwitchToFeed} className="btn-outline">
            Browse Trends <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {STAGES.map(stage => {
          const items = savedIdeas.filter(i => (i.status || 'Idea') === stage);
          const cfg = STAGE_CONFIG[stage];
          return (
            <div key={stage} className="space-y-3">
              {/* Column Header */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: cfg.dot }} />
                  <span className="font-extrabold text-sm" style={{ color: '#12112A' }}>
                    {cfg.label}
                  </span>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-full"
                  style={{ background: cfg.bg, color: cfg.color }}>
                  {items.length}
                </span>
              </div>

              {/* Cards */}
              <div className="min-h-[320px] space-y-3 rounded-2xl p-3"
                style={{ background: '#F6F5FF', border: `2px dashed ${cfg.color}33` }}>
                {items.length === 0 ? (
                  <div className="flex items-center justify-center h-20 text-xs font-medium italic"
                    style={{ color: '#B8B6CC' }}>
                    Drop ideas here
                  </div>
                ) : (
                  items.map(idea => (
                    <KanbanCard key={idea.id} idea={idea}
                      onUpdateStatus={onUpdateStatus} onDelete={onDeleteIdea} />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Concept Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(18,17,42,0.65)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) setShowAdd(false); }}>
          <div className="w-full max-w-md bg-white rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>
              Add Video Concept
            </h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold block mb-1.5" style={{ color: '#7A788F' }}>
                  Topic / Working Title
                </label>
                <input
                  required type="text" value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder="Enter video concept title..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium outline-none"
                  style={{ borderColor: '#DDD9FF', color: '#12112A' }}
                  onFocus={e => e.target.style.borderColor = '#4B35E8'}
                  onBlur={e => e.target.style.borderColor = '#DDD9FF'}
                />
              </div>
              <div>
                <label className="text-xs font-bold block mb-1.5" style={{ color: '#7A788F' }}>Niche</label>
                <select value={genre} onChange={e => setGenre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium outline-none cursor-pointer"
                  style={{ borderColor: '#DDD9FF', color: '#12112A' }}>
                  {['tech','gaming','finance','entertainment','fitness','lifestyle'].map(g => (
                    <option key={g} value={g}>{g.charAt(0).toUpperCase() + g.slice(1)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-bold block mb-1.5" style={{ color: '#7A788F' }}>
                  Notes / Angle (optional)
                </label>
                <textarea rows={3} value={notes} onChange={e => setNotes(e.target.value)}
                  placeholder="Add key talking points, references, or b-roll ideas..."
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-sm font-medium outline-none resize-none"
                  style={{ borderColor: '#DDD9FF', color: '#12112A' }}
                  onFocus={e => e.target.style.borderColor = '#4B35E8'}
                  onBlur={e => e.target.style.borderColor = '#DDD9FF'}
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAdd(false)}
                  className="btn-outline text-sm !px-4 !py-2">Cancel</button>
                <button type="submit" className="btn-brand text-sm">
                  Save to Studio
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
