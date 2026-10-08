import React from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection({ onSelectPlan, activePlan = 'free' }) {
  const tiers = [
    { id: 'free', name: 'Demo Explorer', price: 'Free', period: 'prototype', description: 'Try the sample workflow available today.', highlight: false, features: ['Eight sample trend cards', 'Filter by topic and platform', 'Template-based creative briefs', 'Browser-local idea board', 'No account or checkout'], ctaText: 'Explore Demo', ctaStyle: 'btn-outline' },
    { id: 'pro', name: 'Creator Tools', price: 'Planned', period: 'not available', description: 'Possible future tools for individual creators.', highlight: true, badge: 'IN DEVELOPMENT', features: ['Verified source feeds are planned', 'Claude-powered briefs are planned', 'No release date or price set', 'No paid subscription available'], ctaText: 'Coming Soon', ctaStyle: 'btn-lime' },
    { id: 'enterprise', name: 'Team Workflows', price: 'Planned', period: 'not available', description: 'Possible future collaboration features.', highlight: false, features: ['Shared workspaces are under consideration', 'Source connectors need validation', 'No team seats or SLA available', 'No enterprise service offered'], ctaText: 'Coming Soon', ctaStyle: 'btn-brand' }
  ];

  return (
    <section id="pricing" className="py-20 border-t-2" style={{ borderColor: '#DDD9FF', background: '#F6F5FF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label mb-3 inline-block">Current Demo & Future Plans</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
            Try the Prototype. Follow the Roadmap.
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: '#7A788F' }}>
            The demo is free to explore. Paid plans, live integrations, and team features are not available; no payment is collected.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative ${
                tier.highlight
                  ? 'border-4 shadow-xl -translate-y-2'
                  : 'card border-2'
              }`}
              style={{
                borderColor: tier.highlight ? '#4B35E8' : '#DDD9FF',
                background: '#FFFFFF',
              }}
            >
              {tier.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase"
                  style={{ background: '#C5FF00', color: '#12112A', boxShadow: '0 4px 12px rgba(197,255,0,0.5)' }}>
                  {tier.badge}
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>{tier.name}</h3>
                  <p className="text-xs mt-1 leading-relaxed" style={{ color: '#7A788F' }}>{tier.description}</p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black" style={{ color: '#12112A' }}>{tier.price}</span>
                  <span className="text-sm font-semibold" style={{ color: '#7A788F' }}>{tier.period}</span>
                </div>

                <div className="pt-4 border-t-2 space-y-3" style={{ borderColor: '#EEF0FF' }}>
                  {tier.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs font-semibold" style={{ color: '#3D3B5C' }}>
                      <Check className="w-4 h-4 text-brand shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8 mt-6 border-t-2" style={{ borderColor: '#EEF0FF' }}>
                <button
                  onClick={() => { if (tier.id === 'free') document.getElementById('feed-section')?.scrollIntoView({ behavior: 'smooth' }); }}
                  disabled={tier.id !== 'free'}
                  className={`w-full justify-center text-sm !py-3 ${tier.ctaStyle}`}
                >
                  <span>{tier.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
