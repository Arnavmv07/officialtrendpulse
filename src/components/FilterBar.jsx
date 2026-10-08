import React from 'react';
import {
  Search, Globe, Cpu, Gamepad2, DollarSign, Film, Activity,
  Coffee, Youtube, Twitter, Instagram, MessageSquare
} from 'lucide-react';

const GENRES = [
  { id: 'all', label: 'All Niches', icon: Globe },
  { id: 'tech', label: 'Tech & AI', icon: Cpu },
  { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
  { id: 'finance', label: 'Finance', icon: DollarSign },
  { id: 'entertainment', label: 'Entertainment', icon: Film },
  { id: 'fitness', label: 'Fitness', icon: Activity },
  { id: 'lifestyle', label: 'Lifestyle', icon: Coffee },
];

const PLATFORMS = [
  { id: 'all', label: 'All Sources', icon: Globe },
  { id: 'youtube', label: 'YouTube', icon: Youtube, color: '#EF4444' },
  { id: 'twitter', label: 'X / Twitter', icon: Twitter, color: '#0EA5E9' },
  { id: 'instagram', label: 'Instagram', icon: Instagram, color: '#EC4899' },
  { id: 'reddit', label: 'Reddit', icon: MessageSquare, color: '#F97316' },
];

const VELOCITIES = [
  { id: 'all', label: 'All Velocities' },
  { id: 'Peak Viral', label: '🔥 Peak Viral' },
  { id: 'Brewing Fast', label: '⚡ Brewing' },
  { id: 'Early Spark', label: '🌱 Early Spark' },
];

export default function FilterBar({ filters, setFilters }) {
  const set = (key, val) => setFilters(p => ({ ...p, [key]: val }));

  return (
    <div className="space-y-5 mb-8">

      {/* Search + Velocity Row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#B8B6CC' }} />
          <input
            type="text"
            value={filters.search || ''}
            onChange={e => set('search', e.target.value)}
            placeholder="Search trends, topics, creators, or subreddits..."
            className="w-full pl-10 pr-10 py-3 rounded-2xl border-2 text-sm font-medium outline-none transition-all"
            style={{
              background: '#fff',
              borderColor: filters.search ? '#4B35E8' : '#DDD9FF',
              color: '#12112A',
            }}
            onFocus={e => e.target.style.borderColor = '#4B35E8'}
            onBlur={e => e.target.style.borderColor = filters.search ? '#4B35E8' : '#DDD9FF'}
          />
          {filters.search && (
            <button
              onClick={() => set('search', '')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold px-2 py-0.5 rounded-full"
              style={{ background: '#EEF0FF', color: '#4B35E8' }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Velocity Filter */}
        <div className="flex items-center gap-2 p-1 rounded-2xl border-2" style={{ background: '#fff', borderColor: '#DDD9FF' }}>
          {VELOCITIES.map(v => (
            <button
              key={v.id}
              onClick={() => set('status', v.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap"
              style={filters.status === v.id
                ? { background: '#4B35E8', color: '#fff' }
                : { color: '#7A788F' }}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Genre Pills */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: '#B8B6CC' }}>
          Filter by Niche
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {GENRES.map(g => {
            const Icon = g.icon;
            const active = filters.genre === g.id;
            return (
              <button
                key={g.id}
                onClick={() => set('genre', g.id)}
                className="tab-pill shrink-0 flex items-center gap-1.5"
                style={active ? { background: '#4B35E8', color: '#fff', borderColor: '#4B35E8' } : {}}
              >
                <Icon className="w-3.5 h-3.5" />
                {g.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Pills */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest mb-2.5" style={{ color: '#B8B6CC' }}>
          Platform
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar flex-wrap">
          {PLATFORMS.map(p => {
            const Icon = p.icon;
            const active = filters.platform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => set('platform', p.id)}
                className="tab-pill shrink-0 flex items-center gap-1.5"
                style={active
                  ? { background: p.color || '#4B35E8', color: '#fff', borderColor: p.color || '#4B35E8' }
                  : {}
                }
              >
                <Icon className="w-3.5 h-3.5" style={active ? {} : { color: p.color }} />
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
