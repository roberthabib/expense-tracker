const SCRIPT_URL = process.env.SCRIPT_URL;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (!SCRIPT_URL) {
    return res.status(500).json({ status: 'error', message: 'SCRIPT_URL not configured' });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${SCRIPT_URL}?action=get`);
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (req.method === 'POST') {
      const body = req.body;
      const fd = new URLSearchParams();
      fd.append('data', JSON.stringify(body));
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: fd,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const data = await response.json();
      return res.status(200).json(data);
    }
  } catch (e) {
    return res.status(500).json({ status: 'error', message: e.message });
  }
}
