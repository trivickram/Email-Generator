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
   * Fallback to simple email generation with multiple fallback levels
   */
  async trySimpleGeneration(jobUrl, skills) {
    // Try no-dependency generator first
    try {
      return await this.tryNoDepsGeneration(jobUrl, skills);
    } catch (error) {
      console.log('No-deps generator failed, using JavaScript fallback');
      return this.generateJavaScriptFallback(jobUrl, skills);
    }
  }

  /**
   * Try the no-dependency Python generator
   */
  async tryNoDepsGeneration(jobUrl, skills) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.pythonDir, 'no_deps_generator.py');
      
      const args = [pythonScript, 'generate', jobUrl];
      if (skills && skills.length > 0) {
        args.push(JSON.stringify(skills));
      }
      
      const pythonProcess = spawn(this.pythonPath, args, {
        timeout: 15000 // 15 second timeout
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
        if (code !== 0) {
          reject(new Error(`No-deps generator failed with code ${code}: ${errorString}`));
          return;
        }

        try {
          const result = JSON.parse(dataString);
          if (result.success) {
            resolve({ ...result, method: 'no_dependencies' });
          } else {
            reject(new Error(result.error || 'No-deps generator returned error'));
          }
        } catch (parseError) {
          reject(new Error('Failed to parse no-deps generator result'));
        }
      });

      pythonProcess.on('error', (error) => {
        reject(new Error(`No-deps generator spawn error: ${error.message}`));
      });
    });
  }

  /**
   * Final JavaScript fallback - always works
   */
  generateJavaScriptFallback(jobUrl, skills = []) {
    const company = this.extractCompanyFromUrl(jobUrl);
    const skillsText = skills.length > 0 ? skills.slice(0, 3).join(', ') : 'software development';
    
    const email = `Dear ${company} Hiring Team,

I hope this email finds you well. I am writing to express my strong interest in the open position at ${company}.

With my experience in ${skillsText}, I am confident that I would be a valuable addition to your team. I am particularly excited about this opportunity because:

• My technical skills align well with your requirements
• I am passionate about delivering high-quality solutions  
• I thrive in collaborative environments and enjoy tackling challenging problems

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to ${company}'s continued success. I am available for an interview at your convenience.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Email]
[Your Phone]`;

    return {
      success: true,
      email: email,
      subject: `Application for Position at ${company}`,
      company: company,
      skills_used: skills.slice(0, 3),
      generated_at: new Date().toISOString(),
      method: 'javascript_fallback',
      job_url: jobUrl
    };
  }

  /**
   * Extract company name from URL
   */
  extractCompanyFromUrl(url) {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname.toLowerCase();
      
      if (hostname.includes('linkedin')) return 'LinkedIn Company';
      if (hostname.includes('indeed')) return 'Indeed Company';
      if (hostname.includes('glassdoor')) return 'Glassdoor Company';
      if (hostname.includes('monster')) return 'Monster Company';
      if (hostname.includes('ziprecruiter')) return 'ZipRecruiter Company';
      
      // Extract domain name
      const domain = hostname.replace('www.', '').replace('.com', '').replace('.org', '');
      return domain.charAt(0).toUpperCase() + domain.slice(1) + ' Company';
    } catch {
      return 'The Company';
    }
  }

  /**
   * Original simple generation method (kept for backward compatibility)
   */
  async tryOriginalSimpleGeneration(jobUrl, skills) {
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
