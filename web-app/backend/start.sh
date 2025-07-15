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

# ✅ Set up a virtual environment
echo "🧪 Creating Python virtual environment..."
$PYTHON_CMD -m venv venv || {
    echo "❌ Failed to create virtualenv"
    exit 1
}

# ✅ Activate the virtual environment
source venv/bin/activate

# ✅ Install Python dependencies inside the virtual environment
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt || {
    echo "❌ Failed to install Python dependencies"
    pip freeze
    exit 1
}

# ✅ Show installed packages for diagnostics
pip freeze

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
