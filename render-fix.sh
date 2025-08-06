#!/bin/bash
# 🚨 Quick Fix for Render Deployment "Cannot find module" Error

echo "🔧 Fixing Render deployment configuration..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📋 Checking current configuration..."

# Ensure render.yaml exists at root
if [ -f "render.yaml" ]; then
    echo "✅ render.yaml found at repository root"
else
    echo "❌ render.yaml missing from repository root"
    echo "Creating render.yaml at repository root..."
    
    cat > render.yaml << 'EOF'
version: 1
services:
  - name: email-generator-backend
    type: web
    runtime: node
    plan: free
    buildCommand: |
      echo "🔧 Building Cold Email Generator Backend..." &&
      cd web-app/backend &&
      npm install &&
      echo "📦 Installing Python dependencies..." &&
      python3 -m pip install --upgrade pip &&
      python3 -m pip install -r requirements.txt &&
      echo "✅ Build completed successfully"
    startCommand: cd web-app/backend && node server.js
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      - key: PYTHONPATH
        value: ./python
      - key: PYTHON_PATH
        value: python3
      - key: GROQ_API_KEY
        sync: false  # Set this in Render dashboard
      - key: FRONTEND_URL
        value: https://your-frontend.vercel.app
    healthCheckPath: /api/health
EOF
    echo "✅ render.yaml created"
fi

# Check backend package.json
if [ -f "web-app/backend/package.json" ]; then
    echo "✅ Backend package.json exists"
    
    # Check if express is in dependencies
    if grep -q '"express"' web-app/backend/package.json; then
        echo "✅ Express dependency found"
    else
        echo "❌ Express dependency missing from package.json"
        exit 1
    fi
else
    echo "❌ Backend package.json not found"
    exit 1
fi

echo ""
echo "🎯 Next Steps to Fix Render Deployment:"
echo "1. Delete your current Render service (if it exists)"
echo "2. Create new Render service:"
echo "   - Connect to GitHub repository: trivickram/Email-Generator"
echo "   - Choose 'Use existing render.yaml file' option"
echo "   - Set environment variables:"
echo "     * GROQ_API_KEY=your_actual_key"
echo "     * FRONTEND_URL=https://your-vercel-url.vercel.app"
echo ""
echo "3. Deploy and test"
echo ""
echo "📖 Full guide: See DEPLOYMENT.md"
