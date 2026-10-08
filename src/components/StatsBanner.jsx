import React from 'react';
import { TrendingUp, Flame, Zap, Sparkles } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    label: 'Tracked Trends',
    valueKey: 'total',
    accent: '#4B35E8',
    bg: '#EEF0FF',
    note: 'Active Now',
  },
  {
    icon: Flame,
    label: 'Peak Viral',
    valueKey: 'peakViral',
    accent: '#EF4444',
    bg: '#FEF2F2',
    note: 'Max Reach',
    pulse: true,
  },
  {
    icon: Zap,
    label: 'Brewing (Best Timing)',
    valueKey: 'brewing',
    accent: '#F59E0B',
    bg: '#FFFBEB',
    note: 'Sweet Spot',
  },
  {
    icon: Sparkles,
    label: 'Top Velocity Score',
    valueKey: 'topScore',
    accent: '#10B981',
    bg: '#ECFDF5',
    note: '/100',
  },
];

export default function StatsBanner({ trends = [] }) {
  const total = trends.length;
  const peakViral = trends.filter(t => t.status === 'Peak Viral').length;
  const brewing = trends.filter(t => t.status === 'Brewing Fast').length;
  const topScore = trends[0]?.metrics?.velocityScore ?? 0;

  const values = { total, peakViral, brewing, topScore };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map(({ icon: Icon, label, valueKey, accent, bg, note, pulse }) => (
        <div key={valueKey} className="card p-5 flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
            style={{ background: bg }}>
            <Icon
              className={`w-5 h-5 ${pulse ? 'animate-pulse' : ''}`}
              style={{ color: accent }}
            />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold mb-0.5 truncate" style={{ color: '#7A788F' }}>
              {label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-extrabold" style={{ color: '#12112A' }}>
                {values[valueKey]}
              </span>
              <span className="text-xs font-bold px-1.5 py-0.5 rounded-full"
                style={{ background: bg, color: accent }}>
                {note}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
