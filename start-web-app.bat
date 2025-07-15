@echo off
echo Starting Cold Email Generator Web Application...
echo.

echo [1/3] Starting Backend Server...
start "Backend Server" cmd /k "cd /d %~dp0web-app\backend && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/3] Starting Frontend Development Server...
start "Frontend Server" cmd /k "cd /d %~dp0web-app\frontend && npm start"

timeout /t 3 /nobreak > nul

echo [3/3] Backend: http://localhost:5000
echo [3/3] Frontend: http://localhost:3000
echo.
echo Both servers are starting...
echo Check the opened terminal windows for detailed logs.
echo.
echo Press any key to exit this script...
pause > nul
