import { createClient } from '@supabase/supabase-js';
import { validateIdea } from '../../lib/dashboard-validation.js';
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const dashboardEnabled = import.meta.env.VITE_DASHBOARD_ENABLED === 'true' && !!url && !!key;
// The publishable key is not a service-role key. RLS enforces every owner query.
export const authClient = dashboardEnabled ? createClient(url, key, {
  auth: { persistSession: true, storage: window.sessionStorage, autoRefreshToken: true, detectSessionInUrl: true, flowType: 'pkce' },
}) : null;
const requireSession = async () => {
  if (!authClient) throw new Error('Enrollment is not available yet.');
  const { data, error } = await authClient.auth.getUser();
  if (error || !data.user) throw new Error('Please sign in.');
  return data.user;
};
export async function listCreatorIdeas() {
  const user = await requireSession();
  const { data, error } = await authClient.from('creator_ideas').select('id,topic,hook,notes,source_url,status,created_at,updated_at').eq('owner_id', user.id).order('created_at', { ascending: false }).limit(100);
  if (error) throw new Error('Could not load your ideas.');
  return data;
}
export async function addCreatorIdea(input) {
  const user = await requireSession();
  const { data, error } = await authClient.from('creator_ideas').insert({ ...validateIdea(input), owner_id: user.id }).select('id,topic,hook,notes,source_url,status,created_at,updated_at').single();
  if (error) throw new Error('Could not save your idea.');
  return data;
}
export async function changeCreatorIdea(id, input) {
  const user = await requireSession();
  const { data, error } = await authClient.from('creator_ideas').update(validateIdea(input)).eq('id', id).eq('owner_id', user.id).select('id').single();
  if (error || !data) throw new Error('Idea not found or update denied.');
}
export async function removeCreatorIdea(id) {
  const user = await requireSession();
  const { data, error } = await authClient.from('creator_ideas').delete().eq('id', id).eq('owner_id', user.id).select('id').single();
  if (error || !data) throw new Error('Idea not found or delete denied.');
}
