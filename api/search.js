export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q, number } = req.query;

  try {
    let url;
    if (number) {
      const num = number.replace(/\D/g, '');
      url = `https://cbeapi.be/api/v1/enterprise/${num}`;
    } else if (q) {
      url = `https://cbeapi.be/api/v1/search?name=${encodeURIComponent(q)}&limit=15`;
    } else {
      return res.status(400).json({ error: 'Paramètre requis' });
    }

    const response = await fetch(url, {
      headers: { 'Accept': 'application/json' }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: `Erreur ${response.status}` });
    }

    const data = await response.json();
    return res.status(200).json({ source: 'cbe', data });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
