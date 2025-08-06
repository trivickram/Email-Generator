const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class EmailService {
  constructor() {
    // Use environment variable first, then check for virtual environments
    if (process.env.PYTHON_PATH) {
      this.pythonPath = process.env.PYTHON_PATH;
      console.log('🐍 Using PYTHON_PATH from environment:', this.pythonPath);
    } else {
      // Use virtual environment Python if available, otherwise fall back
      const venvPython = path.join(__dirname, '..', '..', 'venv', 'bin', 'python');
      const venvPythonWin = path.join(__dirname, '..', '..', 'venv', 'Scripts', 'python.exe');
      // Also check for .venv directory (common naming)
      const venvDotPythonWin = path.join(__dirname, '..', '..', '.venv', 'Scripts', 'python.exe');
      const venvDotPython = path.join(__dirname, '..', '..', '.venv', 'bin', 'python');
      
      if (fs.existsSync(venvPython)) {
        this.pythonPath = venvPython;
        console.log('🐍 Using venv Python (Unix)');
      } else if (fs.existsSync(venvPythonWin)) {
        this.pythonPath = venvPythonWin;
        console.log('🐍 Using venv Python (Windows)');
      } else if (fs.existsSync(venvDotPythonWin)) {
        this.pythonPath = venvDotPythonWin;
        console.log('🐍 Using .venv Python (Windows)');
      } else if (fs.existsSync(venvDotPython)) {
        this.pythonPath = venvDotPython;
        console.log('🐍 Using .venv Python (Unix)');
      } else {
        this.pythonPath = process.platform === 'win32' ? 'C:/Python313/python.exe' : 'python3';
        console.log('🐍 Using default Python:', this.pythonPath);
      }
    }
    
    this.pythonDir = path.join(__dirname, '..', '..', 'python');
    console.log('🐍 Python directory:', this.pythonDir);
  }

  /**
   * Generate cold email from job URL using AI-first approach with detailed logging
   * @param {string} jobUrl - The job posting URL
   * @param {Array} skills - Optional skills array
   * @returns {Promise<object>} Generated email data
   */
  async generateColdEmail(jobUrl, skills = []) {
    console.log(`\n🎯 ===== STARTING EMAIL GENERATION =====`);
    console.log(`📊 Job URL: ${jobUrl}`);
    console.log(`🔧 Skills provided: ${JSON.stringify(skills)}`);
    console.log(`🤖 Prioritizing AI generation with LLaMA model...`);
    
    // Try AI generation FIRST (since API key is configured)
    try {
      console.log(`🚀 Attempting AI-powered generation...`);
      const result = await this.tryAdvancedGeneration(jobUrl, skills);
      
      console.log(`\n✅ ===== AI GENERATION SUCCESSFUL =====`);
      console.log(`🎯 Method used: ${result.method || 'ai_unknown'}`);
      console.log(`📧 Email length: ${result.email ? result.email.length : 0} characters`);
      console.log(`⚡ Generation time: ${result.generation_time || 'unknown'}s`);
      console.log(`🤖 Model: ${result.model_used || 'unknown'}`);
      
      if (result.email) {
        console.log(`📝 Email preview: "${result.email.substring(0, 150)}..."`);
      }
      
      console.log(`✅ Email generation completed successfully!\n`);
      return result;
      
    } catch (error) {
      console.error(`\n❌ ===== AI GENERATION FAILED =====`);
      console.error(`💥 Error: ${error.message}`);
      console.log(`🔄 Falling back to smart template generation...`);
      
      try {
        // Only fallback to simple generation if AI fails
        const simpleResult = await this.trySimpleGeneration(jobUrl, skills);
        console.log(`⚠️ Using smart template generation as fallback`);
        simpleResult.fallback_reason = `AI generation failed: ${error.message}`;
        simpleResult.ai_attempted = true;
        
        console.log(`📧 Fallback email length: ${simpleResult.email ? simpleResult.email.length : 0} characters`);
        console.log(`✅ Fallback generation completed\n`);
        
        return simpleResult;
      } catch (simpleError) {
        console.error(`❌ Simple generation also failed: ${simpleError.message}`);
        throw new Error(`All email generation methods failed. AI: ${error.message}, Simple: ${simpleError.message}`);
      }
    }
  }

  /**
   * Try simple template-based email generation
   */
  async trySimpleGeneration(jobUrl, skills = []) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'no_deps_generator.py');
      const args = [pythonScript, 'generate', jobUrl];
      
      console.log(`🤖 Starting simple generation with: ${this.pythonPath} ${args.join(' ')}`);
      
      const pythonProcess = spawn(this.pythonPath, args, {
        timeout: 30000 // 30 second timeout
      });
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`🤖 Simple generation process exited with code: ${code}`);
        
        if (code !== 0) {
          reject(new Error(`Simple generation failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          if (result.success && result.email && result.email.trim()) {
            resolve({ ...result, method: 'simple_template' });
          } else {
            reject(new Error(result.error || 'Simple generation returned empty email'));
          }
        } catch (parseError) {
          reject(new Error('Failed to parse simple generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`Failed to start simple generation: ${error.message}`));
      });
    });
  }

  /**
   * Simple Python environment test
   */
  async simplePythonTest() {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'simple_test.py');
      
      console.log(`🧪 Simple Python test with: ${this.pythonPath} ${pythonScript}`);
      
      const pythonProcess = spawn(this.pythonPath, [pythonScript], {
        timeout: 10000 // 10 second timeout
      });
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`🧪 Simple Python test exited with code: ${code}`);
        
        if (code !== 0) {
          reject(new Error(`Simple Python test failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (parseError) {
          reject(new Error(`Failed to parse simple test result: ${parseError.message}`));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`Failed to start simple Python test: ${error.message}`));
      });
    });
  }

  /**
   * Test Python environment and dependencies
   */
  async testPythonEnvironment() {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'email_api.py');
      const args = [pythonScript, 'test'];
      
      console.log(`🧪 Testing Python environment with: ${this.pythonPath} ${args.join(' ')}`);
      
      const pythonProcess = spawn(this.pythonPath, args, {
        env: {
          ...process.env,
          GROQ_API_KEY: process.env.GROQ_API_KEY,
          PYTHONPATH: this.pythonDir
        },
        timeout: 30000 // 30 second timeout for test
      });
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`🧪 Python test process exited with code: ${code}`);
        
        if (code !== 0) {
          reject(new Error(`Python test failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (parseError) {
          reject(new Error(`Failed to parse Python test result: ${parseError.message}`));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`Failed to start Python test: ${error.message}`));
      });
    });
  }

  /**
   * Try AI-powered email generation using the fast Groq script with detailed logging
   */
  async tryAdvancedGeneration(jobUrl, skills = []) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'fast_ai_generator.py');
      const args = [pythonScript, 'generate', jobUrl];
      
      console.log(`\n� ===== PYTHON AI GENERATION =====`);
      console.log(`📂 Python script: ${pythonScript}`);
      console.log(`🔧 Python path: ${this.pythonPath}`);
      console.log(`📋 Command: ${this.pythonPath} ${args.join(' ')}`);
      console.log(`🌍 Environment variables passed:`);
      console.log(`   - GROQ_API_KEY: ${process.env.GROQ_API_KEY ? 'SET (' + process.env.GROQ_API_KEY.substring(0,8) + '...)' : 'NOT SET'}`);
      console.log(`   - PYTHONPATH: ${this.pythonDir}`);
      
      const pythonProcess = spawn(this.pythonPath, args, {
        env: {
          ...process.env,
          GROQ_API_KEY: process.env.GROQ_API_KEY,
          PYTHONPATH: this.pythonDir
        },
        timeout: 30000 // 30 second timeout for AI
      });
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        const stderr = data.toString();
        errorString += stderr;
        // Log Python stderr in real-time for debugging
        console.log(`🐍 Python: ${stderr.trim()}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`\n� Python process completed with exit code: ${code}`);
        
        if (code !== 0) {
          console.error(`❌ Python script failed!`);
          console.error(`📋 Error output: ${errorString}`);
          reject(new Error(`AI generation script failed with code ${code}: ${errorString || 'Process failed'}`));
          return;
        }

        console.log(`📤 Python stdout received: ${dataString.length} characters`);
        
        try {
          const result = JSON.parse(dataString);
          
          console.log(`\n📊 ===== AI GENERATION RESULT =====`);
          console.log(`✅ Success: ${result.success}`);
          console.log(`🎯 Method: ${result.method}`);
          console.log(`📧 Email generated: ${result.email ? 'YES' : 'NO'}`);
          
          if (result.email) {
            console.log(`� Email length: ${result.email.length} characters`);
            console.log(`📝 Email starts with: "${result.email.substring(0, 100)}..."`);
          }
          
          if (result.generation_time) {
            console.log(`⚡ Generation time: ${result.generation_time}s`);
          }
          
          if (result.model_used) {
            console.log(`🤖 Model used: ${result.model_used}`);
          }
          
          if (result.ai_fallback_reason) {
            console.log(`⚠️ AI fallback reason: ${result.ai_fallback_reason}`);
          }
          
          if (result.success && result.email && result.email.trim()) {
            console.log(`✅ AI generation successful - returning result\n`);
            resolve({ ...result, method: result.method || 'ai_generation' });
          } else {
            console.error(`❌ AI generation returned error or empty email`);
            console.error(`📋 Result: ${JSON.stringify(result, null, 2)}`);
            reject(new Error(result.error || 'AI generation returned empty email'));
          }
        } catch (parseError) {
          console.error(`❌ Failed to parse Python output as JSON`);
          console.error(`📋 Parse error: ${parseError.message}`);
          console.error(`📋 Raw output: ${dataString.substring(0, 1000)}`);
          reject(new Error('Failed to parse AI generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error(`❌ Failed to spawn Python process: ${error.message}`);
        reject(new Error(`Failed to start AI generation: ${error.message}`));
      });
    });
  }
}

module.exports = new EmailService();
