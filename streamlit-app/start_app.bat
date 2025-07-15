@echo off
echo 🚀 Starting Cold Email Generator...
echo 📍 Current directory: %CD%
echo.

REM Check if main.py exists
if not exist "main.py" (
    echo ❌ Error: main.py not found. Please run this script from the app directory.
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ❌ Error: .env file not found. Please create it with your GROQ_API_KEY.
    pause
    exit /b 1
)

echo ✅ Environment check passed!

REM Check and install required packages
echo 📦 Checking Python packages...
C:\Python313\python.exe -c "import langchain_community" 2>nul
if errorlevel 1 (
    echo 📥 Installing missing packages...
    C:\Python313\python.exe -m pip install langchain-community langchain-groq chromadb streamlit pandas python-dotenv beautifulsoup4 requests
    echo ✅ Packages installed!
) else (
    echo ✅ All packages are installed!
)

echo 🌐 Starting Streamlit server...
echo 📧 Once started, open http://localhost:8501 in your browser
echo ⏹️  Press Ctrl+C to stop the server
echo --------------------------------------------------
echo.

C:\Python313\python.exe -m streamlit run main.py

pause