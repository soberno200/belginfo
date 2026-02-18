export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q, number } = req.query;
  const SUPABASE_URL = 'https://qdgdyuaxczismrqndilu.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_mYvnnpeAZE4Wo9YRx3RAjw_2JgOrcXT';

  try {
    let url;
    if (number) {
      const num = number.replace(/\D/g, '');
      url = `${SUPABASE_URL}/rest/v1/entreprises?numero_bce=eq.${num}&limit=1`;
    } else if (q) {
      url = `${SUPABASE_URL}/rest/v1/entreprises?nom=ilike.*${encodeURIComponent(q)}*&limit=20&order=nom`;
    } else {
      return res.status(400).json({ error: 'Paramètre requis' });
    }

    const response = await fetch(url, {
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return res.status(response.status).json({ error: `Erreur ${response.status}` });

    const data = await response.json();
    return res.status(200).json({ source: 'supabase', data });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
