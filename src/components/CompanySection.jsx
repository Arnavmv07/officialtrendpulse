import React from 'react';
import { Target, HeartHandshake, Sparkles, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';

export default function CompanySection() {
  return (
    <section id="about" className="py-20 border-t-2" style={{ borderColor: '#DDD9FF', background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Mission & Details */}
          <div className="space-y-6">
            <span className="section-label">About the Company</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
              Building the Operating System for the Next Generation of Creators
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#3D3B5C' }}>
              <strong>TrendPulse Technologies Inc.</strong> was founded in <strong>2025</strong> by a team of builders, engineers, and digital video producers in San Francisco, CA. We saw firsthand how creators were burning out spending 20+ hours a week sifting through social feeds trying to guess what the YouTube or TikTok algorithm wanted next.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#3D3B5C' }}>
              We believe the future of content production is AI-native: autonomous systems that monitor global cultural velocity in real-time, paired with frontier cognitive models like Anthropic's Claude to transform ambiguous discourse into compelling stories that educate and entertain.
            </p>

            {/* Quick Fast Facts Badge Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <Calendar className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">Founded</div>
                <div className="text-sm font-black text-ink">2025</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <MapPin className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">HQ</div>
                <div className="text-sm font-black text-ink">San Francisco</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <Award className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">Stage</div>
                <div className="text-sm font-black text-ink">Pre-Seed / Bootstrapped</div>
              </div>
            </div>
          </div>

          {/* Right: Core Values Card */}
          <div className="rounded-3xl p-8 border-2 space-y-6" style={{ background: '#F6F5FF', borderColor: '#DDD9FF' }}>
            <h3 className="text-xl font-extrabold" style={{ color: '#12112A' }}>
              Our Foundational Principles
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: '#DDD9FF' }}>
                  <Target className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-ink">Creator Ownership Above All</h4>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                    Creators retain 100% intellectual property of all prompts, hooks, outlines, and video concepts generated through our platform.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: '#DDD9FF' }}>
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-ink">Zero Synthetic Deception</h4>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                    Strict adherence to Anthropic’s safety policies: our agents reject generation of deepfakes, unauthorized celebrity voice clones, or political misinformation.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: '#DDD9FF' }}>
                  <HeartHandshake className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-ink">Zero Data Selling</h4>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                    Your unreleased video ideas and channel analytics are strictly private. We never sell creator data to advertisers or public LLM datasets.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 text-xs text-ink-3 flex items-center justify-between"
              style={{ borderColor: '#DDD9FF' }}>
              <span>Built with pride on Anthropic Claude</span>
              <span className="font-bold font-mono text-brand">trendpulse.ai</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
