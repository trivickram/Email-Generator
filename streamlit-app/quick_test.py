#!/usr/bin/env python3
"""
Quick test script to verify Chain initialization
"""
import sys
import os

# Add shared directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'shared'))

def test_chain_init():
    """Test Chain initialization"""
    try:
        print("🔄 Testing Chain initialization...")
        from chains import Chain
        
        chain = Chain()
        print("✅ Chain initialized successfully!")
        print("🔑 Groq API key is working")
        return True
        
    except EnvironmentError as e:
        print(f"❌ Environment Error: {e}")
        print("💡 Please check your GROQ_API_KEY in the .env file")
        return False
        
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        print(f"Error type: {type(e).__name__}")
        return False

def test_imports():
    """Test basic imports"""
    try:
        print("🔄 Testing imports...")
        import streamlit
        print("✅ Streamlit imported")
        
        import chromadb
        print("✅ ChromaDB imported")
        
        from portfolio import Portfolio
        print("✅ Portfolio imported")
        
        return True
        
    except Exception as e:
        print(f"❌ Import Error: {e}")
        return False

def main():
    print("🧪 Quick Test - Cold Email Generator")
    print("=" * 40)
    
    # Test imports first
    if not test_imports():
        print("\n❌ Import test failed")
        return False
    
    print()
    
    # Test Chain initialization
    if not test_chain_init():
        print("\n❌ Chain initialization failed")
        return False
    
    print("\n" + "=" * 40)
    print("🎉 All tests passed! Ready to start the app.")
    print("🚀 Run: streamlit run main.py")
    return True

if __name__ == "__main__":
    success = main()
    if not success:
        sys.exit(1)
