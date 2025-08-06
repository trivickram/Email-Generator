const axios = require('axios');
const cheerio = require('cheerio');

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

    // Fetch job posting content
    const response = await axios.get(jobUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    });

    const $ = cheerio.load(response.data);
    
    // Extract text content from the page
    const textContent = $('body').text().replace(/\s+/g, ' ').trim();
    
    // Use Groq API to analyze the job posting
    const groqResponse = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that analyzes job postings and generates personalized cold emails. Extract job details and create a professional cold email.'
          },
          {
            role: 'user',
            content: `Analyze this job posting and generate a cold email:

Job Posting Content:
${textContent.substring(0, 3000)}

Please respond with a JSON object containing:
{
  "job": {
    "role": "extracted job title",
    "experience": "experience level required",
    "skills": ["skill1", "skill2", "skill3"]
  },
  "relevant_links": [
    {
      "techstack": "relevant technology",
      "links": "portfolio link"
    }
  ],
  "email": "Generated professional cold email"
}

Generate a personalized cold email highlighting relevant experience and skills.`
          }
        ],
        temperature: 0.7,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 25000
      }
    );

    const aiResponse = groqResponse.data.choices[0].message.content;
    
    try {
      // Try to parse the JSON response
      const result = JSON.parse(aiResponse);
      res.status(200).json(result);
    } catch (parseError) {
      // If JSON parsing fails, create a structured response
      res.status(200).json({
        job: {
          role: "Software Developer",
          experience: "2-5 years",
          skills: ["JavaScript", "React", "Node.js"]
        },
        relevant_links: [
          {
            techstack: "Full Stack Development",
            links: "portfolio.example.com"
          }
        ],
        email: aiResponse
      });
    }

  } catch (error) {
    console.error('Handler error:', error);
    
    if (error.response) {
      console.error('API Error:', error.response.data);
    }
    
    res.status(500).json({ 
      error: 'Failed to generate email',
      details: error.message
    });
  }
}
