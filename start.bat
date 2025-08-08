@echo off
echo ========================================
echo   Starting Email Generator Application
echo ========================================
echo.

echo Checking if backend .env file exists...
if not exist "web-app\backend\.env" (
    echo ERROR: .env file not found in web-app\backend\
    echo Please create .env file with your GROQ API key and Python path
    echo See SETUP_INSTRUCTIONS.md for details
    pause
    exit /b 1
)

echo Starting backend server...
start "Backend Server" cmd /k "cd web-app\backend && npm start"

echo Waiting 5 seconds for backend to start...
timeout /t 5 /nobreak > nul

echo Starting frontend server...
start "Frontend Server" cmd /k "cd web-app\frontend && npm start"

echo.
echo ========================================
echo   Application Starting...
echo ========================================
echo.
echo Backend will be available at: http://localhost:4000
echo Frontend will be available at: http://localhost:3000
echo.
echo Press any key to close this window...
pause > nul