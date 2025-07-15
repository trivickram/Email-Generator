#!/usr/bin/env python3
"""
Python API bridge for Cold Email Generator web application
Connects Node.js backend to existing Python modules
"""
import sys
import json
import os
from pathlib import Path

# Add current directory to path for local imports
current_dir = Path(__file__).parent
sys.path.append(str(current_dir))

# Load environment variables
try:
    from dotenv import load_dotenv
    # Load .env from current directory or parent directories
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
    print("python-dotenv not available, using system environment variables", file=sys.stderr)
    # Don't exit - this is not a fatal error, just means we'll use system env vars

try:
    from chains import Chain
    from portfolio import Portfolio
    from utils import clean_text
    from langchain_community.document_loaders import WebBaseLoader
except ImportError as e:
    error_result = {
        "success": False,
        "error": f"Import error: {str(e)}",
        "details": "Make sure all dependencies are installed and paths are correct",
        "python_path": str(sys.path),
        "current_dir": str(Path.cwd()),
        "script_dir": str(current_dir)
    }
    print(json.dumps(error_result))
    sys.exit(1)

def generate_email(job_url):
    """
    Generate cold email from job URL
    """
    try:
        print(f"Starting email generation for URL: {job_url}", file=sys.stderr)
        
        # Initialize components
        chain = Chain()
        portfolio = Portfolio()
        
        print("Initialized Chain and Portfolio", file=sys.stderr)
        
        # Load portfolio
        portfolio.load_portfolio()
        print("Loaded portfolio", file=sys.stderr)
        
        # Scrape and clean job data
        loader = WebBaseLoader([job_url])
        raw_data = loader.load()[0].page_content
        cleaned_data = clean_text(raw_data)
        
        print("Scraped and cleaned job data", file=sys.stderr)
        
        # Extract job information
        jobs = chain.extract_jobs(cleaned_data)
        
        if not jobs:
            return {
                "success": False,
                "error": "No job information found",
                "url": job_url
            }
        
        print(f"Extracted {len(jobs)} jobs", file=sys.stderr)
        
        # Get first job
        job = jobs[0]
        skills = job.get('skills', [])
        
        print(f"Job skills: {skills}", file=sys.stderr)
        
        # Find relevant portfolio links
        relevant_links = portfolio.query_links(skills)
        
        print(f"Found {len(relevant_links)} relevant links", file=sys.stderr)
        
        # Generate email
        email = chain.write_mail(job, relevant_links)
        
        print("Generated email successfully", file=sys.stderr)
        
        return {
            "success": True,
            "job": job,
            "matched_projects": relevant_links,
            "email": email,
            "url": job_url
        }
        
    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error in generate_email: {error_details}", file=sys.stderr)
        return {
            "success": False,
            "error": str(e),
            "details": error_details,
            "url": job_url
        }

def get_portfolio_data():
    """
    Get portfolio data
    """
    try:
        portfolio = Portfolio()
        portfolio.load_portfolio()
        data = portfolio.data.to_dict('records') if hasattr(portfolio, 'data') else []
        
        return {
            "success": True,
            "data": data,
            "count": len(data)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }

def get_relevant_links(skills_list):
    """
    Get relevant portfolio links for skills
    """
    try:
        portfolio = Portfolio()
        portfolio.load_portfolio()
        
        relevant_links = portfolio.query_links(skills_list)
        
        return {
            "success": True,
            "skills": skills_list,
            "links": relevant_links,
            "count": len(relevant_links)
        }
        
    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "skills": skills_list
        }

def main():
    """
    Main function to handle command line arguments
    """
    if len(sys.argv) < 2:
        result = {
            "success": False,
            "error": "Invalid arguments",
            "usage": "python email_api.py <command> [args...]",
            "commands": {
                "generate": "python email_api.py generate <job_url>",
                "portfolio": "python email_api.py portfolio",
                "skills": "python email_api.py skills <skill1,skill2,skill3>",
                "test": "python email_api.py test"
            }
        }
        print(json.dumps(result))
        sys.exit(1)
    
    command = sys.argv[1]
    
    # Only check GROQ_API_KEY for commands that actually need it
    if command in ["generate"] and not os.getenv("GROQ_API_KEY"):
        result = {
            "success": False,
            "error": "GROQ_API_KEY environment variable is not set",
            "details": "Please set the GROQ_API_KEY environment variable on your deployment platform"
        }
        print(json.dumps(result))
        sys.exit(1)
    
    if command == "generate":
        if len(sys.argv) != 3:
            result = {
                "success": False,
                "error": "Please provide a job URL",
                "usage": "python email_api.py generate <job_url>"
            }
        else:
            job_url = sys.argv[2]
            result = generate_email(job_url)
    
    elif command == "portfolio":
        result = get_portfolio_data()
    
    elif command == "test":
        # Test environment and dependencies
        result = {
            "success": True,
            "message": "Python environment test",
            "python_version": sys.version,
            "python_path": sys.executable,
            "current_dir": str(Path.cwd()),
            "script_dir": str(current_dir),
            "groq_api_key_set": bool(os.getenv("GROQ_API_KEY")),
            "groq_api_key_length": len(os.getenv("GROQ_API_KEY", "")),
            "environment_variables": {
                "PATH": bool(os.getenv("PATH")),
                "PYTHON_PATH": os.getenv("PYTHON_PATH", "not set"),
                "NODE_ENV": os.getenv("NODE_ENV", "not set")
            },
            "dependencies": {}
        }
        
        # Test imports
        try:
            import langchain
            result["dependencies"]["langchain"] = f"✓ Available - version: {getattr(langchain, '__version__', 'unknown')}"
        except ImportError as e:
            result["dependencies"]["langchain"] = f"✗ Missing: {e}"
            
        try:
            import groq
            result["dependencies"]["groq"] = f"✓ Available - version: {getattr(groq, '__version__', 'unknown')}"
        except ImportError as e:
            result["dependencies"]["groq"] = f"✗ Missing: {e}"
            
        try:
            import chromadb
            result["dependencies"]["chromadb"] = f"✓ Available - version: {getattr(chromadb, '__version__', 'unknown')}"
        except ImportError as e:
            result["dependencies"]["chromadb"] = f"✗ Missing: {e}"
            
        try:
            from chains import Chain
            result["dependencies"]["chains"] = "✓ Available"
        except ImportError as e:
            result["dependencies"]["chains"] = f"✗ Missing: {e}"
            
        try:
            from portfolio import Portfolio
            result["dependencies"]["portfolio"] = "✓ Available"
        except ImportError as e:
            result["dependencies"]["portfolio"] = f"✗ Missing: {e}"
            
        try:
            from dotenv import load_dotenv
            result["dependencies"]["python-dotenv"] = "✓ Available"
        except ImportError as e:
            result["dependencies"]["python-dotenv"] = f"✗ Missing: {e}"
    
    elif command == "skills":
        if len(sys.argv) != 3:
            result = {
                "success": False,
                "error": "Please provide skills",
                "usage": "python email_api.py skills <skill1,skill2,skill3>"
            }
        else:
            skills_string = sys.argv[2]
            skills_list = [skill.strip() for skill in skills_string.split(',')]
            result = get_relevant_links(skills_list)
    
    else:
        result = {
            "success": False,
            "error": f"Unknown command: {command}",
            "available_commands": ["generate", "portfolio", "skills", "test"]
        }
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
