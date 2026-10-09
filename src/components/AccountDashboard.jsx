import React, { useEffect, useState } from 'react';
import { authClient, dashboardEnabled, listCreatorIdeas, addCreatorIdea, changeCreatorIdea, removeCreatorIdea } from '../services/dashboard';
import { IDEA_STATES } from '../../lib/dashboard-validation';
export default function AccountDashboard() {
  const [user, setUser] = useState(null), [ideas, setIdeas] = useState([]);
  const [email, setEmail] = useState(''), [password, setPassword] = useState(''), [topic, setTopic] = useState('');
  const [message, setMessage] = useState(''), [busy, setBusy] = useState(false), [recovering, setRecovering] = useState(false);
  useEffect(() => {
    if (!authClient) return;
    authClient.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: { subscription } } = authClient.auth.onAuthStateChange((event, session) => { if (event === 'PASSWORD_RECOVERY') setRecovering(true); setUser(session?.user ?? null); setIdeas([]); });
    return () => subscription.unsubscribe();
  }, []);
  useEffect(() => { let alive = true; if (user) listCreatorIdeas().then(data => { if (alive) setIdeas(data); }).catch(() => { if (alive) setMessage('Could not load your saved ideas.'); }); return () => { alive = false; }; }, [user]);
  async function run(action) {
    setBusy(true); setMessage('');
    try { await action(); } catch (e) { setMessage(e.message || 'Request failed.'); }
    finally { setBusy(false); setPassword(''); }
  }
  const redirectTo = window.location.origin + '/';
  async function emailAuth(signUp) {
    if (!email || password.length < 12) throw new Error('Enter your email and a password of at least 12 characters.');
    const result = signUp ? await authClient.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } }) : await authClient.auth.signInWithPassword({ email, password });
    if (result.error) throw new Error(signUp ? 'Could not create account. Try again or use sign-in if registered.' : 'Sign-in failed. Check your details.');
    if (signUp) setMessage('Check your email to confirm your account before signing in.');
  }
  if (!dashboardEnabled) return null;
  return <section className="max-w-7xl mx-auto px-4 py-16" id="account-dashboard">
    <h2 className="text-3xl font-extrabold text-ink">Your creator dashboard</h2>
    <p className="text-sm text-ink-3 mt-2">Save source-backed ideas to your account. Displays up to 100 recent ideas. AI generation is not enabled.</p>
    {message && <p role="status" className="my-4 p-4 rounded-xl bg-amber-50 text-amber-900">{message}</p>}
    {recovering && <form className="card p-5 my-5 space-y-3" onSubmit={e => { e.preventDefault(); run(async () => { if (password.length < 12) throw new Error('Use at least 12 characters.'); const { error } = await authClient.auth.updateUser({ password }); if (error) throw new Error('Password change failed.'); setRecovering(false); setMessage('Password updated.'); }); }}><label className="block">New password<input type="password" autoComplete="new-password" minLength={12} maxLength={128} required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-xl mt-2" /></label><button className="btn-brand" disabled={busy}>Set new password</button></form>}
    {!user ? <div className="card p-6 mt-6 max-w-md space-y-4">
      <button disabled={busy} className="btn-outline w-full" onClick={() => run(async () => { const { error } = await authClient.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } }); if (error) throw new Error('Google sign-in is unavailable.'); })}>Continue with Google</button>
      <form onSubmit={e => { e.preventDefault(); run(() => emailAuth(false)); }} className="space-y-3">
        <label className="block text-sm">Email<input className="w-full border rounded-xl p-3 mt-1" type="email" autoComplete="username" value={email} onChange={e => setEmail(e.target.value)} required maxLength={254} /></label>
        <label className="block text-sm">Password<input className="w-full border rounded-xl p-3 mt-1" type="password" autoComplete="current-password" minLength={12} maxLength={128} value={password} onChange={e => setPassword(e.target.value)} required /></label>
        <button className="btn-brand w-full" disabled={busy}>Sign in</button>
        <button type="button" className="btn-outline w-full" disabled={busy} onClick={() => run(() => emailAuth(true))}>Create account</button>
        <button type="button" className="text-sm text-brand" disabled={busy} onClick={() => run(async () => { if (!email) throw new Error('Enter your email first.'); const { error } = await authClient.auth.resetPasswordForEmail(email, { redirectTo }); if (error) throw new Error('Could not request password reset.'); setMessage('If this email has an account, a reset email will arrive.'); })}>Forgot password?</button>
      </form>
      <p className="text-xs text-ink-3">Sign-in is stored only for this browser tab. Signing out clears the session. Use a private window on shared devices.</p>
    </div> : <div className="mt-6 space-y-5">
      <div className="flex flex-wrap gap-3 items-center"><p className="text-sm">Signed in as {user.email}</p><button disabled={busy} className="btn-outline" onClick={() => run(async () => { const { error } = await authClient.auth.signOut(); if (error) throw new Error('Could not sign out.'); setUser(null); setIdeas([]); })}>Sign out</button>
      <button className="btn-outline" onClick={() => { const blob = new Blob([JSON.stringify(ideas, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'my-trendpulse-ideas.json'; a.click(); URL.revokeObjectURL(url); }}>Export displayed ideas</button></div>
      <form className="flex flex-wrap gap-3" onSubmit={e => { e.preventDefault(); run(async () => { await addCreatorIdea({ topic }); setTopic(''); setIdeas(await listCreatorIdeas()); }); }}><input aria-label="New idea topic" value={topic} onChange={e => setTopic(e.target.value)} maxLength={250} required className="border rounded-xl p-3 flex-1 min-w-48" placeholder="A topic you want to create about" /><button className="btn-brand" disabled={busy}>Save idea</button></form>
      {!ideas.length && <p className="text-ink-3 text-sm">No saved ideas yet.</p>}
      <div className="grid md:grid-cols-2 gap-4">{ideas.map(idea => <article key={idea.id} className="card p-5 space-y-3"><h3 className="font-bold">{idea.topic}</h3><p className="text-sm whitespace-pre-wrap">{idea.hook}</p><p className="text-sm whitespace-pre-wrap">{idea.notes}</p>{idea.source_url && <a className="text-sm text-brand" href={idea.source_url} rel="noopener noreferrer" target="_blank">Source</a>}<div className="flex gap-3"><select aria-label={'Status for ' + idea.topic} disabled={busy} value={idea.status} className="border p-2 rounded-lg" onChange={e => run(async () => { await changeCreatorIdea(idea.id, { ...idea, status: e.target.value }); setIdeas(await listCreatorIdeas()); })}>{IDEA_STATES.map(s => <option key={s}>{s}</option>)}</select><button disabled={busy} className="text-sm text-red-700" onClick={() => { if (window.confirm('Delete this idea permanently?')) run(async () => { await removeCreatorIdea(idea.id); setIdeas(await listCreatorIdeas()); }); }}>Delete</button></div></article>)}</div>
    </div>}
  </section>;
}
