#!/bin/bash
# Startup script for production deployment

echo "🚀 Starting Email Generator Backend..."

# Set Python path
export PYTHONPATH="${PYTHONPATH}:$(pwd)/python"

# Find python executable
echo "🔍 Final Python verification..."
if command -v python3 &> /dev/null; then
    PYTHON_CMD="python3"
elif command -v python &> /dev/null; then
    PYTHON_CMD="python"
else
    echo "❌ Python not found!"
    exit 1
fi

# ✅ Install Python dependencies
echo "📦 Installing Python dependencies..."
$PYTHON_CMD -m pip install --upgrade pip
$PYTHON_CMD -m pip install -r requirements.txt || {
    echo "❌ Failed to install Python dependencies"
    exit 1
}

# ✅ Check if critical packages are available
$PYTHON_CMD -c "
try:
    import langchain_groq, langchain_core, dotenv
    print('✅ Core Python packages available')
except ImportError as e:
    print(f'❌ Python packages missing: {e}')
    exit(1)
"

# Start the Node.js server
echo "🚀 Starting Node.js server..."
exec node server.js
