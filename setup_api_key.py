#!/usr/bin/env python3
"""
Setup script for Cold Email Generator
This script helps users configure their API key securely
"""

import os
import shutil
from pathlib import Path

def setup_api_key():
    """Setup API key in .env file"""
    print("🔧 Cold Email Generator Setup")
    print("=" * 50)
    
    # Check if .env file exists
    env_file = Path(".env")
    if not env_file.exists():
        print("❌ .env file not found!")
        print("📝 Creating .env file...")
        
        # Create .env file
        env_content = """# Environment variables for Cold Email Generator
# Get your free API key from: https://console.groq.com/keys
GROQ_API_KEY=your_api_key_here

# Optional: Set user agent for web scraping
USER_AGENT=ColdEmailGenerator/1.0
"""
        with open(env_file, 'w') as f:
            f.write(env_content)
        print("✅ .env file created!")
    
    # Check if API key is set
    with open(env_file, 'r') as f:
        content = f.read()
    
    if "your_api_key_here" in content:
        print("\n🔑 API Key Configuration")
        print("Your .env file needs to be configured with your actual Groq API key.")
        print("1. Go to: https://console.groq.com/keys")
        print("2. Create a free account and generate an API key")
        print("3. Replace 'your_api_key_here' in the .env file with your actual key")
        print("\n⚠️  IMPORTANT: Never commit your .env file to version control!")
        print("The .env file is already in .gitignore to prevent accidental commits.")
    else:
        print("✅ API key appears to be configured in .env file")
    
    # Setup streamlit secrets template
    streamlit_dir = Path(".streamlit")
    secrets_file = streamlit_dir / "secrets.toml"
    template_file = streamlit_dir / "secrets.toml.template"
    
    if not secrets_file.exists() and template_file.exists():
        print("\n📝 Setting up Streamlit secrets...")
        shutil.copy(template_file, secrets_file)
        print("✅ Streamlit secrets template copied!")
        print("Note: The app will prioritize .env file over secrets.toml")
    
    print("\n🚀 Setup Complete!")
    print("You can now run the app with: streamlit run streamlit-app/main.py")

if __name__ == "__main__":
    setup_api_key()
