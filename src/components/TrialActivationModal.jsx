import React, { useState } from 'react';
import { X, Sparkles, Check, CheckCircle2, Zap, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function TrialActivationModal({ isOpen, onClose, onActivated }) {
  const [channelName, setChannelName] = useState('');
  const [platform, setPlatform] = useState('youtube');
  const [genre, setGenre] = useState('tech');
  const [email, setEmail] = useState('');
  const [activated, setActivated] = useState(false);

  if (!isOpen) return null;

  const handleActivate = (e) => {
    e.preventDefault();
    if (!channelName.trim() || !email.trim()) return;

    const proProfile = {
      channelName: channelName.trim(),
      platform,
      genre,
      email: email.trim(),
      tier: 'Creator Pro (14-Day Trial)',
      activatedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 14 * 86400000).toISOString(),
    };

    localStorage.setItem('trendpulse_pro_profile', JSON.stringify(proProfile));

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.6 }
      });
    } catch {}

    setActivated(true);
    setTimeout(() => {
      setActivated(false);
      onActivated(proProfile);
      onClose();
    }, 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(18,17,42,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2"
              style={{ background: '#C5FF00', color: '#12112A' }}>
              <Sparkles className="w-3.5 h-3.5" />
              <span>INSTANT 14-DAY PRO PASS</span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink">Unlock Creator Pro</h2>
            <p className="text-xs text-ink-3 mt-1">
              Full access to Claude 3.7 deep reasoning briefs, unlimited hooks, and script blueprints.
            </p>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface text-ink-3 hover:text-ink cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {activated ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-3xl flex items-center justify-center"
              style={{ background: '#ECFDF5' }}>
              <CheckCircle2 className="w-10 h-10 text-emerald-500" />
            </div>
            <h3 className="text-xl font-extrabold text-ink">Creator Pro Pass Active!</h3>
            <p className="text-xs text-ink-3 max-w-xs mx-auto">
              Your 14-day trial for <strong>{channelName}</strong> is ready. Unlimited Claude strategy generation is now unlocked across your workspace.
            </p>
          </div>
        ) : (
          <form onSubmit={handleActivate} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-ink-3 mb-1">Channel Name or Creator Handle</label>
              <input
                required
                type="text"
                placeholder="Enter channel name (e.g. Nexus Tech, @alex_daily)"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-ink-3 mb-1">Primary Platform</label>
                <select
                  value={platform}
                  onChange={e => setPlatform(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none cursor-pointer"
                  style={{ borderColor: '#DDD9FF' }}
                >
                  <option value="youtube">YouTube (Long & Shorts)</option>
                  <option value="instagram">Instagram Reels</option>
                  <option value="tiktok">TikTok</option>
                  <option value="twitter">X (Twitter)</option>
                </select>
              </div>

              <div>
                <label className="block text-ink-3 mb-1">Channel Niche</label>
                <select
                  value={genre}
                  onChange={e => setGenre(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none cursor-pointer"
                  style={{ borderColor: '#DDD9FF' }}
                >
                  <option value="tech">Tech & AI</option>
                  <option value="gaming">Gaming</option>
                  <option value="finance">Finance & Markets</option>
                  <option value="entertainment">Pop Culture & Cinema</option>
                  <option value="fitness">Fitness & Health</option>
                  <option value="lifestyle">Productivity & Habits</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-ink-3 mb-1">Work or Creator Email</label>
              <input
                required
                type="email"
                placeholder="Enter email for strategy briefs"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            {/* Trial Feature Highlights */}
            <div className="p-3.5 rounded-2xl bg-surface border-2 space-y-1.5 text-[11px] text-ink-2"
              style={{ borderColor: '#DDD9FF' }}>
              <div className="flex items-center gap-1.5 text-brand font-bold">
                <Zap className="w-3.5 h-3.5" />
                <span>Included in your pass:</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Unlimited Claude 3.7 reasoning briefs</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Priority crawler sync across all 4 platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>No credit card required for trial access</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="btn-outline !px-4 !py-2 text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-lime text-xs">
                <span>Start 14-Day Free Trial</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
