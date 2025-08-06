@echo off
REM 🚨 Quick Fix for Render Deployment "Cannot find module" Error

echo 🔧 Fixing Render deployment configuration...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

echo 📋 Checking current configuration...

REM Ensure render.yaml exists at root
if exist "render.yaml" (
    echo ✅ render.yaml found at repository root
) else (
    echo ❌ render.yaml missing from repository root
    echo Creating render.yaml at repository root...
    
    (
    echo version: 1
    echo services:
    echo   - name: email-generator-backend
    echo     type: web
    echo     runtime: node
    echo     plan: free
    echo     buildCommand: ^|
    echo       echo "🔧 Building Cold Email Generator Backend..." ^&^&
    echo       cd web-app/backend ^&^&
    echo       npm install ^&^&
    echo       echo "📦 Installing Python dependencies..." ^&^&
    echo       python3 -m pip install --upgrade pip ^&^&
    echo       python3 -m pip install -r requirements.txt ^&^&
    echo       echo "✅ Build completed successfully"
    echo     startCommand: cd web-app/backend ^&^& node server.js
    echo     envVars:
    echo       - key: NODE_ENV
    echo         value: production
    echo       - key: PORT
    echo         value: 10000
    echo       - key: PYTHONPATH
    echo         value: ./python
    echo       - key: PYTHON_PATH
    echo         value: python3
    echo       - key: GROQ_API_KEY
    echo         sync: false  # Set this in Render dashboard
    echo       - key: FRONTEND_URL
    echo         value: https://your-frontend.vercel.app
    echo     healthCheckPath: /api/health
    ) > render.yaml
    echo ✅ render.yaml created
)

REM Check backend package.json
if exist "web-app\backend\package.json" (
    echo ✅ Backend package.json exists
    
    REM Check if express is in dependencies
    findstr /C:"express" web-app\backend\package.json >nul
    if errorlevel 1 (
        echo ❌ Express dependency missing from package.json
        exit /b 1
    ) else (
        echo ✅ Express dependency found
    )
) else (
    echo ❌ Backend package.json not found
    exit /b 1
)

echo.
echo 🎯 Next Steps to Fix Render Deployment:
echo 1. Delete your current Render service (if it exists)
echo 2. Create new Render service:
echo    - Connect to GitHub repository: trivickram/Email-Generator
echo    - Choose 'Use existing render.yaml file' option
echo    - Set environment variables:
echo      * GROQ_API_KEY=your_actual_key
echo      * FRONTEND_URL=https://your-vercel-url.vercel.app
echo.
echo 3. Deploy and test
echo.
echo 📖 Full guide: See DEPLOYMENT.md
pause
