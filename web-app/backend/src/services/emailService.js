const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

class EmailService {
  constructor() {
    // Use virtual environment Python if available, otherwise fall back to system Python
    const venvPython = path.join(__dirname, '..', '..', 'venv', 'bin', 'python');
    const venvPythonWin = path.join(__dirname, '..', '..', 'venv', 'Scripts', 'python.exe');
    
    if (fs.existsSync(venvPython)) {
      this.pythonPath = venvPython;
      console.log('🐍 Using venv Python (Unix)');
    } else if (fs.existsSync(venvPythonWin)) {
      this.pythonPath = venvPythonWin;
      console.log('🐍 Using venv Python (Windows)');
    } else {
      this.pythonPath = process.env.PYTHON_PATH || (process.platform === 'win32' ? 'python' : 'python3');
      console.log('🐍 Using system Python');
    }
    
    this.pythonDir = path.join(__dirname, '..', '..', 'python');
  }

  /**
   * Generate cold email from job URL with AI only
   * @param {string} jobUrl - The job posting URL
   * @param {Array} skills - Optional skills array
   * @returns {Promise<object>} Generated email data
   */
  async generateColdEmail(jobUrl, skills = []) {
    // Only try advanced AI generation - no fallbacks
    console.log(`🤖 Attempting AI-powered email generation for: ${jobUrl}`);
    
    try {
      const result = await this.tryAdvancedGeneration(jobUrl, skills);
      console.log(`✅ AI generation successful!`);
      return result;
    } catch (error) {
      console.error(`❌ AI generation failed: ${error.message}`);
      // Return the error instead of falling back
      throw new Error(`AI email generation failed: ${error.message}`);
    }
  }

  /**
   * Try the advanced AI-powered email generation
   */
  async tryAdvancedGeneration(jobUrl, skills = []) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'email_api.py');
      
      // Use email_api.py with proper arguments
      const args = [pythonScript, 'generate', jobUrl];
      
      console.log(`🤖 Starting AI generation with: ${this.pythonPath} ${args.join(' ')}`);
      
      const pythonProcess = spawn(this.pythonPath, args, {
        env: {
          ...process.env,
          GROQ_API_KEY: process.env.GROQ_API_KEY, // Ensure API key is passed
          PYTHONPATH: this.pythonDir
        },
        timeout: 60000 // 60 second timeout for AI generation
      });
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
        console.log(`🐍 Python stderr: ${data.toString()}`);
      });

      pythonProcess.on('close', (code) => {
        console.log(`🤖 AI generation process exited with code: ${code}`);
        console.log(`🤖 AI stdout: ${dataString.substring(0, 200)}...`);
        
        if (code !== 0) {
          console.error(`❌ Advanced generator failed with code ${code}`);
          console.error(`❌ Error output: ${errorString}`);
          reject(new Error(`Advanced generation failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          if (result.success && result.email && result.email.trim()) {
            console.log(`✅ AI email generated successfully (${result.email.length} chars)`);
            resolve({ ...result, method: 'advanced_ai' });
          } else {
            console.error(`❌ AI generation returned error or empty email: ${result.error || 'Empty email content'}`);
            reject(new Error(result.error || 'AI generation returned empty email'));
          }
        } catch (parseError) {
          console.error(`❌ Failed to parse AI generation result: ${parseError.message}`);
          console.error(`❌ Raw output: ${dataString}`);
          reject(new Error('Failed to parse advanced generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error(`❌ Advanced generator spawn error: ${error.message}`);
        reject(new Error(`Failed to start advanced generation: ${error.message}`));
      });
    });
  }
}

module.exports = new EmailService();
