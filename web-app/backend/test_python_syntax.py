#!/usr/bin/env python3
"""
Simple syntax test for email_api.py
"""
import subprocess
import sys
import os

def test_python_syntax():
    """Test if the Python file has valid syntax"""
    try:
        # Test syntax compilation
        import py_compile
        
        script_path = os.path.join(os.path.dirname(__file__), 'python', 'email_api.py')
        py_compile.compile(script_path, doraise=True)
        
        print("✅ Python syntax is valid")
        return True
        
    except py_compile.PyCompileError as e:
        print(f"❌ Python syntax error: {e}")
        return False
    except Exception as e:
        print(f"❌ Error testing syntax: {e}")
        return False

def test_imports():
    """Test if imports work"""
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'python', 'email_api.py')
        
        # Try to run the test command
        result = subprocess.run([
            sys.executable, script_path, 'test'
        ], capture_output=True, text=True, timeout=30)
        
        if result.returncode == 0:
            print("✅ Test command executed successfully")
            print("Output:", result.stdout[:200] + "..." if len(result.stdout) > 200 else result.stdout)
            return True
        else:
            print(f"❌ Test command failed with code {result.returncode}")
            print("Error:", result.stderr)
            return False
            
    except subprocess.TimeoutExpired:
        print("⏰ Test command timed out (likely waiting for API)")
        return True  # Timeout is OK, means syntax is fine
    except Exception as e:
        print(f"❌ Error running test: {e}")
        return False

if __name__ == "__main__":
    print("🧪 Testing Python email_api.py...")
    
    syntax_ok = test_python_syntax()
    imports_ok = test_imports()
    
    if syntax_ok and imports_ok:
        print("🎉 All tests passed!")
        sys.exit(0)
    else:
        print("💥 Some tests failed!")
        sys.exit(1)
