# 📧 Cold Email Generator

A powerful AI-driven web application that generates personalized cold emails by analyzing job postings and matching them with your portfolio projects using Groq's LLM and ChromaDB vector database.

## 🚀 Features

- **🤖 AI-Powered Analysis**: Uses Groq API with Llama models to extract job requirements
- **🎯 Portfolio Matching**: Vector similarity search to find relevant projects from your portfolio
- **🌐 Modern Web UI**: React.js frontend with Material-UI components
- **⚡ RESTful API**: Node.js backend with Python bridge integration
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔄 Alternative Interface**: Streamlit app for quick development and testing
- **☁️ Cloud Ready**: Configured for Vercel deployment with serverless functions

## 🏗️ Project Structure

```
Email-Generator/
├── 📱 web-app/                    # Main Web Application
│   ├── 🔧 backend/               # Node.js API Server
│   │   ├── server.js             # Express server entry point
│   │   ├── package.json          # Backend dependencies
│   │   └── src/                  # API routes and logic
│   └── 🎨 frontend/              # React Frontend
│       ├── src/                  # React components
│       ├── package.json          # Frontend dependencies
│       └── public/               # Static assets
├── 🖥️ streamlit-app/             # Alternative Streamlit Interface
│   ├── main.py                   # Streamlit entry point
│   ├── chains.py                 # LLM processing logic
│   ├── portfolio.py              # Portfolio management
│   └── vectorstore/              # ChromaDB vector database
├── 🔗 shared/                    # Shared Components
│   ├── chains.py                 # Core LLM chain logic
│   ├── portfolio.py              # Portfolio utilities
│   └── utils.py                  # Common utilities
├── 📊 data/                      # Portfolio Data
│   └── my_portfolio.csv          # Portfolio dataset
├── 📓 notebooks/                 # Development Notebooks
├── ☁️ api/                       # Vercel Serverless Functions
└── 📖 Documentation & Config
```

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher) 
- **Git** for version control
- **Groq API Key** (get from [Groq Console](https://console.groq.com/))

## 🚀 Quick Start

### Option 1: Web Application (Recommended)

1. **Clone the repository**
   ```bash
   git clone https://github.com/trivickram/Email-Generator.git
   cd Email-Generator
   ```

2. **Install dependencies**
   ```bash
   # Backend dependencies
   cd web-app/backend
   npm install
   
   # Frontend dependencies  
   cd ../frontend
   npm install
   
   # Python dependencies
   cd ../..
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in streamlit-app directory
   cd streamlit-app
   echo GROQ_API_KEY=your_groq_api_key_here > .env
   ```

4. **Start the application**
   ```bash
   # Option A: Use the automated script
   start-app.bat
   
   # Option B: Manual startup
   # Terminal 1 - Backend
   cd web-app/backend
   npm start
   
   # Terminal 2 - Frontend  
   cd web-app/frontend
   npm start
   ```

5. **Access the application**
   - **Web UI**: http://localhost:3000
   - **API**: http://localhost:4000
   - **API Health**: http://localhost:4000/api/health

### Option 2: Streamlit Application

1. **Navigate to streamlit app**
   ```bash
   cd streamlit-app
   ```

2. **Start the Streamlit server**
   ```bash
   streamlit run main.py
   # OR use the batch file
   start_app.bat
   ```

3. **Access the application**
   - **Streamlit UI**: http://localhost:8501

## 🛠️ Usage

### Web Application
1. Open http://localhost:3000 in your browser
2. Paste a job posting URL or description
3. The AI will analyze the job requirements
4. Relevant portfolio projects will be matched
5. A personalized cold email will be generated

### API Endpoints
- `GET /api/health` - Health check
- `POST /api/email/generate` - Generate cold email
- `GET /api/portfolio` - Get portfolio data

## 🌐 Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment
- Ensure `vercel.json` is configured
- Set environment variables in Vercel dashboard
- Connect GitHub repository for automatic deployments

## 🔧 Development

### Backend Development
```bash
cd web-app/backend
npm run dev  # Uses nodemon for auto-restart
```

### Frontend Development  
```bash
cd web-app/frontend
npm start    # React development server with hot reload
```

### Testing
```bash
# Backend tests
cd web-app/backend
npm test

# API testing
curl http://localhost:4000/api/health
```

## 📁 Key Files

- `start-app.bat` - Quick startup script for web app
- `vercel.json` - Deployment configuration
- `requirements.txt` - Python dependencies
- `package.json` - Node.js dependencies
- `data/my_portfolio.csv` - Your portfolio data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Troubleshooting

### Port Conflicts
```bash
# Check what's using the ports
netstat -ano | findstr ":3000\|:5000"

# Kill processes if needed
taskkill /pid [PID] /f
```

### Dependency Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Python dependencies
pip install -r requirements.txt --force-reinstall
```

### API Key Issues
- Ensure your Groq API key is valid
- Check the `.env` file in `streamlit-app/` directory
- Verify API key format: `GROQ_API_KEY=gsk_...`

---

**🎯 Ready to generate personalized cold emails with AI! Start with `start-app.bat` for the best experience.**
