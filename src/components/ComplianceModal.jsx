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
              <h2 className="text-xl font-extrabold text-ink">Prototype Information</h2>
              <p className="text-xs text-ink-3">TrendPulse · Arnav Ramesh · October 2026</p>
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
            { id: 'terms', label: 'Demo Terms', icon: FileText },
            { id: 'safety', label: 'Responsible Use', icon: ShieldCheck }
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
          
          {activeTab === 'privacy' && <div className="space-y-4">
            <h3 className="text-base font-extrabold text-ink">Browser-local data</h3>
            <p>The current static demo stores saved ideas in this browser's local storage. There is no user account, cloud synchronization, or active Claude API processing. Delete ideas from the board or clear this site's browser data to remove local entries.</p>
            <p>The site loads fonts and sample images from external services. Hosting and those services may receive ordinary request metadata. This is not a zero-retention or confidentiality guarantee. Avoid entering sensitive information.</p>
            <p>Contact opens your email app. No inquiry is sent by this website. The founders@officialtrendpulse.in mailbox is being set up; delivery is not yet confirmed.</p>
          </div>}
          {activeTab === 'terms' && <div className="space-y-4">
            <h3 className="text-base font-extrabold text-ink">Prototype, provided for exploration</h3>
            <p>TrendPulse is an early project by Arnav Ramesh, based in Pune, India, started October 2026. Cards, metrics, example names, and strategy scores are illustrative, not verified live facts or performance predictions.</p>
            <p>No paid plan, checkout, uptime commitment, enterprise service, or SLA is available. Review sample ideas for accuracy, originality, and third-party rights before use. No copyright or commercial-result guarantee is offered.</p>
          </div>}
          {activeTab === 'safety' && <div className="space-y-4">
            <h3 className="text-base font-extrabold text-ink">Review before publishing</h3>
            <p>Example briefs are generated from local templates, not a live AI model. The demo does not include automated moderation, factual verification, or proven safeguards. Do not use it for impersonation, harassment, or misleading claims.</p>
            <p>Live sources, Claude integration, and production controls remain development goals. Their capabilities and data handling will need testing and updated documentation before launch.</p>
          </div>}

        </div>

        {/* Footer */}
        <div className="p-4 border-t-2 bg-surface flex justify-end" style={{ borderColor: '#EEF0FF' }}>
          <button onClick={onClose} className="btn-brand text-xs">
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
