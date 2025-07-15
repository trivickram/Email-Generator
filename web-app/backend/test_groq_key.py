#!/usr/bin/env python3
"""
Simple script to test GROQ API key functionality
"""
import os
import sys
import json

def test_groq_api():
    """Test if GROQ API key is working"""
    try:
        from langchain_groq import ChatGroq
        from dotenv import load_dotenv
        
        # Load environment variables
        load_dotenv()
        
        groq_api_key = os.getenv('GROQ_API_KEY')
        if not groq_api_key:
            return {
                "success": False,
                "error": "GROQ_API_KEY environment variable not found"
            }
        
        # Initialize ChatGroq
        llm = ChatGroq(
            groq_api_key=groq_api_key,
            model_name="llama-3.1-8b-instant",  # Updated to current model
            temperature=0.7
        )
        
        # Test with a simple message
        response = llm.invoke("Hello! Please respond with just 'API Working' if you can see this.")
        
        return {
            "success": True,
            "message": "GROQ API key is working",
            "response": str(response.content)[:100] + "..." if len(str(response.content)) > 100 else str(response.content)
        }
        
    except ImportError as e:
        return {
            "success": False,
            "error": f"Missing dependencies: {str(e)}"
        }
    except Exception as e:
        return {
            "success": False,
            "error": f"GROQ API test failed: {str(e)}"
        }

if __name__ == "__main__":
    result = test_groq_api()
    print(json.dumps(result, indent=2))
    sys.exit(0 if result["success"] else 1)
