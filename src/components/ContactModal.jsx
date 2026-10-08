import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, Building, MessageSquare } from 'lucide-react';

export default function ContactModal({ isOpen, onClose, initialRole = 'Creator / Founder' }) {
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: initialRole,
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    const subject = encodeURIComponent('TrendPulse inquiry');
    const body = encodeURIComponent(`Name: ${formData.name}\nReply email: ${formData.email}\nOrganization: ${formData.company}\n\n${formData.message}`);
    window.location.href = `mailto:founders@officialtrendpulse.in?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
              <span className="section-label">Official Contact</span>
            </div>
            <h2 className="text-2xl font-extrabold text-ink">Connect with TrendPulse</h2>
            <p className="text-xs text-ink-3 mt-1">
              Questions or feedback about this prototype. Open an email draft to the founder, then review and send it in your email app.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-surface text-ink-3 hover:text-ink cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Direct founder email badge */}
        <div className="p-3.5 rounded-2xl bg-surface border-2 flex items-center justify-between text-xs"
          style={{ borderColor: '#DDD9FF' }}>
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-brand" />
            <span className="font-bold text-ink">Direct Founder Email:</span>
          </div>
          <a href="mailto:founders@officialtrendpulse.in" className="font-mono font-bold text-brand hover:underline">
            founders@officialtrendpulse.in
          </a>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl flex items-center justify-center"
              style={{ background: '#ECFDF5' }}>
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-ink">Email Draft Opened</h3>
              <p className="text-xs text-ink-3 mt-1">
                Nothing was submitted through this website.
              </p>
            </div>
            <p className="text-xs text-ink-2 max-w-sm mx-auto leading-relaxed">
              Review and send the draft in your email app. This website does not send your message or promise a response time.
            </p>
            <div className="pt-2">
              <button onClick={handleReset} className="btn-brand text-xs !py-2 !px-5">
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
            <div>
              <label className="block text-ink-3 mb-1">Full Name</label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border-2 text-ink text-sm outline-none"
                style={{ borderColor: '#DDD9FF' }}
                onFocus={e => e.target.style.borderColor = '#4B35E8'}
                onBlur={e => e.target.style.borderColor = '#DDD9FF'}
              />
            </div>

            <div>
              <label className="block text-ink-3 mb-1">Company or Creator Email</label>
              <input
                required
                type="email"
                placeholder="Enter your email address"
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
                <label className="block text-ink-3 mb-1">Channel / Organization</label>
                <input
                  type="text"
                  placeholder="Enter organization or channel"
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
                  <option value="Project Feedback">Project Feedback</option>
                  <option value="Investor / Media">Investor / Media</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-ink-3 mb-1">Message or Requirements</label>
              <textarea
                rows={3}
                required
                placeholder="Describe your production workflow, team size, or prototype feedback..."
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
                <span>Open Email Draft</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
