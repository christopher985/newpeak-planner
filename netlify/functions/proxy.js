// Netlify Function — Notion API 프록시
const https = require('https');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, x-notion-token',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Content-Type': 'application/json',
};

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: CORS, body: '' };
  }

  const token = event.headers['x-notion-token'];
  if (!token) {
    return {
      statusCode: 401,
      headers: CORS,
      body: JSON.stringify({ message: 'x-notion-token header required' }),
    };
  }

  const notionPath = event.path.replace('/.netlify/functions/proxy', '') || '/';

  try {
    const bodyStr = event.body || '';
    const res = await request({
      hostname: 'api.notion.com',
      path: `/v1${notionPath}`,
      method: event.httpMethod,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(bodyStr),
      },
    }, bodyStr);

    return { statusCode: res.status, headers: CORS, body: res.body };
  } catch (e) {
    return {
      statusCode: 500,
      headers: CORS,
      body: JSON.stringify({ message: e.message }),
    };
  }
};
