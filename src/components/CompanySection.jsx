import React from 'react';
import { Target, HeartHandshake, Sparkles, ShieldCheck, MapPin, Calendar, Award } from 'lucide-react';

export default function CompanySection() {
  return (
    <section id="about" className="py-20 border-t-2" style={{ borderColor: '#DDD9FF', background: '#FFFFFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Mission & Details */}
          <div className="space-y-6">
            <span className="section-label">About the Project</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight" style={{ color: '#12112A' }}>
              Building the Operating System for the Next Generation of Creators
            </h2>
            <p className="text-base leading-relaxed" style={{ color: '#3D3B5C' }}>
              <strong>TrendPulse</strong> was started in <strong>October 2026</strong> by <strong>Arnav Ramesh</strong> in <strong>Pune, India</strong>. It is an early creator-workflow project for exploring topics and organizing video ideas.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#3D3B5C' }}>
              The current site demonstrates eight sample trend cards, filters, template-based briefs, and a browser-local idea board. Live data collection and Claude-powered analysis are development goals; this demo does not provide them.
            </p>

            {/* Quick Fast Facts Badge Row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <Calendar className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">Started</div>
                <div className="text-sm font-black text-ink">October 2026</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <MapPin className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">Based in</div>
                <div className="text-sm font-black text-ink">Pune, India</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-surface border-2 text-center" style={{ borderColor: '#DDD9FF' }}>
                <Award className="w-4 h-4 mx-auto mb-1 text-brand" />
                <div className="text-[11px] font-bold text-ink-3">Builder</div>
                <div className="text-sm font-black text-ink">Arnav Ramesh</div>
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
                    Use this workspace to organize your ideas. Sample briefs are starting points, not guarantees of originality or performance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: '#DDD9FF' }}>
                  <ShieldCheck className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-ink">Clear Demo Boundaries</h4>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                    Sample metrics and template outputs are labelled as demonstrations. No live AI moderation or automated verification is active.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border-2 flex items-center justify-center shrink-0"
                  style={{ borderColor: '#DDD9FF' }}>
                  <HeartHandshake className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-ink">Browser-Local Workspace</h4>
                  <p className="text-xs text-ink-2 mt-0.5 leading-relaxed">
                    The demo idea board saves to local storage in this browser. It is not a secure cloud account; avoid entering sensitive information.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t-2 text-xs text-ink-3 flex items-center justify-between"
              style={{ borderColor: '#DDD9FF' }}>
              <span>Built by Arnav Ramesh in Pune</span>
              <span className="font-bold font-mono text-brand">officialtrendpulse.in</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
