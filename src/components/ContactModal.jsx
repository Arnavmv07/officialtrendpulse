import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Building, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Creator / Founder',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      style={{ background: 'rgba(18,17,42,0.7)', backdropFilter: 'blur(8px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
        
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="section-label">Get in Touch</span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink">Connect with TrendPulse</h2>
            <p className="text-xs text-ink-3 mt-1">
              General inquiries, pilot programs, or investor discussions.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface text-ink-3 hover:text-ink cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct contact badge */}
        <div className="p-3.5 rounded-2xl bg-surface border-2 flex items-center justify-between text-xs"
          style={{ borderColor: '#DDD9FF' }}>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand" />
            <span className="font-bold text-ink">Direct Founder Email:</span>
          </div>
          <a href="mailto:founders@trendpulse.ai" className="font-mono font-bold text-brand hover:underline">
            founders@trendpulse.ai
          </a>
        </div>

        {submitted ? (
          <div className="py-10 text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
              style={{ background: '#ECFDF5' }}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <h3 className="text-lg font-extrabold text-ink">Message Received!</h3>
            <p className="text-xs text-ink-3 max-w-xs mx-auto">
              Thank you for reaching out. A founding team member will reply to your domain email within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-ink-3 mb-1">Your Name</label>
              <input
                required
                type="text"
                placeholder="Jane Doe"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            <div>
              <label className="block text-ink-3 mb-1">Company / Creator Email</label>
              <input
                required
                type="email"
                placeholder="jane@yourdomain.com"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-ink-3 mb-1">Channel / Company</label>
                <input
                  type="text"
                  placeholder="e.g. Nexus Media / YouTube"
                  value={formData.company}
                  onChange={e => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                  style={{ borderColor: '#DDD9FF' }}
                  onFocus={e => e.target.style.borderColor = '#4B35E8'}
                  onBlur={e => e.target.style.borderColor = '#DDD9FF'}
                />
              </div>
              <div>
                <label className="block text-ink-3 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={e => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none cursor-pointer"
                  style={{ borderColor: '#DDD9FF' }}
                >
                  <option value="Creator / Founder">Creator / Founder</option>
                  <option value="Media Agency Executive">Agency Executive</option>
                  <option value="Anthropic Reviewer">Anthropic Partner / Reviewer</option>
                  <option value="Investor / Press">Investor / Press</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-ink-3 mb-1">How can we assist you?</label>
              <textarea
                rows={3}
                required
                placeholder="Tell us about your content goals or pilot requirements..."
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none resize-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button type="button" onClick={onClose} className="btn-outline !px-4 !py-2 text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-brand text-xs">
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
