import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import StatsBanner from './components/StatsBanner';
import FilterBar from './components/FilterBar';
import TrendGrid from './components/TrendGrid';
import IdeaGeneratorModal from './components/IdeaGeneratorModal';
import CreatorBacklog from './components/CreatorBacklog';
import ClaudeArchitectureSection from './components/ClaudeArchitectureSection';
import PricingSection from './components/PricingSection';
import CompanySection from './components/CompanySection';
import ComplianceModal from './components/ComplianceModal';
import ContactModal from './components/ContactModal';
import {
  fetchTrends, refreshCrawlers,
  fetchSavedIdeas, saveIdeaToBacklog,
  updateSavedIdeaStatus, deleteSavedIdea,
} from './services/api';
import confetti from 'canvas-confetti';
import { Sparkles, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [trends, setTrends] = useState([]);
  const [crawlerStatus, setCrawlerStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [modalTrend, setModalTrend] = useState(null);
  const [toast, setToast] = useState(null);
  
  // Modals for Claude for Startups compliance & contact
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState('privacy');
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const feedRef = useRef(null);

  const [filters, setFilters] = useState({
    genre: 'all', platform: 'all', status: 'all', search: '',
  });

  useEffect(() => { loadTrends(); }, [filters]);
  useEffect(() => { loadSaved(); }, []);

  const loadTrends = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTrends(filters);
      if (data.success) { setTrends(data.data || []); setCrawlerStatus(data.crawler); }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  const loadSaved = async () => {
    try {
      const data = await fetchSavedIdeas();
      if (data.success) setSavedIdeas(data.ideas || []);
    } catch (e) {}
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    showToast('📡 Syncing trends across YouTube, X, Instagram & Reddit...');
    try {
      await refreshCrawlers();
      await loadTrends();
      showToast('✓ All 4 platforms refreshed with latest social signals!');
    } catch { showToast('⚠️ Serving cached intelligence stream.'); }
    finally { setIsRefreshing(false); }
  };

  const handleQuickSave = async (trend) => {
    const already = savedIdeas.some(i => i.topic === trend.title);
    if (already) { showToast('Already in your Creator Studio'); return; }
    try {
      const res = await saveIdeaToBacklog({
        topic: trend.title, genre: trend.genre,
        targetPlatform: trend.platform,
        titleVariant: trend.title,
        hookText: trend.sampleHook || `Wait—look at what just happened with ${trend.title}`,
        notes: `${trend.platform.toUpperCase()} · ${trend.community || ''} · Score ${trend.metrics?.velocityScore || 80}`,
        viralScore: trend.metrics?.velocityScore || 85,
      });
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('✓ Saved to Creator Studio!');
        try { confetti({ particleCount: 40, spread: 55, origin: { y: 0.75 } }); } catch {}
      }
    } catch (e) { console.error(e); }
  };

  const handleSaveFromModal = async (payload) => {
    try {
      const res = await saveIdeaToBacklog(payload);
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('✓ Video concept saved to Creator Studio!');
      }
    } catch (e) {}
  };

  const handleUpdateStatus = async (id, status) => {
    try {
      await updateSavedIdeaStatus(id, status);
      setSavedIdeas(p => p.map(i => i.id === id ? { ...i, status } : i));
      showToast(`Moved to ${status}`);
    } catch {}
  };

  const handleDelete = async (id) => {
    try {
      await deleteSavedIdea(id);
      setSavedIdeas(p => p.filter(i => i.id !== id));
      showToast('Removed from backlog');
    } catch {}
  };

  const handleAddCustom = async (payload) => {
    try {
      const res = await saveIdeaToBacklog(payload);
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('✓ Custom concept added!');
      }
    } catch {}
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  const scrollToFeed = () => {
    feedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const pickPlatform = (platform) => {
    setFilters(p => ({ ...p, platform }));
    feedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const openComplianceWithTab = (tab) => {
    setComplianceTab(tab);
    setComplianceModalOpen(true);
  };

  const savedIds = new Set([
    ...savedIdeas.map(i => i.topic),
    ...savedIdeas.map(i => i.id),
  ]);

  return (
    <div className="min-h-screen" style={{ background: '#F6F5FF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

      {/* Floating Toast notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 toast-enter">
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border-2 text-sm font-semibold"
            style={{
              background: '#fff', borderColor: '#DDD9FF', color: '#12112A',
              boxShadow: '0 8px 40px rgba(75,53,232,0.18)',
            }}>
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: '#4B35E8' }} />
            {toast}
          </div>
        </div>
      )}

      {/* Primary Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        crawlerStatus={crawlerStatus}
        savedCount={savedIdeas.length}
        onOpenContact={() => setContactModalOpen(true)}
        onOpenCompliance={openComplianceWithTab}
      />

      {activeTab === 'feed' ? (
        <>
          {/* Hero Section */}
          <HeroSection
            trendCount={trends.length}
            onScrollToFeed={scrollToFeed}
            onPickPlatform={pickPlatform}
            onOpenContact={() => setContactModalOpen(true)}
          />

          {/* Section Divider */}
          <div style={{ height: '2px', background: 'linear-gradient(to right, #EEF0FF, #DDD9FF, #EEF0FF)' }} />

          {/* Live Trend Radar & Strategy Section */}
          <section ref={feedRef} id="feed-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="section-label mb-2.5 inline-block">Interactive Product Demo</span>
                <h2 className="text-3xl font-extrabold text-ink">
                  Surging Trend Radar & Concept Workshop
                </h2>
                <p className="text-sm mt-1 text-ink-3">
                  {trends.length} opportunities detected in real time · Click{' '}
                  <strong style={{ color: '#4B35E8' }}>Generate Strategy</strong> to test Claude 3.7 reasoning briefs
                </p>
              </div>

              <div className="text-xs font-semibold px-3.5 py-1.5 rounded-full border-2 text-brand bg-white"
                style={{ borderColor: '#DDD9FF' }}>
                ⚡ Live Social Signals Synced
              </div>
            </div>

            {/* Stats Banner */}
            <StatsBanner trends={trends} />

            {/* Filter Controls */}
            <FilterBar filters={filters} setFilters={setFilters} />

            {/* Cards Grid */}
            <TrendGrid
              trends={trends}
              isLoading={isLoading}
              onGenerateStrategy={setModalTrend}
              onQuickSave={handleQuickSave}
              savedIds={savedIds}
              onResetFilters={() => setFilters({ genre: 'all', platform: 'all', status: 'all', search: '' })}
            />
          </section>

          {/* Dedicated Claude Architecture Section */}
          <ClaudeArchitectureSection />

          {/* Transparent SaaS Pricing Section */}
          <PricingSection onOpenContact={() => setContactModalOpen(true)} />

          {/* About Company & Principles Section */}
          <CompanySection />
        </>
      ) : (
        /* Creator Studio Kanban Tab */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CreatorBacklog
            savedIdeas={savedIdeas}
            onUpdateStatus={handleUpdateStatus}
            onDeleteIdea={handleDelete}
            onAddNewIdea={handleAddCustom}
            onSwitchToFeed={() => setActiveTab('feed')}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="border-t-2 mt-16 bg-white" style={{ borderColor: '#DDD9FF' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
            
            {/* Col 1: Brand & Identity */}
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs"
                  style={{ background: '#4B35E8', color: '#C5FF00' }}>
                  TP
                </div>
                <span className="font-extrabold text-base text-ink">TrendPulse AI</span>
              </div>
              <p className="text-xs text-ink-3 leading-relaxed">
                TrendPulse Technologies Inc.<br />
                San Francisco, CA<br />
                Founded in 2025. Built on Anthropic Claude.
              </p>
              <div className="pt-1">
                <a 
                  href="mailto:founders@trendpulse.ai" 
                  className="text-xs font-mono font-bold text-brand hover:underline flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  founders@trendpulse.ai
                </a>
              </div>
            </div>

            {/* Col 2: Platform Links */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Product</h4>
              <ul className="space-y-1.5 text-ink-3">
                <li><button onClick={() => { setActiveTab('feed'); scrollToFeed(); }} className="hover:text-brand">Live Trend Radar</button></li>
                <li><button onClick={() => setActiveTab('studio')} className="hover:text-brand">Creator Studio Kanban</button></li>
                <li><a href="#claude-stack" className="hover:text-brand">Claude 3.7 Reasoning Engine</a></li>
                <li><a href="#pricing" className="hover:text-brand">Creator Pro Plans</a></li>
              </ul>
            </div>

            {/* Col 3: Company */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Company</h4>
              <ul className="space-y-1.5 text-ink-3">
                <li><a href="#about" className="hover:text-brand">About Us</a></li>
                <li><button onClick={() => setContactModalOpen(true)} className="hover:text-brand">Request Pilot / Contact</button></li>
                <li><span className="text-brand font-semibold">Claude for Startups Applicant</span></li>
              </ul>
            </div>

            {/* Col 4: Trust, Safety & Compliance */}
            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-ink uppercase tracking-wider text-[11px]">Trust & Compliance</h4>
              <ul className="space-y-1.5 text-ink-3">
                <li><button onClick={() => openComplianceWithTab('privacy')} className="hover:text-brand">Privacy Policy (Zero Model Training)</button></li>
                <li><button onClick={() => openComplianceWithTab('terms')} className="hover:text-brand">Terms of Commercial Service</button></li>
                <li><button onClick={() => openComplianceWithTab('safety')} className="hover:text-brand">Responsible AI & Safety Policy</button></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-3"
            style={{ borderColor: '#EEF0FF' }}>
            <div className="flex items-center gap-2">
              <span>© {new Date().getFullYear()} TrendPulse Technologies Inc. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="live-dot" style={{ width: 6, height: 6 }}></span>
              <span>Autonomous Social Crawlers: YouTube · X · Instagram · Reddit</span>
            </div>
          </div>

        </div>
      </footer>

      {/* AI Strategy Generation Modal */}
      <IdeaGeneratorModal
        trend={modalTrend}
        isOpen={!!modalTrend}
        onClose={() => setModalTrend(null)}
        onSaveToBacklog={handleSaveFromModal}
        isSaved={modalTrend ? (savedIds.has(modalTrend.id) || savedIds.has(modalTrend.title)) : false}
      />

      {/* Trust & Compliance Modal (Privacy, Terms, Safety) */}
      <ComplianceModal
        isOpen={complianceModalOpen}
        onClose={() => setComplianceModalOpen(false)}
        defaultTab={complianceTab}
      />

      {/* Contact & Pilot Request Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />

    </div>
  );
}
