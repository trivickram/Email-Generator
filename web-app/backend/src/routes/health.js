const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

// @route   GET /api/health
// @desc    Health check endpoint
// @access  Public
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Cold Email Generator API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0'
  });
});

// @route   GET /api/health/detailed
// @desc    Detailed health check
// @access  Public
router.get('/detailed', (req, res) => {
  const healthCheck = {
    success: true,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    services: {
      api: 'healthy',
      python_integration: 'ready',
      portfolio_service: 'active'
    },
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
    }
  };

  res.json(healthCheck);
});

// @route   GET /api/health/python
// @desc    Test Python environment and dependencies
// @access  Public
router.get('/python', (req, res) => {
  const pythonScript = path.join(__dirname, '..', '..', 'python', 'test_imports.py');
  
  const python = spawn('python3', [pythonScript], {
    cwd: path.join(__dirname, '..', '..'),
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let stdout = '';
  let stderr = '';

  python.stdout.on('data', (data) => {
    stdout += data.toString();
  });

  python.stderr.on('data', (data) => {
    stderr += data.toString();
  });

  python.on('close', (code) => {
    try {
      const result = JSON.parse(stdout);
      res.json({
        success: code === 0,
        python_test: result,
        exit_code: code,
        stderr: stderr || null
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Failed to parse Python test results',
        stdout,
        stderr,
        exit_code: code
      });
    }
  });

  python.on('error', (error) => {
    res.status(500).json({
      success: false,
      error: 'Failed to execute Python test',
      details: error.message
    });
  });
});

module.exports = router;
