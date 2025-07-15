@echo off
echo Installing Dependencies for Cold Email Generator Web App...
echo.

echo [1/2] Installing Backend Dependencies...
cd /d "%~dp0web-app\backend"
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies!
    pause
    exit /b 1
)

echo.
echo [2/2] Installing Frontend Dependencies...
cd /d "%~dp0web-app\frontend"
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies!
    pause
    exit /b 1
)

echo.
echo ===================================
echo All dependencies installed successfully!
echo ===================================
echo.
echo Next steps:
echo 1. Make sure you have Python dependencies: pip install -r requirements.txt
echo 2. Set up your .env file in streamlit-app directory with GROQ_API_KEY
echo 3. Run start-web-app.bat to start both servers
echo.
pause
