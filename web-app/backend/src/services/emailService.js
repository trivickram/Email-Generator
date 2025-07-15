const { spawn } = require('child_process');
const path = require('path');

class EmailService {
  constructor() {
    this.pythonPath = process.env.PYTHON_PATH || (process.platform === 'win32' ? 'python' : 'python3');
    this.pythonDir = path.join(__dirname, '..', '..', 'python');
  }

  /**
   * Generate cold email from job URL
   * @param {string} jobUrl - The job posting URL
   * @returns {Promise<object>} Generated email data
   */
  async generateColdEmail(jobUrl) {
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
        console.log(`Python process exited with code: ${code}`);
        console.log(`Python stdout: ${dataString}`);
        console.log(`Python stderr: ${errorString}`);
        
        if (code !== 0) {
          console.error(`Python script error: ${errorString}`);
          reject(new Error(`Python script failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          resolve(result);
        } catch (parseError) {
          console.error('Failed to parse Python output:', dataString);
          reject(new Error('Failed to parse email generation result'));
        }
      });

      pythonProcess.on('error', (error) => {
        console.error('Failed to start Python process:', error);
        reject(new Error('Failed to start email generation process'));
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
