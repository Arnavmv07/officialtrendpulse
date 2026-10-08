import React, { useState } from 'react';
import { TrendingUp, RefreshCw, Bookmark, Compass, Zap, Menu, X, Sparkles, ShieldCheck } from 'lucide-react';

export default function Header({ 
  activeTab, 
  setActiveTab, 
  onRefresh, 
  isRefreshing, 
  crawlerStatus, 
  savedCount,
  activePlan = 'free',
  onOpenContact,
  onOpenCompliance
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const formatTime = (iso) => {
    if (!iso) return 'Just now';
    return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const scrollToSection = (id) => {
    if (activeTab !== 'feed') setActiveTab('feed');
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b-2" style={{ borderBottomColor: '#DDD9FF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo & Claude Partner Badge */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('feed')}
              className="flex items-center gap-2.5 text-left border-0 bg-transparent p-0 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm" style={{ background: '#4B35E8' }}>
                <Zap className="w-5 h-5 text-lime" fill="#C5FF00" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-ink">
                    TrendPulse
                  </span>
                  {activePlan === 'pro' ? (
                    <span className="hidden sm:inline-block text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: '#C5FF00', color: '#12112A' }}>
                      PRO PASS
                    </span>
                  ) : (
                    <span className="hidden sm:inline-block text-[10px] font-black px-2 py-0.5 rounded-full"
                      style={{ background: '#EEF0FF', color: '#4B35E8' }}>
                      EXPLORER
                    </span>
                  )}
                </div>
                <div className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-brand">
                  <span>Built on Anthropic Claude</span>
                </div>
              </div>
            </button>
          </div>

          {/* Center Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-surface rounded-full p-1 border" style={{ borderColor: '#DDD9FF' }}>
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'feed' ? 'text-white' : 'text-ink-3 hover:text-ink'
              }`}
              style={activeTab === 'feed' ? { background: '#4B35E8' } : {}}
            >
              <Compass className="w-3.5 h-3.5" />
              Trend Radar
            </button>

            <button
              onClick={() => setActiveTab('studio')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'studio' ? 'text-white' : 'text-ink-3 hover:text-ink'
              }`}
              style={activeTab === 'studio' ? { background: '#4B35E8' } : {}}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Creator Studio
              {savedCount > 0 && (
                <span className="text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full ml-0.5"
                  style={{ background: '#C5FF00', color: '#12112A' }}>
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => scrollToSection('claude-stack')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-ink-3 hover:text-ink transition-all"
            >
              Why Claude
            </button>

            <button
              onClick={() => scrollToSection('pricing')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-ink-3 hover:text-ink transition-all"
            >
              Pricing
            </button>

            <button
              onClick={() => scrollToSection('about')}
              className="px-3.5 py-1.5 rounded-full text-xs font-bold text-ink-3 hover:text-ink transition-all"
            >
              About
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            
            {/* Live Crawler Status */}
            <div className="hidden xl:flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border"
              style={{ borderColor: '#DDD9FF', background: '#F6F5FF', color: '#3D3B5C' }}>
              <span className="live-dot"></span>
              <span>4 Platforms Synced</span>
            </div>

            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 sm:px-3 sm:py-2 rounded-full border-2 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer hover:border-brand"
              style={{ borderColor: '#DDD9FF', background: '#FFFFFF', color: '#4B35E8' }}
              title="Crawl live trends across YouTube, X, Instagram, and Reddit"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync'}</span>
            </button>

            <button
              onClick={onOpenContact}
              className="btn-brand text-xs !py-2 !px-3.5 shadow-sm"
            >
              <span>Book Demo</span>
            </button>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden p-2 rounded-xl"
              style={{ background: '#EEF0FF', color: '#4B35E8' }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t-2 space-y-2" style={{ borderColor: '#EEF0FF' }}>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => { setActiveTab('feed'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-xl text-xs font-bold ${activeTab === 'feed' ? 'bg-brand text-white' : 'bg-surface text-ink'}`}
              >
                Trend Radar
              </button>
              <button
                onClick={() => { setActiveTab('studio'); setMobileMenuOpen(false); }}
                className={`py-2 rounded-xl text-xs font-bold ${activeTab === 'studio' ? 'bg-brand text-white' : 'bg-surface text-ink'}`}
              >
                Creator Studio ({savedCount})
              </button>
            </div>
            <div className="flex justify-between text-xs font-bold pt-2 px-1 text-ink-3">
              <button onClick={() => { scrollToSection('claude-stack'); setMobileMenuOpen(false); }}>Why Claude</button>
              <button onClick={() => { scrollToSection('pricing'); setMobileMenuOpen(false); }}>Pricing</button>
              <button onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }}>About</button>
              <button onClick={() => { onOpenCompliance('safety'); setMobileMenuOpen(false); }}>Trust & Safety</button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
