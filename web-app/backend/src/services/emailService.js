const { spawn } = require('child_process');
const path = require('path');

class EmailService {
  constructor() {
    this.pythonPath = process.env.PYTHON_PATH || 'python';
    this.sharedPath = path.join(__dirname, '..', '..', '..', '..', 'shared');
  }

  /**
   * Generate cold email from job URL
   * @param {string} jobUrl - The job posting URL
   * @returns {Promise<object>} Generated email data
   */
  async generateColdEmail(jobUrl) {
    return new Promise((resolve, reject) => {
      const pythonScript = path.join(this.sharedPath, 'email_api.py');
      
      // Create the Python script if it doesn't exist
      this.ensurePythonAPIExists();
      
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
      const pythonScript = path.join(this.sharedPath, 'email_api.py');
      
      // Create the Python script if it doesn't exist
      this.ensurePythonAPIExists();
      
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

  /**
   * Ensure the Python API bridge script exists
   */
  ensurePythonAPIExists() {
    const fs = require('fs');
    const pythonScript = path.join(this.sharedPath, 'email_api.py');
    
    if (!fs.existsSync(pythonScript)) {
      // Create the Python API bridge script
      const pythonCode = `#!/usr/bin/env python3
"""
Python API bridge for email generation
"""
import sys
import json
import os
from pathlib import Path

# Add shared directory to path
shared_dir = Path(__file__).parent
sys.path.append(str(shared_dir))

try:
    from chains import Chain
    from portfolio import Portfolio
    from utils import clean_text
    from langchain_community.document_loaders import WebBaseLoader
except ImportError as e:
    print(json.dumps({"error": f"Import error: {str(e)}"}))
    sys.exit(1)

def generate_email(job_url):
    try:
        # Initialize components
        chain = Chain()
        portfolio = Portfolio()
        
        # Load portfolio
        portfolio.load_portfolio()
        
        # Scrape and clean job data
        loader = WebBaseLoader([job_url])
        raw_data = loader.load()[0].page_content
        cleaned_data = clean_text(raw_data)
        
        # Extract job information
        jobs = chain.extract_jobs(cleaned_data)
        
        if not jobs:
            return {"error": "No job information found"}
        
        # Get first job
        job = jobs[0]
        skills = job.get('skills', [])
        
        # Find relevant portfolio links
        relevant_links = portfolio.query_links(skills)
        
        # Generate email
        email = chain.write_mail(job, relevant_links)
        
        return {
            "success": True,
            "job": job,
            "relevant_links": relevant_links,
            "email": email,
            "url": job_url
        }
        
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Please provide a job URL"}))
        sys.exit(1)
    
    job_url = sys.argv[1]
    result = generate_email(job_url)
    print(json.dumps(result))
`;
      
      fs.writeFileSync(pythonScript, pythonCode);
    }
  }
}

module.exports = new EmailService();
