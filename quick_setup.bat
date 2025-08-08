@echo off
echo ========================================
echo   Email Generator - One-Step Setup
echo ========================================
echo.

echo 🔍 Checking prerequisites...
echo.

echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org/downloads/
    echo Make sure to check "Add Python to PATH" during installation
    pause
    exit /b 1
) else (
    echo ✅ Python found
)

echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js found
)

echo.
echo 📦 Installing dependencies...
echo.

echo Installing Python packages...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install Python dependencies
    pause
    exit /b 1
)
echo ✅ Python packages installed

echo Installing backend dependencies...
cd web-app\backend
npm install
if errorlevel 1 (
    echo ❌ Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✅ Backend dependencies installed

echo Installing frontend dependencies...
cd ..\frontend
npm install
if errorlevel 1 (
    echo ❌ Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✅ Frontend dependencies installed

cd ..\..

echo.
echo 🔑 Setting up GROQ API key...
echo.
echo Please get your FREE GROQ API key from: https://groq.com/
echo (You'll need to create an account - it's quick and free!)
echo.
python setup_groq_key.py

echo.
echo 🐍 Configuring Python environment...
python detect_python_path.py

echo.
echo ========================================
echo   🎉 SETUP COMPLETE! 🎉
echo ========================================
echo.
echo ✅ All dependencies installed
echo ✅ GROQ API key configured  
echo ✅ Python environment configured
echo ✅ Ready to run!
echo.
echo 🚀 To start the application, run: start-project.bat
echo.
echo 📱 Once started, open your browser to:
echo    Frontend: http://localhost:3000
echo    Backend:  http://localhost:4000
echo.
pause