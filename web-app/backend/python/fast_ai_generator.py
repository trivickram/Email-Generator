#!/usr/bin/env python3
"""
Fast AI Email Generator - prioritizes speed with fallbacks
"""
import sys
import json
import os
import time
from pathlib import Path

current_dir = Path(__file__).parent
sys.path.append(str(current_dir))

def load_env_vars():
    """Load environment variables"""
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
                break
    except ImportError:
        pass

def analyze_job_url(job_url):
    """Analyze job URL to extract context and requirements"""
    url_lower = job_url.lower()
    
    # Determine role based on URL
    if "senior" in url_lower and "python" in url_lower:
        role = "Senior Python Developer"
        skills = ["Python", "Django", "FastAPI", "PostgreSQL", "Redis", "AWS"]
        level = "Senior"
    elif "python" in url_lower:
        role = "Python Developer"
        skills = ["Python", "Django", "FastAPI", "REST APIs", "databases"]
        level = "Mid-level"
    elif "react" in url_lower or "frontend" in url_lower:
        role = "Frontend Developer" 
        skills = ["React", "JavaScript", "TypeScript", "CSS", "Node.js"]
        level = "Mid-level"
    elif "fullstack" in url_lower or "full-stack" in url_lower:
        role = "Full-Stack Developer"
        skills = ["React", "Python", "JavaScript", "PostgreSQL", "Docker"]
        level = "Mid-level"
    elif "data" in url_lower and "scientist" in url_lower:
        role = "Data Scientist"
        skills = ["Python", "Machine Learning", "Pandas", "NumPy", "TensorFlow"]
        level = "Mid-level"
    elif "embedded" in url_lower or ("c++" in url_lower):
        role = "Embedded Engineer"
        skills = ["C++", "C", "Embedded Systems", "RTOS", "Hardware"]
        level = "Mid-level"
    elif "devops" in url_lower:
        role = "DevOps Engineer"
        skills = ["Docker", "Kubernetes", "AWS", "CI/CD", "Python"]
        level = "Mid-level"
    else:
        role = "Software Engineer"
        skills = ["Python", "JavaScript", "React", "databases", "APIs"]
        level = "Mid-level"
    
    # Extract company hint
    company_hint = "your company"
    if "google" in url_lower:
        company_hint = "Google"
    elif "microsoft" in url_lower:
        company_hint = "Microsoft"
    elif "meta" in url_lower:
        company_hint = "Meta"
    elif "amazon" in url_lower:
        company_hint = "Amazon"
    
    return {
        "url": job_url,
        "role": role,
        "skills": skills,
        "level": level,
        "company": company_hint,
        "extracted_from": "url_analysis"
    }

def create_dynamic_prompt(job_url, job_context):
    """Create dynamic, job-specific prompt for LLaMA"""
    role = job_context["role"]
    skills = ", ".join(job_context["skills"][:4])
    company = job_context["company"]
    level = job_context["level"]
    
    prompt = f"""You are writing a personalized cold email for a job application. 

JOB DETAILS:
- Position: {role}
- Company: {company}
- Job URL: {job_url}
- Required Skills: {skills}
- Level: {level}

INSTRUCTIONS:
Write a professional cold email that:
1. Has a specific subject line mentioning the exact role
2. Shows you researched this specific company and role
3. Highlights relevant experience with the exact skills mentioned: {skills}
4. Mentions 1-2 specific portfolio projects that demonstrate these skills
5. Shows enthusiasm for this particular role and company
6. Includes a strong call-to-action
7. Is personalized and NOT generic

PORTFOLIO PROJECTS TO REFERENCE (adapt to be relevant):
- E-commerce Platform: Full-stack application with React frontend and Python backend
- Data Analytics Dashboard: Real-time analytics using Python, Pandas, and machine learning
- DevOps Automation: CI/CD pipeline with Docker, Kubernetes, and AWS deployment
- Mobile App: React Native app with Firebase backend and real-time features

TONE: Professional, enthusiastic, specific to this role and company

Generate a complete email (including subject line) that is specifically tailored to this {role} position at {company}. Make sure it doesn't sound generic and clearly shows knowledge of the role requirements."""

    return prompt

