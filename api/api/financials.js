export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-nbb-key');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const { number } = req.query;
  const nbbKey = req.headers['x-nbb-key'];

  if (!number) return res.status(400).json({ error: 'Numéro BCE requis' });
  if (!nbbKey) return res.status(400).json({ error: 'Clé BNB manquante' });

  const bceNum = number.replace(/\D/g, '');
  const baseUrl = 'https://ws.cbso.nbb.be/authentic';
  const headers = {
    'NBB-CBSO-Subscription-Key': nbbKey,
    'X-Request-Id': Math.random().toString(36).slice(2),
    'Accept': 'application/json'
  };

  try {
    const refResp = await fetch(`${baseUrl}/legalEntity/${bceNum}/references`, { headers });

    if (refResp.status === 401) return res.status(401).json({ error: 'Clé BNB invalide' });
    if (refResp.status === 404) return res.status(200).json({ financials: [] });
    if (!refResp.ok) return res.status(refResp.status).json({ error: `BNB erreur ${refResp.status}` });

    const refs = await refResp.json();
    if (!refs || !refs.length) return res.status(200).json({ financials: [] });

    const results = [];
    for (const ref of refs.slice(0, 3)) {
      try {
        const docResp = await fetch(`${baseUrl}/reference/${ref.reference}/data/json`, { headers });
        if (!docResp.ok) continue;
        const docData = await docResp.json();
        results.push({ ref, docData });
      } catch (e) {}
    }

    return res.status(200).json({ financials: results });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
