const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const EmailService = require('../services/emailService');

// Validation middleware
const validateEmailRequest = [
  body('jobUrl')
    .isURL()
    .withMessage('Please provide a valid job URL'),
  body('jobUrl')
    .matches(/^https?:\/\//)
    .withMessage('URL must start with http:// or https://'),
];

// @route   POST /api/email/generate-test
// @desc    Test email generation with mock data
// @access  Public
router.post('/generate-test', async (req, res) => {
  try {
    const { jobUrl } = req.body;
    
    // Return mock data immediately
    const mockResult = {
      success: true,
      job: {
        role: "Software Developer",
        company: "Test Company",
        skills: ["Python", "JavaScript", "React"]
      },
      matched_projects: [
        {
          title: "Portfolio Website",
          description: "A React-based portfolio showcasing web development skills",
          link: "https://github.com/user/portfolio"
        }
      ],
      email: `Subject: Application for Software Developer Position

Dear Hiring Manager,

I am writing to express my interest in the Software Developer position at Test Company. I found the job posting at ${jobUrl} and believe my skills align well with your requirements.

My experience includes:
- Python development for backend services
- JavaScript and React for frontend applications
- Full-stack web development

I have attached my portfolio project which demonstrates these skills:
- Portfolio Website: A React-based portfolio showcasing web development skills
  GitHub: https://github.com/user/portfolio

I would welcome the opportunity to discuss how my skills could contribute to your team.

Best regards,
[Your Name]`,
      url: jobUrl,
      method: "mock_test"
    };

    res.json({
      success: true,
      data: mockResult,
      message: 'Test email generated successfully'
    });

  } catch (error) {
    console.error('Error in test generation:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate test email'
    });
  }
});

// @route   POST /api/email/generate
// @desc    Generate cold email from job URL
// @access  Public
router.post('/generate', validateEmailRequest, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { jobUrl, skills } = req.body;
    
    console.log(`📧 Generating email for job URL: ${jobUrl}`);
    console.log(`🎯 Skills provided: ${skills ? JSON.stringify(skills) : 'none'}`);

    // Call the email service with skills
    const result = await EmailService.generateColdEmail(jobUrl, skills || []);

    res.json({
      success: true,
      data: result,
      message: 'Cold email generated successfully'
    });

  } catch (error) {
    console.error('Error generating email:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to generate email',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   GET /api/email/status
// @desc    Get email generation status
// @access  Public
router.get('/status', (req, res) => {
  res.json({
    success: true,
    message: 'Email service is running',
    timestamp: new Date().toISOString()
  });
});

// @route   GET /api/email/test-python-simple
// @desc    Simple Python environment test
// @access  Public
router.get('/test-python-simple', async (req, res) => {
  try {
    const result = await EmailService.simplePythonTest();
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   GET /api/email/test-python
// @desc    Test Python environment and dependencies
// @access  Public
router.get('/test-python', async (req, res) => {
  try {
    const result = await EmailService.testPythonEnvironment();
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;
