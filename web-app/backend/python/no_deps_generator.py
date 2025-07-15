#!/usr/bin/env python3
"""
No-dependency email generator
Works with only Python standard library
"""
import sys
import json
import re
import urllib.request
import urllib.parse
from datetime import datetime

def extract_job_info(job_url):
    """Extract basic job information from URL"""
    try:
        # Try to fetch the page content
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
        req = urllib.request.Request(job_url, headers=headers)
        
        with urllib.request.urlopen(req, timeout=10) as response:
            content = response.read().decode('utf-8', errors='ignore')
            
        # Extract basic information using regex
        job_info = {
            'company': extract_company_name(content, job_url),
            'title': extract_job_title(content),
            'keywords': extract_keywords(content)
        }
        
        return job_info
        
    except Exception as e:
        # Fallback to URL-based extraction
        return extract_from_url(job_url)

def extract_company_name(content, url):
    """Extract company name from content or URL"""
    # Try common patterns in content
    patterns = [
        r'<title[^>]*>([^|<]+?)(?:\s*[-|]\s*)',
        r'"hiringOrganization"[^}]*"name"[^"]*"([^"]+)"',
        r'company["\s]*:["\s]*([^",}]+)',
        r'<h1[^>]*company[^>]*>([^<]+)</h1>'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            company = match.group(1).strip()
            if len(company) > 2 and len(company) < 100:
                return company
    
    # Extract from URL as fallback
    if 'linkedin.com' in url:
        return 'LinkedIn Company'
    elif 'indeed.com' in url:
        return 'Indeed Company'
    elif 'glassdoor.com' in url:
        return 'Glassdoor Company'
    else:
        # Try to extract domain name
        try:
            from urllib.parse import urlparse
            domain = urlparse(url).netloc
            return domain.replace('www.', '').replace('.com', '').title()
        except:
            return 'The Company'

def extract_job_title(content):
    """Extract job title from content"""
    patterns = [
        r'<title[^>]*>([^|<-]+?)(?:\s*[-|]\s*)',
        r'"title"[^"]*"([^"]+)"',
        r'<h1[^>]*>([^<]+)</h1>',
        r'job[_-]?title["\s]*:["\s]*([^",}]+)'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, content, re.IGNORECASE)
        if match:
            title = match.group(1).strip()
            if len(title) > 5 and len(title) < 200:
                return title
    
    return 'Software Developer'

def extract_keywords(content):
    """Extract relevant keywords from job content"""
    # Common tech keywords to look for
    tech_keywords = [
        'Python', 'JavaScript', 'React', 'Node.js', 'Java', 'TypeScript',
        'AWS', 'Docker', 'Kubernetes', 'Git', 'SQL', 'MongoDB',
        'Machine Learning', 'AI', 'Data Science', 'Frontend', 'Backend',
        'Full Stack', 'DevOps', 'Agile', 'Scrum'
    ]
    
    found_keywords = []
    content_lower = content.lower()
    
    for keyword in tech_keywords:
        if keyword.lower() in content_lower:
            found_keywords.append(keyword)
    
    return found_keywords[:5]  # Return top 5

def extract_from_url(url):
    """Extract basic info from URL when content fetch fails"""
    if 'linkedin.com' in url:
        company = 'LinkedIn Company'
    elif 'indeed.com' in url:
        company = 'Indeed Company' 
    elif 'glassdoor.com' in url:
        company = 'Glassdoor Company'
    else:
        company = 'The Company'
    
    return {
        'company': company,
        'title': 'Software Developer',
        'keywords': ['Python', 'JavaScript', 'Software Development']
    }

def generate_personalized_email(job_info, user_skills):
    """Generate a personalized email based on job info and user skills"""
    company = job_info.get('company', 'The Company')
    title = job_info.get('title', 'Software Developer')
    job_keywords = job_info.get('keywords', [])
    
    # Match user skills with job keywords
    matching_skills = []
    if user_skills:
        for skill in user_skills:
            if any(skill.lower() in keyword.lower() or keyword.lower() in skill.lower() 
                   for keyword in job_keywords):
                matching_skills.append(skill)
    
    # Use top skills if no matches
    if not matching_skills and user_skills:
        matching_skills = user_skills[:3]
    elif not matching_skills:
        matching_skills = job_keywords[:3]
    
    # Generate subject line
    subject = f"Application for {title} at {company}"
    
    # Generate email body
    skills_text = ', '.join(matching_skills) if matching_skills else 'software development'
    
    email_body = f"""Dear {company} Hiring Team,

I hope this email finds you well. I am writing to express my strong interest in the {title} position at {company}.

With my experience in {skills_text}, I am confident that I would be a valuable addition to your team. I am particularly excited about this opportunity because:

• My technical skills align well with your requirements
• I am passionate about delivering high-quality solutions
• I thrive in collaborative environments and enjoy tackling challenging problems

I would welcome the opportunity to discuss how my background and enthusiasm can contribute to {company}'s continued success. I am available for an interview at your convenience.

Thank you for considering my application. I look forward to hearing from you.

Best regards,
[Your Name]
[Your Email]
[Your Phone]"""

    return {
        'subject': subject,
        'body': email_body,
        'company': company,
        'title': title,
        'matching_skills': matching_skills
    }

def main():
    try:
        if len(sys.argv) < 3:
            result = {
                "success": False,
                "error": "Usage: python no_deps_generator.py generate <job_url> [skills_json]"
            }
            print(json.dumps(result))
            sys.exit(1)
        
        action = sys.argv[1]
        job_url = sys.argv[2]
        
        # Parse skills if provided
        user_skills = []
        if len(sys.argv) > 3:
            try:
                user_skills = json.loads(sys.argv[3])
            except json.JSONDecodeError:
                # Try parsing as comma-separated
                user_skills = [s.strip() for s in sys.argv[3].split(',')]
        
        if action == "generate":
            # Extract job information
            job_info = extract_job_info(job_url)
            
            # Generate personalized email
            email_data = generate_personalized_email(job_info, user_skills)
            
            result = {
                "success": True,
                "email": email_data['body'],
                "subject": email_data['subject'],
                "company": email_data['company'],
                "job_title": email_data['title'],
                "skills_used": email_data['matching_skills'],
                "generated_at": datetime.now().isoformat(),
                "method": "no_dependencies",
                "job_url": job_url
            }
            
            print(json.dumps(result))
        else:
            result = {
                "success": False,
                "error": f"Unknown action: {action}"
            }
            print(json.dumps(result))
            sys.exit(1)
            
    except Exception as e:
        result = {
            "success": False,
            "error": f"Error generating email: {str(e)}",
            "timestamp": datetime.now().isoformat(),
            "method": "no_dependencies"
        }
        print(json.dumps(result))
        sys.exit(1)

if __name__ == "__main__":
    main()
