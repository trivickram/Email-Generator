export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const status = {
      service: 'email_generation',
      status: 'operational',
      groq_api: process.env.GROQ_API_KEY ? 'configured' : 'missing',
      last_updated: new Date().toISOString(),
      features: {
        job_analysis: 'enabled',
        portfolio_matching: 'enabled',
        email_generation: 'enabled'
      }
    };

    return res.status(200).json(status);

  } catch (error) {
    console.error('Email status error:', error);
    return res.status(500).json({ 
      service: 'email_generation',
      status: 'error',
      error: error.message 
    });
  }
}
