#!/bin/bash
# Enhanced build script for Render deployment

set -e  # Exit on any error

echo "🔧 Starting enhanced build process..."
echo "📍 Current directory: $(pwd)"
echo "📍 Environment: ${NODE_ENV:-development}"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Detect and configure Python
PYTHON_CMD=""
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
    echo "📍 Using python3: $(which python3)"
    echo "📍 Python version: $(python3 --version)"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
    echo "📍 Using python: $(which python)"
    echo "📍 Python version: $(python --version)"
else
    echo "❌ Python not found!"
    exit 1
fi

# Upgrade pip and install dependencies with specific flags for Render
echo "📦 Installing Python dependencies..."
$PYTHON_CMD -m pip install --upgrade pip setuptools wheel
$PYTHON_CMD -m pip install --no-cache-dir --force-reinstall -r requirements.txt

# Test the installation
echo "🔍 Testing Python setup..."
if [ -f "python/test_imports.py" ]; then
    $PYTHON_CMD python/test_imports.py
else
    echo "⚠️ test_imports.py not found, running basic test..."
    $PYTHON_CMD -c "
import sys
packages = ['langchain_groq', 'langchain_core', 'dotenv', 'chromadb', 'groq']
for pkg in packages:
    try:
        __import__(pkg)
        print(f'✅ {pkg} imported successfully')
    except Exception as e:
        print(f'❌ {pkg} failed: {e}')
        sys.exit(1)
print('✅ All packages imported successfully!')
"
fi

echo "✅ Build completed successfully!"
