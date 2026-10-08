import React, { useState } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2 } from 'lucide-react';

export default function ComplianceModal({ isOpen, onClose, defaultTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(18,17,42,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden my-auto max-h-[88vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b-2" style={{ borderColor: '#EEF0FF' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#EEF0FF' }}>
              <ShieldCheck className="w-5 h-5 text-brand" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-ink">Trust, Compliance & Legal</h2>
              <p className="text-xs text-ink-3">TrendPulse Technologies Inc. · Last Updated: 2026</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface text-ink-3 hover:text-ink cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b-2 px-6 bg-surface text-xs font-bold" style={{ borderColor: '#EEF0FF' }}>
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Commercial Service', icon: FileText },
            { id: 'safety', label: 'Responsible AI & Safety Policy', icon: ShieldCheck }
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-3.5 px-4 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                  active ? 'border-brand text-brand font-extrabold' : 'border-transparent text-ink-3 hover:text-ink'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Policy Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-ink-2 text-xs leading-relaxed">
          
          {activeTab === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-ink">1. Zero Model Training & Data Isolation</h3>
              <p>
                TrendPulse Technologies Inc. ("TrendPulse", "we", "our") does not use, sell, or license any customer video concepts, script drafts, channel performance notes, or user input data to train public foundation models or third-party AI systems.
              </p>
              
              <h3 className="text-base font-extrabold text-ink">2. First-Party Anthropic API Processing</h3>
              <p>
                All generative content suggestions and semantic analysis requests are transmitted via encrypted first-party Anthropic Claude API endpoints governed by Anthropic’s Commercial Terms of Service. Under these terms, prompts and completions are retained strictly for operational debugging (or zero-retention where enabled) and are never used to train Anthropic’s models.
              </p>

              <h3 className="text-base font-extrabold text-ink">3. Data Collected & Purpose</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Public Social Signals:</strong> Aggregated public trend statistics (e.g. YouTube views, Reddit thread metrics, public X hashtags) solely to compute algorithmic velocity.</li>
                <li><strong>Account Credentials:</strong> Basic contact and email addresses used for authentication, account management, and customer support.</li>
              </ul>

              <h3 className="text-base font-extrabold text-ink">4. Data Deletion Rights</h3>
              <p>
                Users may export or delete their entire saved concept backlog at any time through the Creator Studio settings or by emailing <code>privacy@trendpulse.ai</code>.
              </p>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-ink">1. Intellectual Property & Ownership</h3>
              <p>
                You ("Creator", "User") retain 100% full legal title, intellectual property, and copyright over all video titles, script outlines, video concepts, and marketing collateral generated through TrendPulse. TrendPulse claims no royalty, license, or ownership interest in any content published by you.
              </p>

              <h3 className="text-base font-extrabold text-ink">2. Commercial Use Permitted</h3>
              <p>
                All output generated on both Free and Paid subscriptions is authorized for commercial exploitation, including monetized YouTube videos, sponsored Instagram reels, TikTok campaigns, and brand partnerships.
              </p>

              <h3 className="text-base font-extrabold text-ink">3. Service Uptime & Rate Limits</h3>
              <p>
                TrendPulse utilizes multi-platform crawler redundancy and enterprise Claude API allocations to provide 99.9% application availability.
              </p>
            </div>
          )}

          {activeTab === 'safety' && (
            <div className="space-y-4">
              <h3 className="text-base font-extrabold text-ink">Anthropic Supportability Policy Alignment</h3>
              <p>
                TrendPulse operates in strict compliance with Anthropic’s Acceptable Use and Supportability Policies. Our generative agents incorporate automated guardrails to reject prompt instructions that attempt to create:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Misinformation or coordinated social manipulation campaigns</li>
                <li>Hate speech, harassment, or targeted defamatory attacks</li>
                <li>Unauthorized deepfakes, synthetic impersonation, or voice theft</li>
                <li>Malicious software or exploitation of third-party platforms</li>
              </ul>

              <div className="p-4 rounded-2xl bg-surface border-2 mt-4" style={{ borderColor: '#DDD9FF' }}>
                <div className="flex items-center gap-2 font-bold text-ink text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-brand" />
                  <span>Verified Safe Content Standard</span>
                </div>
                <p className="text-[11px] text-ink-3">
                  All creative angles produced by TrendPulse emphasize constructive analysis, education, cultural discourse, and transparent storytelling.
                </p>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 bg-surface flex justify-end" style={{ borderColor: '#EEF0FF' }}>
          <button onClick={onClose} className="btn-brand text-xs">
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
}
