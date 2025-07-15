@echo off
echo 🔧 Cold Email Generator - Troubleshooting Script
echo ================================================
echo.

REM Navigate to the correct directory
cd /d "D:\ML\code\cold-email-generator-tool\app"
echo 📍 Current directory: %CD%
echo.

REM Check if required files exist
echo 🔍 Checking required files...
if not exist "main.py" (
    echo ❌ main.py not found
    pause
    exit /b 1
)
echo ✅ main.py found

if not exist ".env" (
    echo ❌ .env file not found
    pause
    exit /b 1
)
echo ✅ .env file found

if not exist "resource\my_portfolio.csv" (
    echo ❌ portfolio file not found
    pause
    exit /b 1
)
echo ✅ portfolio file found
echo.

REM Test Python imports
echo 🧪 Testing Python imports...
python -c "import streamlit; print('✅ Streamlit OK')" || (echo ❌ Streamlit import failed && pause && exit /b 1)
python -c "import chromadb; print('✅ ChromaDB OK')" || (echo ❌ ChromaDB import failed && pause && exit /b 1)
python -c "from chains import Chain; print('✅ Chain OK')" || (echo ❌ Chain import failed && pause && exit /b 1)
python -c "from portfolio import Portfolio; print('✅ Portfolio OK')" || (echo ❌ Portfolio import failed && pause && exit /b 1)
echo.

REM Kill any existing Python processes
echo 🛑 Stopping existing processes...
taskkill /F /IM python.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo.

REM Clean up ChromaDB to avoid instance conflicts
echo 🧹 Cleaning up ChromaDB instances...
python cleanup_chroma.py
echo.

REM Pre-load ChromaDB to avoid timeouts
echo 📚 Pre-loading embeddings (this may take a minute)...
python preload.py
echo.

REM Start the application
echo 🚀 Starting Streamlit application...
echo 🌐 The app will be available at: http://localhost:8501
echo ⏹️  Press Ctrl+C to stop
echo.
python -m streamlit run main.py --server.port 8501 --server.headless true

pause
