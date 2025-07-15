#!/usr/bin/env python3
"""
Simplified email generator for production deployment
Works with minimal dependencies
"""
import sys
import json
import os
import logging
from datetime import datetime

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def generate_simple_email(job_url, skills=None):
    """
    Generate a simple cold email template
    """
    if not skills:
        skills = ["Python", "JavaScript", "Web Development"]
    
    # Simple template for now
    email_template = f"""
Subject: Excited About Your Open Position

Dear Hiring Manager,

I hope this email finds you well. I came across your job posting ({job_url}) and I'm very excited about the opportunity to contribute to your team.

With my experience in {', '.join(skills[:3])}, I believe I would be a great fit for this role. I'm passionate about delivering high-quality solutions and would love to discuss how my skills can benefit your organization.

I would welcome the opportunity to speak with you about this position. Thank you for your time and consideration.

Best regards,
[Your Name]
    """.strip()
    
    return {
        "success": True,
        "email": email_template,
        "subject": "Excited About Your Open Position",
        "generated_at": datetime.now().isoformat(),
        "skills_used": skills[:3]
    }

def main():
    try:
        if len(sys.argv) < 3:
            result = {
                "success": False,
                "error": "Usage: python simple_email_generator.py generate <job_url> [skills]"
            }
            print(json.dumps(result))
            sys.exit(1)
        
        action = sys.argv[1]
        job_url = sys.argv[2]
        
        # Parse skills if provided
        skills = []
        if len(sys.argv) > 3:
            skills_arg = sys.argv[3]
            if skills_arg.startswith('[') and skills_arg.endswith(']'):
                # Handle JSON array format
                try:
                    skills = json.loads(skills_arg)
                except json.JSONDecodeError:
                    skills = skills_arg.strip('[]').split(',')
            else:
                skills = [s.strip() for s in skills_arg.split(',')]
        
        if action == "generate":
            result = generate_simple_email(job_url, skills)
            print(json.dumps(result))
        else:
            result = {
                "success": False,
                "error": f"Unknown action: {action}"
            }
            print(json.dumps(result))
            sys.exit(1)
            
    except Exception as e:
        logger.error(f"Error generating email: {e}")
        result = {
            "success": False,
            "error": str(e),
            "timestamp": datetime.now().isoformat()
        }
        print(json.dumps(result))
        sys.exit(1)

if __name__ == "__main__":
    main()
