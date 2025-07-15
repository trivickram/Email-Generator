const { spawn } = require('child_process');
const path = require('path');

class EmailService {
  constructor() {
    this.pythonPath = process.env.PYTHON_PATH || (process.platform === 'win32' ? 'python' : 'python3');
    this.pythonDir = path.join(__dirname, '..', '..', 'python');
  }

  /**
   * Generate cold email from job URL with fallback
   * @param {string} jobUrl - The job posting URL
   * @param {Array} skills - Optional skills array
   * @returns {Promise<object>} Generated email data
   */
  async generateColdEmail(jobUrl, skills = []) {
    // Try advanced generator first, fallback to simple one
    try {
      return await this.tryAdvancedGeneration(jobUrl);
    } catch (error) {
      console.log('Advanced generation failed, trying simple fallback...');
      return await this.trySimpleGeneration(jobUrl, skills);
    }
  }

  /**
   * Try the advanced AI-powered email generation
   */
  async tryAdvancedGeneration(jobUrl) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'email_api.py');
      
      const pythonProcess = spawn(this.pythonPath, [pythonScript, 'generate', jobUrl]);
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`📧 Advanced generator exited with code: ${code}`);
        
        if (code !== 0) {
          console.log(`⚠️ Advanced generator failed: ${errorString}`);
          reject(new Error(`Advanced generator failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          console.log('✅ Advanced generation successful');
          resolve(result);
        } catch (parseError) {
          console.error('Failed to parse advanced generator output:', dataString);
          reject(new Error('Failed to parse advanced generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error('Advanced generator spawn error:', error.message);
        reject(error);
      });
    });
  }

  /**
   * Fallback to simple email generation
   */
  async trySimpleGeneration(jobUrl, skills) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'simple_email_generator.py');
      const skillsArg = JSON.stringify(skills);
      
      const pythonProcess = spawn(this.pythonPath, [pythonScript, 'generate', jobUrl, skillsArg]);
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`📧 Simple generator exited with code: ${code}`);
        
        if (code !== 0) {
          console.error(`❌ Simple generator failed: ${errorString}`);
          reject(new Error(`Simple generator failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          console.log('✅ Simple generation successful');
          resolve({
            ...result,
            fallback_used: true,
            message: "Generated using simple template (AI features temporarily unavailable)"
          });
        } catch (parseError) {
          console.error('Failed to parse simple generator output:', dataString);
          reject(new Error('Failed to parse simple generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error('Simple generator spawn error:', error.message);
        reject(error);
      });
    });
  }

  /**
   * Test Python environment and dependencies
   * @returns {Promise<object>} Environment test results
   */
  async testPythonEnvironment() {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'email_api.py');
      
      const pythonProcess = spawn(this.pythonPath, [pythonScript, 'test']);
      
      let dataString = '';
      let errorString = '';

      pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        errorString += data.toString();
      });

      pythonProcess.on('close', (code) => {
        console.log(`Python test process exited with code: ${code}`);
        console.log(`Python test stdout: ${dataString}`);
        console.log(`Python test stderr: ${errorString}`);
        
        const result = {
          exitCode: code,
          stdout: dataString,
          stderr: errorString,
          pythonPath: this.pythonPath,
          scriptPath: pythonScript,
          success: code === 0
        };
        
        if (code === 0) {
          try {
            const parsedResult = JSON.parse(dataString);
            resolve({ ...result, parsedOutput: parsedResult });
          } catch (parseError) {
            resolve({ ...result, parseError: parseError.message });
          }
        } else {
          resolve(result);
        }
      });

      pythonProcess.on('error', (error) => {
        resolve({
          success: false,
          error: error.message,
          pythonPath: this.pythonPath,
          scriptPath: pythonScript
        });
      });
    });
  }
}

module.exports = new EmailService();
