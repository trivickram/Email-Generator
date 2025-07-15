#!/bin/bash
# Build script for Render deployment

echo "🔧 Starting build process..."

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Install Python dependencies if Python is available
if command -v python3 &> /dev/null; then
    echo "📦 Installing Python dependencies with python3..."
    python3 -m pip install --upgrade pip
    python3 -m pip install -r requirements.txt
elif command -v python &> /dev/null; then
    echo "📦 Installing Python dependencies with python..."
    python -m pip install --upgrade pip
    python -m pip install -r requirements.txt
else
    echo "❌ Python not found, this is required for the backend"
    exit 1
fi

# Verify critical Python packages
echo "🔍 Verifying critical packages..."
python3 -c "import langchain_groq; print('✅ langchain_groq installed')" || echo "❌ langchain_groq missing"
python3 -c "import langchain_core; print('✅ langchain_core installed')" || echo "❌ langchain_core missing"
python3 -c "import dotenv; print('✅ python-dotenv installed')" || echo "⚠️ python-dotenv missing (optional)"

echo "✅ Build completed successfully!"
