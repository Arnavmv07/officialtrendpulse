import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import RealTrendFeed from './components/RealTrendFeed';
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
  updateSavedIdeaStatus, deleteSavedIdea, editSavedIdea, restoreSavedIdea,
} from './services/api';
import confetti from 'canvas-confetti';
import { Sparkles, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState(window.location.hash === '#studio' ? 'studio' : 'feed');
  const [trends, setTrends] = useState([]);
  const [crawlerStatus, setCrawlerStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [savedIdeas, setSavedIdeas] = useState([]);
  const [modalTrend, setModalTrend] = useState(null);
  const [toast, setToast] = useState(null);
  const [deletedIdea,setDeletedIdea]=useState(null);

  // Active Plan state (Free Explorer vs Creator Pro)
  const [currentPlan, setCurrentPlan] = useState('free');

  // Modals
  const [complianceModalOpen, setComplianceModalOpen] = useState(false);
  const [complianceTab, setComplianceTab] = useState('privacy');
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [contactModalRole, setContactModalRole] = useState('Creator / Founder');
  const [trialModalOpen, setTrialModalOpen] = useState(false);

  const feedRef = useRef(null);

  const [filters, setFilters] = useState({
    genre: 'all', platform: 'all', status: 'all', search: '',
  });

  useEffect(() => {
    loadTrends();

  }, [filters]);

  useEffect(() => {
    loadSaved();
    const route = () => { setActiveTab(window.location.hash === "#studio" ? "studio" : "feed"); setTimeout(() => document.getElementById(window.location.hash.slice(1) || "top")?.scrollIntoView({block:"start"}), 150); };
    window.addEventListener("hashchange", route);
    route();
    return () => window.removeEventListener("hashchange", route);
  }, []);

  const checkStoredProProfile = () => {
    try {
      const stored = localStorage.getItem('trendpulse_pro_profile');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (new Date(parsed.expiresAt) > new Date()) {
          setCurrentPlan('pro');
        }
      }
    } catch {}
  };

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
    showToast('Reloading sample cards...');
    try {
      await refreshCrawlers();
      await loadTrends();
      showToast('Sample cards reloaded. No live data was fetched.');
    } catch { showToast('Sample data is currently unavailable.'); }
    finally { setIsRefreshing(false); }
  };

  const handleQuickSave = async (trend) => {
    const already = savedIdeas.some(i => i.topic === trend.title);
    if (already) { showToast('Already in your Idea board'); return; }
    try {
      const res = await saveIdeaToBacklog({
        topic: trend.title, genre: trend.genre,
        targetPlatform: trend.platform,
        titleVariant: trend.title,
        hookText: trend.sampleHook || `Wait, look at what just happened with ${trend.title}`,
        notes: trend.isRealTopic ? trend.summary : trend.summary || '', sourceUrl: trend.sourceUrl || null,
        viralScore: null, contextDate:trend.publishedAt||trend.fetchedAt||null, searchVolume:trend.approximateTraffic||null, headline:trend.articles?.[0]?.title||null, sourcePublisher:trend.articles?.[0]?.publisher||null,
      });
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('✓ Saved to Idea board!');
        try { confetti({ particleCount: 40, spread: 55, origin: { y: 0.75 } }); } catch {}
      }
    } catch (e) { console.error(e); }
  };

  const handleSaveFromModal = async (payload) => {
    try {
      const res = await saveIdeaToBacklog(payload);
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('✓ Video concept saved to Idea board!');
      }
      return true;
    } catch (e) { showToast('Could not save your idea. Please try again.'); return false; }
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
      const removed=savedIdeas.find(i=>i.id===id);
      await deleteSavedIdea(id);
      setDeletedIdea(removed);
      setSavedIdeas(p => p.filter(i => i.id !== id));
      showToast('Idea deleted. Undo is available below.');
    } catch {}
  };

  const handleAddCustom = async (payload) => {
    try {
      const res = await saveIdeaToBacklog(payload);
      if (res.success) {
        setSavedIdeas(p => [res.idea, ...p]);
        showToast('Idea added.');
      }
      return true;
    } catch {showToast('Could not save idea.');return false;}
  };
  const handleEditIdea=async(id,patch)=>{try{await editSavedIdea(id,patch);setSavedIdeas(p=>p.map(i=>i.id===id?{...i,...patch}:i));showToast('Hook saved.');return true;}catch{showToast('Could not save hook.');return false;}};
  const undoDelete=async()=>{try{await restoreSavedIdea(deletedIdea);setSavedIdeas(p=>p.some(i=>i.id===deletedIdea.id)?p:[deletedIdea,...p]);setDeletedIdea(null);showToast('Idea restored.');}catch{showToast('Could not restore idea.');}};

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

      {deletedIdea&&<div role="status" className="fixed bottom-4 left-4 right-4 sm:right-auto z-[60] bg-white border border-line rounded-xl shadow-xl p-4 flex gap-4 items-center text-sm"><span>Idea deleted</span><button className="text-brand font-bold" onClick={undoDelete}>Undo</button><button aria-label="Dismiss undo" onClick={()=>setDeletedIdea(null)}>Dismiss</button></div>}
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
        activePlan={currentPlan}
        onOpenContact={() => {
          setContactModalRole('Creator / Founder');
          setContactModalOpen(true);
        }}
        onOpenCompliance={openComplianceWithTab}
      />

      {activeTab === 'feed' ? (
        <>
          {/* Hero Section */}
          <HeroSection
            trendCount={trends.length}
            onScrollToFeed={scrollToFeed}
            onPickPlatform={pickPlatform}
            onOpenTrial={() => setContactModalOpen(true)}
            onOpenContact={() => {
              setContactModalRole('Creator / Founder');
              setContactModalOpen(true);
            }}
          />

          <RealTrendFeed onMakeBrief={setModalTrend} onSave={handleQuickSave} savedIds={savedIds} />


          {/* Section Divider */}
          <div style={{ height: '2px', background: 'linear-gradient(to right, #EEF0FF, #DDD9FF, #EEF0FF)' }} />

          {/* Sample Trend Radar & Strategy Section */}
          <section ref={feedRef} id="feed-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <span className="section-label mb-2.5 inline-block">Try the workflow</span>
                <h2 className="text-3xl font-extrabold text-ink">
                  Pick a topic. Make a plan.
                </h2>
                <p className="text-sm mt-2 text-ink-3">Eight India-focused examples to explore briefs and a browser-local idea board. These are editorial examples, not live platform data.</p>
              </div>

              <button className="btn-outline text-xs" onClick={handleRefresh} disabled={isRefreshing}>{isRefreshing?'Reloading...':'Reload examples'}</button>
            </div>

            {/* Stats Banner */}
            

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

          <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 py-14"><h2 className="text-3xl font-extrabold text-ink mb-6">How it works</h2><div className="grid md:grid-cols-3 gap-5">{[['01','Find a topic','Explore search activity and read the linked headlines.'],['02','Shape your angle','Use a template brief to plan your hook, outline and format.'],['03','Save your idea','Keep an Idea board in this browser. No sign-in or account creation is available on this feedback preview.']].map(([n,t,d])=><article key={n} className="card p-6"><span className="text-brand font-black">{n}</span><h3 className="font-bold mt-3">{t}</h3><p className="text-sm text-ink-3 mt-2">{d}</p></article>)}</div></section>

          {/* Roadmap */}
          <ClaudeArchitectureSection />

          {/* Transparent SaaS Pricing Section */}
          <PricingSection
            activePlan={currentPlan}

          />

          {/* About Company & Principles Section */}
          <CompanySection />
        </>
      ) : (
        /* Idea board Kanban Tab */
        <div id="studio" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <CreatorBacklog
            savedIdeas={savedIdeas}
            onUpdateStatus={handleUpdateStatus}
            onDeleteIdea={handleDelete}
            onAddNewIdea={handleAddCustom}
            onEditIdea={handleEditIdea}
            onSwitchToFeed={() => {window.location.hash='real-feed';setActiveTab('feed');}}
          />
        </div>
      )}

      <footer className="bg-white border-t border-line mt-10"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-wrap justify-between gap-6"><div><p className="font-extrabold text-lg text-ink">TrendPulse</p><p className="text-xs text-ink-3 mt-2">Find your next video idea. Built in Pune, India.</p><a className="text-xs text-brand mt-3 block" href="mailto:founders@officialtrendpulse.in">founders@officialtrendpulse.in</a></div><nav aria-label="Footer" className="flex flex-wrap gap-5 text-xs text-ink-2"><a href="/#real-feed">Today's trends</a><a href="/#about">About</a><a href="/privacy.html">Privacy</a><a href="/terms.html">Terms</a><a href="/responsible-use.html">Responsible use</a></nav><p className="text-xs text-ink-3 w-full">Copyright 2026 TrendPulse.</p></div></footer>

      {/* AI Strategy Generation Modal */}
      <IdeaGeneratorModal
        trend={modalTrend}
        isOpen={!!modalTrend}
        onClose={() => setModalTrend(null)}
        onSaveToBacklog={handleSaveFromModal}
        isSaved={modalTrend ? (savedIds.has(modalTrend.id) || savedIds.has(modalTrend.title)) : false}
      />

      {/* Demo Information Modal (Privacy, Terms, Safety) */}
      <ComplianceModal
        isOpen={complianceModalOpen}
        onClose={() => setComplianceModalOpen(false)}
        defaultTab={complianceTab}
      />

      {/* Contact & Pilot Request Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        initialRole={contactModalRole}
        onClose={() => setContactModalOpen(false)}
      />


    </div>
  );
}
