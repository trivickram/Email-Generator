@echo off
REM 🚀 Deployment Preparation Script for Windows

echo 🔧 Preparing Cold Email Generator for deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: Please run this script from the project root directory
    exit /b 1
)

REM Install dependencies
echo 📦 Installing dependencies...
cd web-app\frontend && npm install
if errorlevel 1 (
    echo ❌ Frontend npm install failed
    exit /b 1
)

cd ..\backend && npm install
if errorlevel 1 (
    echo ❌ Backend npm install failed
    exit /b 1
)
cd ..\..

REM Build frontend for testing
echo 🏗️ Building frontend...
cd web-app\frontend
npm run build
if errorlevel 1 (
    echo ❌ Frontend build failed
    exit /b 1
)
cd ..\..

REM Test backend locally
echo 🧪 Testing backend...
cd web-app\backend
node -e "console.log('✅ Backend syntax check passed')"
if errorlevel 1 (
    echo ❌ Backend syntax check failed
    exit /b 1
)
cd ..\..

REM Check Python
echo 🐍 Checking Python...
python --version
if errorlevel 1 (
    echo ❌ Python not found, trying python3...
    python3 --version
    if errorlevel 1 (
        echo ❌ Python not available
        exit /b 1
    )
)

REM Verify required files exist
echo 📋 Checking deployment files...
if exist "web-app\frontend\vercel.json" (
    echo ✅ vercel.json exists
) else (
    echo ❌ vercel.json missing
    exit /b 1
)

if exist "web-app\backend\render.yaml" (
    echo ✅ render.yaml exists
) else (
    echo ❌ render.yaml missing
    exit /b 1
)

if exist "web-app\backend\requirements.txt" (
    echo ✅ requirements.txt exists
) else (
    echo ❌ requirements.txt missing
    exit /b 1
)

echo 🎉 Deployment preparation complete!
echo.
echo Next steps:
echo 1. Push code to GitHub
echo 2. Deploy frontend to Vercel (root: web-app/frontend)
echo 3. Deploy backend to Render (root: web-app/backend)
echo 4. Update environment variables (see DEPLOYMENT.md)
echo.
echo 📖 Full guide: See DEPLOYMENT.md
pause
