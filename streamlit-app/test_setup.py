#!/usr/bin/env python3
"""
Test script to verify the Cold Email Generator can start
"""
import os
import sys

# Add shared directory to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'shared'))

def test_imports():
    """Test all required imports"""
    try:
        import streamlit as st
        print("✅ Streamlit imported successfully")
        
        from chains import Chain
        print("✅ Chain class imported successfully")
        
        from portfolio import Portfolio  
        print("✅ Portfolio class imported successfully")
        
        from utils import clean_text
        print("✅ Utils imported successfully")
        
        from langchain_community.document_loaders import WebBaseLoader
        print("✅ LangChain community imported successfully")
        
        return True
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_environment():
    """Test environment setup"""
    try:
        # Check if .env file exists
        if not os.path.exists(".env"):
            print("❌ .env file not found")
            return False
        print("✅ .env file found")
        
        # Check if portfolio file exists
        portfolio_path = "../data/my_portfolio.csv"
        if not os.path.exists(portfolio_path):
            print(f"❌ Portfolio file not found: {portfolio_path}")
            return False
        print("✅ Portfolio file found")
        
        return True
    except Exception as e:
        print(f"❌ Environment error: {e}")
        return False

def test_chain_initialization():
    """Test if Chain can be initialized"""
    try:
        from chains import Chain
        chain = Chain()
        print("✅ Chain initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Chain initialization error: {e}")
        return False

def test_portfolio_initialization():
    """Test if Portfolio can be initialized"""
    try:
        from portfolio import Portfolio
        portfolio = Portfolio()
        print("✅ Portfolio initialized successfully")
        return True
    except Exception as e:
        print(f"❌ Portfolio initialization error: {e}")
        return False

def main():
    print("🧪 Testing Cold Email Generator Setup...")
    print("=" * 50)
    
    # Test imports
    print("\n📦 Testing imports...")
    if not test_imports():
        print("❌ Import test failed")
        return
    
    # Test environment
    print("\n🔧 Testing environment...")
    if not test_environment():
        print("❌ Environment test failed")
        return
    
    # Test chain initialization
    print("\n🔗 Testing Chain initialization...")
    if not test_chain_initialization():
        print("❌ Chain test failed")
        return
    
    # Test portfolio initialization  
    print("\n📁 Testing Portfolio initialization...")
    if not test_portfolio_initialization():
        print("❌ Portfolio test failed")
        return
    
    print("\n" + "=" * 50)
    print("🎉 All tests passed! The application is ready to run.")
    print("\n🚀 To start the application, run:")
    print("   streamlit run main.py")
    print("\n🌐 Then open: http://localhost:8501")

if __name__ == "__main__":
    main()
