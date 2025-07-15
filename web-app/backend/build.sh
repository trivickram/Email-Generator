#!/bin/bash
# Build script for Render deployment

# Install Node.js dependencies
npm install

# Install Python dependencies if Python is available
if command -v python3 &> /dev/null; then
    echo "Installing Python dependencies with python3..."
    python3 -m pip install -r requirements.txt
elif command -v python &> /dev/null; then
    echo "Installing Python dependencies with python..."
    python -m pip install -r requirements.txt
else
    echo "Python not found, skipping Python dependency installation"
fi

echo "Build completed successfully!"
