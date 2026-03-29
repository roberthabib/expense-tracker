exports.handler = async (event) => {
  const SCRIPT_URL = process.env.SCRIPT_URL;
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  try {
    if (event.httpMethod === 'GET') {
      const res = await fetch(`${SCRIPT_URL}?action=get`);
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }
    if (event.httpMethod === 'POST') {
      const body = JSON.parse(event.body);
      const fd = new URLSearchParams();
      fd.append('data', JSON.stringify(body));
      const res = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: fd,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      const data = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(data) };
    }
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ status: 'error', message: e.message }) };
  }
};
