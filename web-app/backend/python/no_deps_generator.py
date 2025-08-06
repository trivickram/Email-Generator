#!/usr/bin/env python3
"""
No dependencies email generator for testing
"""
import sys
import json
import os

def generate_email_simple(job_url):
    """Generate a simple email without AI dependencies"""
    return {
        "success": True,
        "job": {
            "role": "Software Developer",
            "company": "Tech Company",
            "skills": ["Python", "JavaScript", "React"]
        },
        "matched_projects": [
            {
                "title": "Portfolio Website",
                "description": "A React-based portfolio showcasing web development skills",
                "link": "https://github.com/user/portfolio"
            }
        ],
        "email": f"""Subject: Application for Software Developer Position

Dear Hiring Manager,

I am writing to express my interest in the Software Developer position at your company. I found the job posting at {job_url} and believe my skills align well with your requirements.

My experience includes:
- Python development for backend services
- JavaScript and React for frontend applications
- Full-stack web development

I have attached my portfolio project which demonstrates these skills:
- Portfolio Website: A React-based portfolio showcasing web development skills
  GitHub: https://github.com/user/portfolio

I would welcome the opportunity to discuss how my skills could contribute to your team.

Best regards,
[Your Name]
        """.strip(),
        "url": job_url,
        "method": "simple_template"
    }

def main():
    if len(sys.argv) < 2:
        result = {
            "success": False,
            "error": "Invalid arguments",
            "usage": "python no_deps_generator.py <command> [args...]"
        }
        print(json.dumps(result))
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "generate":
        if len(sys.argv) != 3:
            result = {
                "success": False,
                "error": "Please provide a job URL",
                "usage": "python no_deps_generator.py generate <job_url>"
            }
        else:
            job_url = sys.argv[2]
            result = generate_email_simple(job_url)
    
    elif command == "test":
        result = {
            "success": True,
            "message": "No dependencies generator test",
            "python_version": sys.version,
            "script_mode": "simple_template",
            "dependencies_required": False
        }
    
    else:
        result = {
            "success": False,
            "error": f"Unknown command: {command}",
            "available_commands": ["generate", "test"]
        }
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
