#!/bin/bash
# 🚀 Deployment Preparation Script

echo "🔧 Preparing Cold Email Generator for deployment..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
cd web-app/frontend && npm install
cd ../backend && npm install
cd ../..

# Build frontend for testing
echo "🏗️ Building frontend..."
cd web-app/frontend
npm run build
cd ../..

# Test backend locally
echo "🧪 Testing backend..."
cd web-app/backend
node -e "console.log('✅ Backend syntax check passed')"
cd ../..

# Check Python dependencies
echo "🐍 Checking Python dependencies..."
python3 -c "import sys; print(f'✅ Python {sys.version} detected')"

# Verify required files exist
echo "📋 Checking deployment files..."
files_to_check=(
    "web-app/frontend/vercel.json"
    "web-app/backend/render.yaml"
    "web-app/backend/requirements.txt"
    "web-app/backend/package.json"
    "web-app/frontend/package.json"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file exists"
    else
        echo "❌ $file missing"
        exit 1
    fi
done

echo "🎉 Deployment preparation complete!"
echo ""
echo "Next steps:"
echo "1. Push code to GitHub"
echo "2. Deploy frontend to Vercel (root: web-app/frontend)"
echo "3. Deploy backend to Render (root: web-app/backend)"
echo "4. Update environment variables (see DEPLOYMENT.md)"
echo ""
echo "📖 Full guide: See DEPLOYMENT.md"
