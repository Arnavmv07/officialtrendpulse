// Preview-only, no generation. Production is permanently disabled here.
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (process.env.VERCEL_ENV !== 'preview') return res.status(404).json({ error: 'Not available' });
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: 'Server credential missing' });
  try {
    const response = await fetch('https://api.anthropic.com/v1/models?limit=20', {
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01' }, signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) return res.status(502).json({ error: 'Metadata check failed', status: response.status });
    const body = await response.json();
    return res.status(200).json({ organizationId: response.headers.get('anthropic-organization-id'), workspaceId: response.headers.get('anthropic-workspace-id'), models: (body.data || []).map(m => ({ id: m.id, displayName: m.display_name, capabilities: m.capabilities })), hasMore: body.has_more });
  } catch { return res.status(502).json({ error: 'Metadata unavailable; no retry performed' }); }
}
