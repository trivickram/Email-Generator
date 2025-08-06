#!/usr/bin/env python3
"""
Simple test script for Node.js integration
"""
import sys
import json

def main():
    result = {
        "success": True,
        "message": "Simple Python test successful",
        "python_version": sys.version.split()[0],
        "executable": sys.executable
    }
    print(json.dumps(result))
    sys.exit(0)

if __name__ == "__main__":
    main()
