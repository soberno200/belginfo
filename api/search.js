export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q, number } = req.query;

  try {
    let url;
    if (number) {
      url = `https://api.opencorporates.com/v0.4/companies/be/${encodeURIComponent(number)}?sparse=false`;
    } else if (q) {
      url = `https://api.opencorporates.com/v0.4/companies/search?q=${encodeURIComponent(q)}&jurisdiction_code=be&per_page=15`;
    } else {
      return res.status(400).json({ error: 'Paramètre q ou number requis' });
    }

    const response = await fetch(url, {
      headers: { 'User-Agent': 'BelgInfo/1.0' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erreur API: ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
