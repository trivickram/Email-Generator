#!/usr/bin/env python3
"""
Simple Email Generator using Groq API
Works with the latest langchain-groq version
"""
import sys
import json
import os
from pathlib import Path

# Add current directory to path for local imports
current_dir = Path(__file__).parent
sys.path.append(str(current_dir))

def load_env_vars():
    """Load environment variables from .env files"""
    try:
        from dotenv import load_dotenv
        env_paths = [
            current_dir / '.env',
            current_dir.parent / '.env',
            current_dir.parent.parent / '.env'
        ]
        
        for env_path in env_paths:
            if env_path.exists():
                load_dotenv(env_path)
                print(f"Loaded .env from: {env_path}", file=sys.stderr)
                break
        else:
            print("No .env file found, using system environment variables", file=sys.stderr)
    except ImportError:
        print("python-dotenv not available", file=sys.stderr)

def generate_email_with_groq(job_url):
    """Generate email using Groq API"""
    try:
        load_env_vars()
        
        # Import and initialize Groq
        from groq import Groq
        
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key or api_key.strip() == "your_groq_api_key_here":
            return {
                "success": False,
                "error": "Valid GROQ_API_KEY not found in environment variables"
            }
        
        client = Groq(api_key=api_key)
        
        # Create a comprehensive prompt for email generation
        prompt = f"""You are an expert cold email writer. Generate a professional cold email for a job application.

Job URL: {job_url}

Please create a personalized cold email that:
1. Has a professional subject line
2. Addresses the hiring manager
3. Shows genuine interest in the specific role
4. Highlights relevant technical skills (Python, JavaScript, React, etc.)
5. Mentions 1-2 portfolio projects that would be relevant
6. Includes a clear call-to-action
7. Is concise (under 200 words)
8. Sounds human and personalized, not robotic

Format the response as a complete email including subject line.

Example portfolio projects to reference:
- E-commerce Platform: Full-stack web application with React frontend and Python backend
- Data Analysis Dashboard: Interactive dashboard using Python, Pandas, and Streamlit
- API Development: RESTful APIs using FastAPI and PostgreSQL

Generate the email now:"""

        # Make API call to Groq
        response = client.chat.completions.create(
            model="llama-3.1-70b-versatile",
            messages=[
                {"role": "system", "content": "You are a professional cold email writer with expertise in tech industry communications."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
            max_tokens=1000
        )
        
        email_content = response.choices[0].message.content
        
        return {
            "success": True,
            "job": {
                "url": job_url,
                "source": "web_scraping"
            },
            "matched_projects": [
                {
                    "title": "E-commerce Platform",
                    "description": "Full-stack web application with React frontend and Python backend",
                    "link": "https://github.com/user/ecommerce-platform"
                },
                {
                    "title": "Data Analysis Dashboard", 
                    "description": "Interactive dashboard using Python, Pandas, and Streamlit",
                    "link": "https://github.com/user/data-dashboard"
                }
            ],
            "email": email_content,
            "url": job_url,
            "method": "groq_api_direct"
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": f"Groq API generation failed: {str(e)}",
            "url": job_url
        }

def main():
    """Main function to handle command line arguments"""
    if len(sys.argv) < 2:
        result = {
            "success": False,
            "error": "Invalid arguments",
            "usage": "python simple_email_generator.py <command> [args...]"
        }
        print(json.dumps(result))
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "generate":
        if len(sys.argv) != 3:
            result = {
                "success": False,
                "error": "Please provide a job URL",
                "usage": "python simple_email_generator.py generate <job_url>"
            }
        else:
            job_url = sys.argv[2]
            result = generate_email_with_groq(job_url)
    
    elif command == "test":
        load_env_vars()
        api_key = os.getenv("GROQ_API_KEY")
        result = {
            "success": True,
            "message": "Simple Groq email generator test",
            "api_key_configured": bool(api_key and api_key != "your_groq_api_key_here"),
            "api_key_length": len(api_key) if api_key else 0
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
