#!/usr/bin/env python3
"""
Quick test to check if GROQ_API_KEY is available
"""
import os
import sys
import json

def test_groq_key():
    groq_key = os.getenv("GROQ_API_KEY")
    
    result = {
        "groq_api_key_set": bool(groq_key),
        "groq_api_key_length": len(groq_key) if groq_key else 0,
        "environment_vars": list(os.environ.keys())[:10]  # First 10 env vars
    }
    
    print(json.dumps(result, indent=2))

if __name__ == "__main__":
    test_groq_key()
