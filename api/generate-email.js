const { spawn } = require('child_process');
const path = require('path');

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

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { jobUrl } = req.body;
    
    if (!jobUrl) {
      return res.status(400).json({ error: 'Job URL is required' });
    }

    // Path to the Python script
    const scriptPath = path.join(process.cwd(), 'shared', 'email_api.py');
    
    // Run the Python script
    const pythonProcess = spawn('python', [scriptPath, jobUrl], {
      env: {
        ...process.env,
        GROQ_API_KEY: process.env.GROQ_API_KEY
      }
    });

    let output = '';
    let errorOutput = '';

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        console.error('Python script error:', errorOutput);
        return res.status(500).json({ 
          error: 'Failed to generate email',
          details: errorOutput
        });
      }

      try {
        const result = JSON.parse(output);
        res.status(200).json(result);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Output:', output);
        res.status(500).json({ 
          error: 'Failed to parse response',
          details: parseError.message
        });
      }
    });

    // Set timeout
    setTimeout(() => {
      pythonProcess.kill();
      res.status(408).json({ error: 'Request timeout' });
    }, 25000); // 25 seconds timeout

  } catch (error) {
    console.error('Handler error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message
    });
  }
}
