@echo off
title Cold Email Generator Launcher
color 0A
echo.
echo ===============================================
echo    🚀 Cold Email Generator Launcher 🚀
echo ===============================================
echo.

REM Get the directory where this batch file is located
set "PROJECT_ROOT=%~dp0"
echo 📁 Project Location: %PROJECT_ROOT%

REM Check if required folders exist
if not exist "%PROJECT_ROOT%web-app\backend" (
    echo ❌ ERROR: Backend folder not found!
    echo Expected: %PROJECT_ROOT%web-app\backend
    echo Please ensure you're running this from the project root folder.
    pause
    exit /b 1
)

if not exist "%PROJECT_ROOT%web-app\frontend" (
    echo ❌ ERROR: Frontend folder not found!
    echo Expected: %PROJECT_ROOT%web-app\frontend
    echo Please ensure you're running this from the project root folder.
    pause
    exit /b 1
)

REM Check if Python is available
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Python not found in PATH!
    echo Please install Python and add it to your system PATH.
    echo Download from: https://python.org/downloads/
    pause
    exit /b 1
)

REM Check if Node.js is available
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ ERROR: Node.js not found in PATH!
    echo Please install Node.js and add it to your system PATH.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Python found: 
python --version

echo ✅ Node.js found: 
node --version

echo.
echo 🔧 Starting Backend Server...
start "🔧 Backend Server - Cold Email Generator" cmd /k "cd /d "%PROJECT_ROOT%web-app\backend" && echo Installing Python dependencies... && python -m pip install -r requirements.txt && echo Starting backend server... && npm start"

echo ⏳ Waiting 8 seconds for backend to initialize...
timeout /t 8 /nobreak >nul

echo 🎨 Starting Frontend Server...
start "🎨 Frontend Server - Cold Email Generator" cmd /k "cd /d "%PROJECT_ROOT%web-app\frontend" && echo Starting React development server... && npm start"

echo.
echo ===============================================
echo           🎉 Servers Starting! 🎉
echo ===============================================
echo.
echo 🔧 Backend API:  http://localhost:4000
echo 🎨 Frontend App: http://localhost:3000
echo.
echo 📝 Instructions:
echo 1. Wait for both terminal windows to finish loading
echo 2. Open your browser to http://localhost:3000
echo 3. Start generating personalized cold emails!
echo.
echo ⚠️  Keep both terminal windows open while using the app
echo 🛑 Close the terminal windows to stop the servers
echo.
echo Press any key to close this launcher window...
pause >nul
