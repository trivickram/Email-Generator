@echo off
echo ========================================
echo   Email Generator Setup Script
echo ========================================
echo.

echo Step 1: Checking Python installation...
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org/downloads/
    pause
    exit /b 1
)

echo Step 2: Checking Node.js installation...
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo Step 3: Finding Python path...
python -c "import sys; print('Python path:', sys.executable)"

echo.
echo Step 4: Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo Step 5: Installing backend dependencies...
cd web-app\backend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)

echo.
echo Step 6: Installing frontend dependencies...
cd ..\frontend
npm install
if errorlevel 1 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..\..

echo.
echo Step 7: Setting up GROQ API key...
echo.
echo Please get your GROQ API key from https://groq.com/ (it's free!)
echo.
python setup_groq_key.py

echo.
echo Step 8: Detecting and configuring Python path...
python detect_python_path.py

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo ✅ All dependencies installed
echo ✅ GROQ API key configured
echo ✅ Python path configured
echo.
echo Ready to start! Run: start-project.bat
echo.
pause