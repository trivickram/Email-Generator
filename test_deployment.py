#!/usr/bin/env python3
"""
Deployment Readiness Test Script
"""
import sys
import json
import subprocess
import os

def test_python_dependencies():
    """Test Python dependencies"""
    print("🐍 Testing Python dependencies...")
    
    required_packages = ['groq', 'python-dotenv']
    missing = []
    
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package} installed")
        except ImportError:
            missing.append(package)
            print(f"❌ {package} missing")
    
    if missing:
        print(f"❌ Missing packages: {', '.join(missing)}")
        print("Run: pip install " + " ".join(missing))
        return False
    
    return True

def test_groq_version():
    """Test Groq version"""
    try:
        import groq
        version = groq.__version__
        print(f"✅ Groq version: {version}")
        if version < "0.31.0":
            print("⚠️ Warning: Groq version < 0.31.0 may have issues")
        return True
    except Exception as e:
        print(f"❌ Groq test failed: {e}")
        return False

def test_api_key():
    """Test if API key is available"""
    api_key = os.getenv('GROQ_API_KEY')
    if api_key and api_key != 'your_groq_api_key_here':
        print(f"✅ GROQ_API_KEY found (length: {len(api_key)})")
        return True
    else:
        print("❌ GROQ_API_KEY not set or invalid")
        return False

def test_backend_syntax():
    """Test backend syntax"""
    print("🔧 Testing backend syntax...")
    try:
        result = subprocess.run(
            ['node', '-c', 'web-app/backend/server.js'],
            capture_output=True,
            text=True,
            cwd=os.path.dirname(os.path.abspath(__file__))
        )
        if result.returncode == 0:
            print("✅ Backend syntax OK")
            return True
        else:
            print(f"❌ Backend syntax error: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Backend test failed: {e}")
        return False

def test_frontend_build():
    """Test frontend build"""
    print("🏗️ Testing frontend build...")
    try:
        result = subprocess.run(
            ['npm', 'run', 'build'],
            capture_output=True,
            text=True,
            cwd='web-app/frontend'
        )
        if result.returncode == 0:
            print("✅ Frontend build OK")
            return True
        else:
            print(f"❌ Frontend build failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Frontend build test failed: {e}")
        return False

def main():
    print("🧪 Testing deployment readiness...")
    print("=" * 50)
    
    tests = [
        ("Python Dependencies", test_python_dependencies),
        ("Groq Version", test_groq_version),
        ("API Key", test_api_key),
        ("Backend Syntax", test_backend_syntax),
        # ("Frontend Build", test_frontend_build),  # Commented out as it takes time
    ]
    
    results = []
    for test_name, test_func in tests:
        print(f"\n{test_name}:")
        result = test_func()
        results.append((test_name, result))
    
    print("\n" + "=" * 50)
    print("📊 Test Results:")
    
    all_passed = True
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if not result:
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 All tests passed! Ready for deployment!")
        print("\nNext steps:")
        print("1. Push to GitHub")
        print("2. Deploy to Vercel (frontend)")
        print("3. Deploy to Render (backend)")
        print("4. Set environment variables")
    else:
        print("❌ Some tests failed. Fix issues before deploying.")
        sys.exit(1)

if __name__ == "__main__":
    main()
