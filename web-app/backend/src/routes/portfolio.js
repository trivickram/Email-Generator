const express = require('express');
const router = express.Router();
const PortfolioService = require('../services/portfolioService');

// @route   GET /api/portfolio
// @desc    Get portfolio data
// @access  Public
router.get('/', async (req, res) => {
  try {
    const portfolio = await PortfolioService.getPortfolioData();
    
    res.json({
      success: true,
      data: portfolio,
      message: 'Portfolio data retrieved successfully'
    });

  } catch (error) {
    console.error('Error fetching portfolio:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch portfolio data'
    });
  }
});

// @route   GET /api/portfolio/skills/:skills
// @desc    Get relevant portfolio links for skills
// @access  Public
router.get('/skills/:skills', async (req, res) => {
  try {
    const { skills } = req.params;
    const skillsArray = skills.split(',').map(skill => skill.trim());
    
    const relevantLinks = await PortfolioService.getRelevantLinks(skillsArray);
    
    res.json({
      success: true,
      data: {
        skills: skillsArray,
        links: relevantLinks
      },
      message: 'Relevant portfolio links found'
    });

  } catch (error) {
    console.error('Error finding relevant links:', error);
    
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to find relevant portfolio links'
    });
  }
});

module.exports = router;
