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
    print()
    print("🌐 To get your FREE GROQ API key:")
    print("   1. Go to: https://groq.com/")
    print("   2. Click 'Sign Up' (it's free!)")
    print("   3. Go to 'API Keys' section")
    print("   4. Click 'Create API Key'")
    print("   5. Copy the key that starts with 'gsk_...'")
    print()
    
    api_key = input("Enter your GROQ API key (or press Enter to skip): ").strip()
    
    if not api_key:
        print("⚠  No API key provided. You can add it later by running this script again.")
        api_key = "your_groq_api_key_here"
        print("📝 Using placeholder - remember to update it later!")
    else:
        if not api_key.startswith('gsk_'):
            print("⚠  Warning: GROQ API keys usually start with 'gsk_'")
            confirm = input("Continue anyway? (y/N): ").strip().lower()
            if confirm != 'y':
                print("❌ Setup cancelled. Please run again with correct API key.")
                return False
        print("✅ API key provided!")
    
    # Update main .env file
    main_env = Path(_file_).parent / ".env"
    update_env_file(main_env, api_key)
    
    # Update backend .env file
    backend_env = Path(_file_).parent / "web-app" / "backend" / ".env"
    update_env_file(backend_env, api_key)
    
    # Update streamlit-app .env file
    streamlit_env = Path(_file_).parent / "streamlit-app" / ".env"
    update_env_file(streamlit_env, api_key)
    
    print()
    print("✅ GROQ API key updated in all .env files!")
    
    if api_key != "your_groq_api_key_here":
        print("🎉 AI email generation is now ready!")
    else:
        print("⚠  Remember to get your API key from https://groq.com/ and run this script again")
    
    return True

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

if _name_ == "_main_":
    success = setup_groq_api_key()
    if success:
        print()
        input("Press Enter to continue...")
    else:
        input("Press Enter to exit...")