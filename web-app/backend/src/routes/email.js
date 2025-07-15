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

    const { jobUrl } = req.body;
    
    console.log(`📧 Generating email for job URL: ${jobUrl}`);

    // Call the email service
    const result = await EmailService.generateColdEmail(jobUrl);

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
