import React from 'react';
import { Check, Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';

export default function PricingSection({ onOpenContact }) {
  const tiers = [
    {
      name: 'Free Explorer',
      price: '$0',
      period: 'forever',
      description: 'Ideal for independent creators testing the waters of trend-driven content.',
      highlight: false,
      features: [
        'Live trend radar (YouTube, X, Instagram, Reddit)',
        'Up to 5 Claude video strategy briefs per day',
        'Basic velocity stage categorization',
        'Creator Studio Kanban backlog (up to 15 ideas)',
        'Community support'
      ],
      ctaText: 'Get Started Free',
      ctaStyle: 'btn-outline'
    },
    {
      name: 'Creator Pro',
      price: '$29',
      period: '/ month',
      description: 'For full-time creators and YouTubers who need unfair algorithmic advantages.',
      highlight: true,
      badge: 'MOST POPULAR',
      features: [
        'Everything in Free',
        'Unlimited Claude 3.7 Sonnet deep reasoning briefs',
        '3-second hook generator (spoken + visual camera direction)',
        'High-CTR thumbnail concept & color composition prompt',
        '5-beat full script blueprint generation',
        'Instant Markdown export & clipboard sync',
        'Priority crawler syncs every 5 minutes'
      ],
      ctaText: 'Start 14-Day Free Trial',
      ctaStyle: 'btn-lime'
    },
    {
      name: 'Studio & Agency',
      price: '$99',
      period: '/ month',
      description: 'For media production houses, talent agencies, and high-frequency content teams.',
      highlight: false,
      features: [
        'Everything in Creator Pro',
        'Up to 5 team member seats included',
        'Model Context Protocol (MCP) custom scraper connections',
        'White-label script briefs for clients',
        'Dedicated Claude API rate limits & zero data retention SLA',
        'Dedicated onboarding & creator strategist support'
      ],
      ctaText: 'Contact Enterprise Sales',
      ctaStyle: 'btn-brand'
    }
  ];

  return (
    <section id="pricing" className="py-20 border-t-2" style={{ borderColor: '#DDD9FF', background: '#F6F5FF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="section-label mb-3 inline-block">Transparent Pricing</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
            Built for Solo Creators and Media Companies Alike
          </h2>
          <p className="mt-3 text-base sm:text-lg leading-relaxed" style={{ color: '#7A788F' }}>
            Predict what goes viral next. Monetize your channel with Claude-engineered video angles before the competition catches on.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-3xl p-7 flex flex-col justify-between transition-all relative ${
                tier.highlight
                  ? 'border-4 shadow-xl -translate-y-2'
                  : 'card border-2'
              }`}
              style={{
                borderColor: tier.highlight ? '#4B35E8' : '#DDD9FF',
                background: tier.highlight ? '#FFFFFF' : '#FFFFFF',
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
                  onClick={onOpenContact}
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
