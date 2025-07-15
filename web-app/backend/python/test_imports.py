#!/usr/bin/env python3
"""
Test script to verify Python environment for backend
"""
import sys
import json
import os

def test_imports():
    results = {
        "success": True,
        "python_version": sys.version,
        "python_executable": sys.executable,
        "current_dir": os.getcwd(),
        "script_dir": os.path.dirname(__file__),
        "modules": {},
        "errors": []
    }
    
    # Test critical modules only
    modules_to_test = [
        'langchain_groq',
        'langchain_core', 
        'dotenv',
        'requests',
        'bs4'  # beautifulsoup4
    ]
    
    for module_name in modules_to_test:
        try:
            __import__(module_name)
            results["modules"][module_name] = "✅ Available"
        except ImportError as e:
            results["modules"][module_name] = f"❌ Missing: {str(e)}"
            results["errors"].append(f"{module_name}: {str(e)}")
            results["success"] = False
    
    # Test optional modules
    optional_modules = ['pandas', 'chromadb', 'numpy']
    
    for module_name in optional_modules:
        try:
            __import__(module_name)
            results["modules"][module_name] = "✅ Available (optional)"
        except ImportError:
            results["modules"][module_name] = "⚠️ Missing (optional)"
    
    return results

if __name__ == "__main__":
    test_results = test_imports()
    print(json.dumps(test_results, indent=2))
    
    if not test_results["success"]:
        sys.exit(1)
