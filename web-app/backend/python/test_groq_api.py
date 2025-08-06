#!/usr/bin/env python3
"""
Quick Groq API test
"""
import os
from pathlib import Path

# Load environment
current_dir = Path(__file__).parent
env_paths = [
    current_dir / '.env',
    current_dir.parent / '.env',
    current_dir.parent.parent / '.env'
]

for env_path in env_paths:
    if env_path.exists():
        from dotenv import load_dotenv
        load_dotenv(env_path)
        print(f"Loaded .env from: {env_path}")
        break

try:
    from groq import Groq
    
    api_key = os.getenv("GROQ_API_KEY")
    print(f"API key found: {bool(api_key)}")
    print(f"API key length: {len(api_key) if api_key else 0}")
    
    if api_key and api_key != "your_groq_api_key_here":
        client = Groq(api_key=api_key)
        
        print("Testing Groq API...")
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "user", "content": "Write a very short professional email subject line for a software developer job application."}
            ],
            max_tokens=50,
            temperature=0.1
        )
        
        result = response.choices[0].message.content
        print(f"✅ Success! Response: {result}")
        
    else:
        print("❌ No valid API key found")
        
except Exception as e:
    print(f"❌ Error: {e}")
