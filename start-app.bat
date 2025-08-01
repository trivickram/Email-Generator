@echo off
echo Starting Cold Email Generator...
echo.

echo Starting Backend Server (installing Python deps)...
start "Backend Server" cmd /k "cd /d D:\NewApp\web-app\backend && python -m pip install --upgrade pip setuptools wheel && python -m pip install -r requirements.txt && npm start"

echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend Server...
start "Frontend Server" cmd /k "cd /d D:\NewApp\web-app\frontend && npm start"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit this window (servers will keep running)
pause >nul
