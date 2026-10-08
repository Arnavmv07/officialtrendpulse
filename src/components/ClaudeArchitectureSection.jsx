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
            <span>AI-NATIVE ARCHITECTURE · BUILT ON ANTHROPIC CLAUDE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
            Why We Build Exclusively on Claude
          </h2>

          <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: '#7A788F' }}>
            Content creators don't need generic AI summaries. They need psychological retention hooks, deep cultural context, and contrarian angles that survive aggressive social algorithms.
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
                Claude 3.7 Sonnet: Deep Creative Reasoning
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                Sonnet handles the complex cognitive lift: dissecting 2,000+ Reddit arguments or viral X discourse and distilling the exact unspoken tension that creators can use as an opening hook.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#4B35E8' }}>
              ✓ Retention outline generation & title testing
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
                Claude 3.5 Haiku: Real-Time Stream Scoring
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                Sub-100ms inference enables our crawlers to process thousands of incoming posts per minute, classifying topics, calculating velocity spikes, and filtering out synthetic bot noise at ultra-low latency.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#12112A' }}>
              ✓ High-throughput semantic deduplication
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
                Model Context Protocol (MCP) Connectors
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                We implement Anthropic’s open standard MCP architecture, allowing creator agents to connect directly into live YouTube RSS, Reddit API, and community discords through standardized tool calls.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t-2 text-xs font-mono font-bold"
              style={{ borderColor: '#DDD9FF', color: '#4B35E8' }}>
              ✓ Native agentic tool use & multi-source ingestion
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
                  Enterprise Safety & Zero-Retention SLA
                </span>
              </div>
              <h3 className="text-2xl font-extrabold" style={{ color: '#12112A' }}>
                Built in Alignment with Anthropic Commercial Terms
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#3D3B5C' }}>
                Unlike legacy AI tools that train on creator inputs, TrendPulse operates on Anthropic’s first-party commercial API. Customer video scripts, proprietary channel ideas, and drafts are never used to train public models.
              </p>
              
              <div className="space-y-2 pt-2">
                {[
                  'Zero data retention for creator script drafts and private notes',
                  '100% intellectual property ownership assigned directly to the creator',
                  'Rigorous guardrails against misinformation and unauthorized likeness generation',
                  'Compliant with Anthropic Supportability and Commercial Policies'
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
                  anthropic-agent.config.ts
                </span>
                <span className="text-[10px] text-slate-400">Claude 3.7 Sonnet</span>
              </div>
              <pre className="overflow-x-auto text-[11px] leading-relaxed text-slate-300">
{`const creatorStrategyAgent = new AnthropicAgent({
  model: "claude-3-7-sonnet-20250219",
  temperature: 0.35,
  systemPrompt: \`You are an elite video strategist.
  Deconstruct the emerging social tension.
  Identify:
  1. The 3-second pattern interrupt hook
  2. The cognitive dissonance title
  3. The 5-beat retention curve\`,
  mcpServers: [redditConnector, youtubeTrendsMcp]
});`}
              </pre>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
