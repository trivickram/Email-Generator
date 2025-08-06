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
    // Return sample portfolio data for now
    const portfolio = {
      skills: ['React', 'Node.js', 'Python', 'AI/ML', 'LangChain', 'Groq API'],
      projects: [
        {
          name: "AI Cold Email Generator",
          description: "AI-powered personalized cold email generation using Groq LLM",
          technologies: ["React", "Node.js", "Python", "LangChain", "Groq API"],
          url: "https://github.com/trivickram/Email-Generator"
        },
        {
          name: "Web Development Portfolio",
          description: "Modern web applications with React and Node.js",
          technologies: ["React", "Node.js", "Express", "MongoDB"]
        }
      ]
    };

    return res.status(200).json(portfolio);

  } catch (error) {
    console.error('Portfolio error:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch portfolio',
      details: error.message 
    });
  }
}
