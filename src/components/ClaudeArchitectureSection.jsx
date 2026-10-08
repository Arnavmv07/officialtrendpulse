import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Zap, 
  ShieldCheck, 
  Layers, 
  Terminal, 
  CheckCircle2, 
  Code2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export default function ClaudeArchitectureSection() {
  const [activeTab, setActiveTab] = useState('sonnet');

  return (
    <section id="claude-stack" className="py-20 border-t-2" style={{ borderColor: '#DDD9FF', background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold mb-4"
            style={{ background: '#EEF0FF', color: '#4B35E8', border: '1.5px solid #DDD9FF' }}>
            <Sparkles className="w-3.5 h-3.5 text-brand" />
            <span>DEVELOPMENT ROADMAP · NOT LIVE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
            What Works Today, What Comes Next
          </h2>

          <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: '#7A788F' }}>
            The current prototype uses sample data and local templates. The features below describe the roadmap, not services currently available.
          </p>
        </div>

        {/* 3 Pillars of TrendPulse AI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          
          {/* Pillar 1: Claude 3.7 / 3.5 Sonnet */}
          <div className="rounded-3xl p-6 border-2 transition-all hover:shadow-card-hover flex flex-col justify-between"
            style={{ background: '#F6F5FF', borderColor: '#DDD9FF' }}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: '#4B35E8', color: '#C5FF00' }}>
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>
                Planned: Claude-Powered Briefs
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                A future server-side integration could use Claude to help turn verified source material into creative briefs. No Claude API calls are active in this demo.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#4B35E8' }}>
              Planned · Requires integration and testing
            </div>
          </div>

          {/* Pillar 2: Claude 3.5 Haiku */}
          <div className="rounded-3xl p-6 border-2 transition-all hover:shadow-card-hover flex flex-col justify-between"
            style={{ background: '#F6F5FF', borderColor: '#DDD9FF' }}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: '#12112A', color: '#C5FF00' }}>
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>
                Planned: Verified Trend Feeds
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                Live sources need authorized access, timestamps, source links, and measured scoring. Current cards and metrics are illustrative sample data.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#12112A' }}>
              Planned · No live scoring yet
            </div>
          </div>

          {/* Pillar 3: Model Context Protocol (MCP) */}
          <div className="rounded-3xl p-6 border-2 transition-all hover:shadow-card-hover flex flex-col justify-between"
            style={{ background: '#F6F5FF', borderColor: '#DDD9FF' }}>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg"
                style={{ background: '#C5FF00', color: '#12112A' }}>
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>
                Exploring: Source Connectors
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                Source connectors, including possible MCP support, are under consideration. No deployed MCP integration is available today.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#4B35E8' }}>
              Under consideration · Not implemented
            </div>
          </div>

        </div>

        {/* Live Architecture Comparison & System Prompt Preview */}
        <div className="card rounded-3xl p-6 sm:p-8 border-2" style={{ borderColor: '#DDD9FF' }}>
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            
            <div className="space-y-4 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#22c55e' }}></span>
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: '#7A788F' }}>
                  CURRENT DEMO LIMITATIONS
                </span>
              </div>
              <h3 className="text-2xl font-extrabold" style={{ color: '#12112A' }}>
                A Prototype, Not a Production Service
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                This static demo provides local templates and a browser-local idea board. It has no paid checkout, user authentication, live Claude processing, or service-level agreement.
              </p>
              
              <div className="space-y-2 pt-2">
                {[
                  'Saved ideas remain in local storage in this browser',
                  'Review example outputs for accuracy and rights before use',
                  'Do not enter sensitive drafts or personal information',
                  'Live integrations require separate testing before launch'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold" style={{ color: '#12112A' }}>
                    <CheckCircle2 className="w-4 h-4 text-brand shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code / Architecture Callout */}
            <div className="w-full lg:max-w-md rounded-2xl p-5 text-xs font-mono space-y-3"
              style={{ background: '#12112A', color: '#EEF0FF' }}>
              <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                <span className="flex items-center gap-1.5 text-lime font-bold">
                  <Terminal className="w-3.5 h-3.5" />
                  demo-workflow.txt
                </span>
                <span className="text-[10px] text-slate-400">Current demo</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`Current demo:
  Sample trend cards
  Local template briefs
  Browser-local idea board

Planned, not active:
  Verified source feeds
  Server-side Claude integration
  Tested production controls`}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
