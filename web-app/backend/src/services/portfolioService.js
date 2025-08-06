const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

class PortfolioService {
  constructor() {
    this.portfolioPath = path.join(__dirname, '..', '..', '..', 'data', 'my_portfolio.csv');
    this.portfolioData = null;
  }

  /**
   * Load portfolio data from CSV
   * @returns {Promise<Array>} Portfolio data
   */
  async loadPortfolioData() {
    if (this.portfolioData) {
      return this.portfolioData;
    }

    return new Promise((resolve, reject) => {
      const results = [];
      
      if (!fs.existsSync(this.portfolioPath)) {
        reject(new Error('Portfolio CSV file not found'));
        return;
      }

      fs.createReadStream(this.portfolioPath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          this.portfolioData = results;
          resolve(results);
        })
        .on('error', (error) => {
          reject(error);
        });
    });
  }

  /**
   * Get all portfolio data
   * @returns {Promise<Array>} All portfolio entries
   */
  async getPortfolioData() {
    return await this.loadPortfolioData();
  }

  /**
   * Find relevant portfolio links based on skills
   * @param {Array} skills - Array of skills to match
   * @returns {Promise<Array>} Relevant portfolio links
   */
  async getRelevantLinks(skills) {
    const portfolio = await this.loadPortfolioData();
    const relevantLinks = [];

    for (const entry of portfolio) {
      const techstack = entry.Techstack || entry.techstack || '';
      const links = entry.Links || entry.links || '';

      // Simple text matching for skills
      const hasRelevantSkill = skills.some(skill => 
        techstack.toLowerCase().includes(skill.toLowerCase())
      );

      if (hasRelevantSkill && links) {
        relevantLinks.push({
          techstack: techstack,
          link: links,
          matchedSkills: skills.filter(skill => 
            techstack.toLowerCase().includes(skill.toLowerCase())
          )
        });
      }
    }

    return relevantLinks;
  }
}

module.exports = new PortfolioService();
