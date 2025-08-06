#!/usr/bin/env python3
"""
Setup script to configure GROQ API key
"""
import os
import sys
from pathlib import Path

def setup_groq_api_key():
    """Setup GROQ API key in environment files"""
    print("🔧 GROQ API Key Setup")
    print("=" * 50)
    
    api_key = input("Enter your GROQ API key (or press Enter to skip): ").strip()
    
    if not api_key:
        print("⚠️  No API key provided. Using placeholder.")
        api_key = "your_groq_api_key_here"
    else:
        print("✅ API key provided!")
    
    # Update main .env file
    main_env = Path(__file__).parent / ".env"
    update_env_file(main_env, api_key)
    
    # Update backend .env file
    backend_env = Path(__file__).parent / "web-app" / "backend" / ".env"
    update_env_file(backend_env, api_key)
    
    # Update streamlit-app .env file
    streamlit_env = Path(__file__).parent / "streamlit-app" / ".env"
    update_env_file(streamlit_env, api_key)
    
    print("✅ GROQ API key updated in all .env files!")
    print("🚀 You can now start the application with start-app.bat")

def update_env_file(env_path, api_key):
    """Update GROQ_API_KEY in an .env file"""
    env_path.parent.mkdir(exist_ok=True)
    
    if env_path.exists():
        # Read existing content
        with open(env_path, 'r') as f:
            lines = f.readlines()
        
        # Update GROQ_API_KEY line
        updated = False
        for i, line in enumerate(lines):
            if line.startswith('GROQ_API_KEY='):
                lines[i] = f'GROQ_API_KEY={api_key}\n'
                updated = True
                break
        
        if not updated:
            lines.append(f'GROQ_API_KEY={api_key}\n')
            
        with open(env_path, 'w') as f:
            f.writelines(lines)
    else:
        # Create new .env file
        with open(env_path, 'w') as f:
            f.write(f'GROQ_API_KEY={api_key}\n')
    
    print(f"📝 Updated {env_path}")

if __name__ == "__main__":
    setup_groq_api_key()
