#!/usr/bin/env python3
"""
Cold Email Generator - Startup Script
Run this script to start the Streamlit application
"""

import os
import sys
import subprocess

def main():
    print("🚀 Starting Cold Email Generator...")
    print("📍 Current directory:", os.getcwd())
    
    # Check if we're in the right directory
    if not os.path.exists("main.py"):
        print("❌ Error: main.py not found. Please run this script from the app directory.")
        return
    
    # Check if .env file exists
    if not os.path.exists(".env"):
        print("❌ Error: .env file not found. Please create it with your GROQ_API_KEY.")
        return
    
    print("✅ Environment check passed!")
    print("🌐 Starting Streamlit server...")
    print("📧 Once started, open http://localhost:8501 in your browser")
    print("⏹️  Press Ctrl+C to stop the server")
    print("-" * 50)
    
    try:
        # Start Streamlit
        subprocess.run([sys.executable, "-m", "streamlit", "run", "main.py"])
    except KeyboardInterrupt:
        print("\n👋 Application stopped by user")
    except Exception as e:
        print(f"❌ Error starting application: {e}")

if __name__ == "__main__":
    main()
