#!/usr/bin/env python3

import sys
import os
import subprocess
from pathlib import Path

def detect_python_path():
    print("🔍 Detecting Python installation...")
    print("=" * 50)
    
    # Get current Python executable
    current_python = sys.executable
    print(f"✅ Current Python executable: {current_python}")
    
    # Get Python version
    version = sys.version.split()[0]
    print(f"📦 Python version: {version}")
    
    # Convert path to forward slashes for .env file
    env_path = current_python.replace('\\', '/')
    print(f"🔧 Path for .env file: {env_path}")
    
    return env_path

def update_env_file(python_path):
    """Update the .env file with the correct Python path"""
    env_file = Path(_file_).parent / "web-app" / "backend" / ".env"
    
    if not env_file.exists():
        print("\n⚠  Creating new .env file...")
        env_content = f"""# GROQ API Configuration (REQUIRED)
GROQ_API_KEY=your_actual_groq_api_key_here

# Server Configuration
NODE_ENV=development
PORT=4000

# Frontend Configuration  
FRONTEND_URL=http://localhost:3000

# Python Configuration
PYTHON_PATH="{python_path}"
PYTHONPATH="./python"

# Optional: Rate limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: Logging
LOG_LEVEL=info
"""
        with open(env_file, 'w') as f:
            f.write(env_content)
        print(f"✅ Created .env file at: {env_file}")
    else:
        # Update existing .env file
        with open(env_file, 'r') as f:
            content = f.read()
        
        lines = content.split('\n')
        updated_python_path = False
        updated_pythonpath = False
        
        for i, line in enumerate(lines):
            if line.startswith('PYTHON_PATH='):
                lines[i] = f'PYTHON_PATH="{python_path}"'
                updated_python_path = True
            elif line.startswith('PYTHONPATH='):
                lines[i] = 'PYTHONPATH="./python"'
                updated_pythonpath = True
        
        if not updated_python_path:
            lines.append(f'PYTHON_PATH="{python_path}"')
        if not updated_pythonpath:
            lines.append('PYTHONPATH="./python"')
        
        # Add other required settings if missing
        content_str = '\n'.join(lines)
        if 'NODE_ENV=' not in content_str:
            lines.append('NODE_ENV=development')
        if 'PORT=' not in content_str:
            lines.append('PORT=4000')
        if 'FRONTEND_URL=' not in content_str:
            lines.append('FRONTEND_URL=http://localhost:3000')
        
        with open(env_file, 'w') as f:
            f.write('\n'.join(lines))
        
        print(f"✅ Updated .env file at: {env_file}")
    
    print("\n🎯 Configuration complete!")
    print("✅ Python path configured")
    print("✅ Environment variables set")
    print("✅ Ready to start the application!")

def main():
    """Main function"""
    try:
        python_path = detect_python_path()
        update_env_file(python_path)
        
        print("\n" + "=" * 50)
        print("🎉 Python path detection complete!")
        print("=" * 50)
        
    except Exception as e:
        print(f"\n❌ Error: {e}")
        print("Please manually update the PYTHON_PATH in web-app/backend/.env")

if _name_ == "_main_":
    main()
    input("\nPress Enter to continue...")