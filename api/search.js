export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q, number } = req.query;

  try {
    let url;
    const num = (number || q || '').replace(/\D/g, '');
    const isNumber = /^\d{9,10}$/.test(num);

    if (isNumber) {
      url = `https://lookup.guru/be/${num}`;
    } else if (q) {
      url = `https://api.entreprises.gouv.be/v3/unites_legales?q=${encodeURIComponent(q)}&nombre=15`;
    } else {
      return res.status(400).json({ error: 'Paramètre requis' });
    }

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json', 'User-Agent': 'BelgInfo/1.0' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erreur ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json({ source: 'lookup', data });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
