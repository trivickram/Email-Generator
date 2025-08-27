# 🚀 Batch Files Guide

## Available Batch Files

### **For Running the Application:**

#### `start-app.bat` 
- **Primary launcher** for the full-stack web application
- Starts both backend (Node.js + Python) and frontend (React)
- Includes error checking and validation
- **Use this for normal operation**

```bash
# Double-click start-app.bat
# OR run from command prompt:
start-app.bat
```

### **For Initial Setup:**

#### `quick_setup.bat`
- **One-time setup script** for new installations
- Installs all Python and Node.js dependencies
- Creates environment files
- Validates system requirements
- **Run this once before first use**

```bash
# Double-click quick_setup.bat
# OR run from command prompt:
quick_setup.bat
```

### **For Alternative Interface:**

#### `streamlit-app/start_app.bat`
- Launches the **Streamlit version** of the app
- Simpler interface for testing/development
- Located in `streamlit-app/` folder
- **Use this for the Streamlit interface only**

```bash
# Navigate to streamlit-app folder and run:
cd streamlit-app
start_app.bat
```

---

## 🎯 **Recommended Usage Order:**

1. **First time setup**: Run `quick_setup.bat`
2. **Daily usage**: Run `start-app.bat`
3. **Alternative UI**: Use `streamlit-app/start_app.bat`

---

## 🔧 **If Batch Files Don't Work:**

Use manual commands instead:

```bash
# Backend (Terminal 1):
cd web-app\backend
npm start

# Frontend (Terminal 2):
cd web-app\frontend
npm start
```

## 📁 **Removed Files:**

The following redundant batch files have been removed:
- ❌ `start.bat` (basic version)
- ❌ `setup.bat` (superseded by quick_setup.bat)
- ❌ Old `start-app.bat` (had hardcoded paths)
