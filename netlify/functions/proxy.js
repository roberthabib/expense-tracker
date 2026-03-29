  'Access-Control-Allow-Origin': '*'
  };
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