def generate_ai_email(job_url):
    """Generate email using AI with timeout and fallback"""
    try:
        load_env_vars()
        from groq import Groq
        
        api_key = os.getenv("GROQ_API_KEY")
        if not api_key or api_key == "your_groq_api_key_here":
            raise Exception("No valid API key")
            
        # Initialize Groq client with minimal parameters to avoid conflicts
        print(f"🔑 Using API key: {api_key[:8]}..." + "*" * (len(api_key) - 8), file=sys.stderr)
        client = Groq(api_key=api_key)  # Remove timeout parameter
        
        # Analyze job URL for better context
        job_context = analyze_job_url(job_url)
        print(f"🎯 Job analysis: {job_context}", file=sys.stderr)
        
        # Create dynamic, job-specific prompt
        prompt = create_dynamic_prompt(job_url, job_context)
        print(f"📝 Sending prompt to LLaMA: {prompt[:200]}...", file=sys.stderr)
        
        start_time = time.time()
        
        # Make API call with error handling
        print("🤖 Calling Groq API with LLaMA model...", file=sys.stderr)
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",  # Confirmed working model
            messages=[
                {"role": "system", "content": "You are a professional email writer who creates personalized cold emails for job applications. Always customize based on the specific job details provided."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.2,  # Slightly higher for more variation
            max_tokens=500,   # Increase for more detailed emails
            top_p=0.9
        )
        
        generation_time = time.time() - start_time
        email_content = response.choices[0].message.content.strip()
        
        print(f"✅ LLaMA generated {len(email_content)} chars in {generation_time:.2f}s", file=sys.stderr)
        print(f"📧 Email preview: {email_content[:100]}...", file=sys.stderr)
        
        return {
            "success": True,
            "job": job_context,
            "matched_projects": [
                {
                    "title": f"{job_context['role']} Portfolio Project",
                    "description": f"Relevant project showcasing {', '.join(job_context['skills'][:3])}",
                    "link": "https://github.com/user/portfolio"
                }
            ],
            "email": email_content,
            "url": job_url,
            "method": "groq_ai_llama",
            "generation_time": round(generation_time, 2),
            "model_used": "llama-3.1-8b-instant",
            "prompt_length": len(prompt)
        }
        
    except Exception as e:
        print(f"❌ AI generation failed: {str(e)}", file=sys.stderr)
        # Only fallback after logging the specific error
        return generate_smart_template(job_url, str(e))

def generate_smart_template(job_url, error_reason=None):
    """Generate smart template email based on URL analysis"""
    
    # Extract some context from URL
    url_lower = job_url.lower()
    company_hint = "the company"
    role_hint = "Software Developer"
    
    if "python" in url_lower:
        role_hint = "Python Developer"
        skills_focus = "Python development, FastAPI, Django, and data analysis"
    elif "javascript" in url_lower or "js" in url_lower or "react" in url_lower:
        role_hint = "Frontend Developer" 
        skills_focus = "JavaScript, React, and modern frontend development"
    elif "fullstack" in url_lower or "full-stack" in url_lower:
        role_hint = "Full-Stack Developer"
        skills_focus = "full-stack development with Python and React"
    else:
        skills_focus = "Python, JavaScript, React, and full-stack development"
    
    email_content = f"""Subject: Application for {role_hint} Position

Dear Hiring Manager,

I am writing to express my strong interest in the {role_hint} position at {company_hint}. I discovered this opportunity through {job_url} and am excited about the possibility of contributing to your team.

My technical expertise includes {skills_focus}. I have successfully delivered several projects that demonstrate these skills:

• E-commerce Platform: A full-stack application built with React and Python, featuring user authentication, payment processing, and responsive design
• Data Analytics Dashboard: Interactive visualization tool using Python, Pandas, and Streamlit for real-time business insights

I am particularly drawn to this role because it aligns perfectly with my passion for building scalable, user-focused applications. I would welcome the opportunity to discuss how my skills and enthusiasm can contribute to your team's success.

Thank you for your consideration. I look forward to hearing from you.

Best regards,
[Your Name]"""

    result = {
        "success": True,
        "job": {
            "url": job_url,
            "role": role_hint,
            "inferred_skills": skills_focus.split(", ")
        },
        "matched_projects": [
            {
                "title": "E-commerce Platform", 
                "description": "Full-stack application with React and Python",
                "link": "https://github.com/user/ecommerce"
            },
            {
                "title": "Data Analytics Dashboard",
                "description": "Interactive visualization with Python and Streamlit", 
                "link": "https://github.com/user/analytics"
            }
        ],
        "email": email_content,
        "url": job_url,
        "method": "smart_template"
    }
    
    if error_reason:
        result["ai_fallback_reason"] = error_reason
        
    return result

def main():
    if len(sys.argv) < 2:
        result = {"success": False, "error": "Invalid arguments"}
        print(json.dumps(result))
        sys.exit(1)
    
    command = sys.argv[1]
    
    if command == "generate":
        if len(sys.argv) != 3:
            result = {"success": False, "error": "Please provide a job URL"}
        else:
            job_url = sys.argv[2]
            result = generate_ai_email(job_url)
    
    elif command == "test":
        load_env_vars()
        api_key = os.getenv("GROQ_API_KEY")
        result = {
            "success": True,
            "message": "Fast AI email generator test",
            "api_key_configured": bool(api_key and api_key != "your_groq_api_key_here"),
            "mode": "ai_with_smart_fallback"
        }
    
    else:
        result = {"success": False, "error": f"Unknown command: {command}"}
    
    print(json.dumps(result))

if __name__ == "__main__":
    main()
