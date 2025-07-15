# Cold Email Generator Web Application

A modern, AI-powered web application that generates personalized cold emails by analyzing job postings and matching them with your portfolio projects.

## 🚀 Features

- **AI-Powered Analysis**: Uses Groq API with Llama models to extract job requirements
- **Portfolio Matching**: Vector similarity search to find relevant projects
- **Modern Web UI**: React.js frontend with Material-UI components
- **RESTful API**: Node.js backend with Python bridge integration
- **Real-time Processing**: Fast email generation with progress feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **Python** (3.8 or higher)
- **Git** for version control
- **Groq API Key** (get from [Groq Console](https://console.groq.com/))

## 🛠️ Quick Setup

### Option 1: Automated Setup (Windows)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd NewApp
   ```

2. **Run the installation script**
   ```bash
   install-web-deps.bat
   ```

3. **Set up environment variables**
   - Create `.env` file in `streamlit-app` directory
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     ```

4. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Start the application**
   ```bash
   start-web-app.bat
   ```

### Option 2: Manual Setup

1. **Backend Setup**
   ```bash
   cd web-app/backend
   npm install
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd web-app/frontend
   npm install
   npm start
   ```

3. **Python Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

## 🏗️ Project Structure

```
NewApp/
├── web-app/                    # Modern web application
│   ├── backend/               # Node.js API server
│   │   ├── src/
│   │   │   ├── routes/        # API endpoints
│   │   │   ├── services/      # Business logic
│   │   │   └── server.js      # Express server
│   │   └── package.json
│   └── frontend/              # React.js application
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── services/      # API integration
│       │   └── theme.js       # Material-UI theme
│       └── package.json
├── streamlit-app/             # Local Streamlit application
│   ├── main.py               # Streamlit entry point
│   └── .env                  # Environment variables
├── shared/                    # Shared Python modules
│   ├── chains.py             # AI processing
│   ├── portfolio.py          # Vector database
│   ├── utils.py              # Utilities
│   └── email_api.py          # Python API bridge
└── requirements.txt           # Python dependencies
```

## 🌐 Usage

### Web Application

1. **Start the servers**: Run `start-web-app.bat` or start manually
2. **Open browser**: Navigate to `http://localhost:3000`
3. **Generate emails**:
   - Paste a job posting URL
   - Click "Generate Email"
   - Review and customize the generated email
   - Copy to use in your applications

### API Endpoints

- `POST /api/email/generate` - Generate cold email
- `GET /api/portfolio` - Get portfolio data
- `POST /api/portfolio/match` - Find relevant projects

### Local Streamlit App

```bash
cd streamlit-app
streamlit run main.py
```

Access at `http://localhost:8501`

## 🔧 Configuration

### Environment Variables

Create `.env` file in `streamlit-app` directory:

```env
# Required
GROQ_API_KEY=your_groq_api_key_here

# Optional
NODE_ENV=development
PORT=5000
PYTHON_PATH=python
```

### Portfolio Data

Update `shared/resource/my_portfolio.csv` with your projects:

```csv
Techstack,Links
"React, Node.js, AI","https://github.com/yourusername/project1"
"Python, Machine Learning","https://github.com/yourusername/project2"
```

## 🧪 Development

### Running in Development Mode

**Backend (with auto-reload):**
```bash
cd web-app/backend
npm run dev
```

**Frontend (with hot reload):**
```bash
cd web-app/frontend
npm start
```

### Testing the Python Bridge

```bash
cd shared
python email_api.py generate "https://example.com/job-posting"
```

### Building for Production

**Frontend:**
```bash
cd web-app/frontend
npm run build
```

**Backend:**
```bash
cd web-app/backend
npm start
```

## 📦 Dependencies

### Frontend (React.js)
- React Router for navigation
- Material-UI for components
- React Query for API state management
- Framer Motion for animations
- Axios for HTTP requests

### Backend (Node.js)
- Express.js web framework
- CORS for cross-origin requests
- Body parser for request handling
- Child process for Python integration

### Python AI Core
- LangChain for LLM orchestration
- Groq API for fast AI inference
- ChromaDB for vector search
- BeautifulSoup for web scraping
- Pandas for data processing

## 🚀 Deployment

### Local Deployment
- Use the provided batch scripts
- Both frontend and backend run locally
- Perfect for personal use

### Cloud Deployment Options

**Frontend (Vercel/Netlify):**
- Build: `npm run build`
- Deploy the `build` folder

**Backend (Heroku/Railway):**
- Ensure Python is available
- Set environment variables
- Deploy with Procfile

**Full Stack (Docker):**
- Multi-stage Docker build
- Include Python runtime
- Container orchestration ready

## 🔍 Troubleshooting

### Common Issues

1. **Python not found**
   - Ensure Python is in PATH
   - Set `PYTHON_PATH` environment variable

2. **Import errors**
   - Install requirements: `pip install -r requirements.txt`
   - Check virtual environment activation

3. **API key issues**
   - Verify `.env` file location
   - Check variable name: `GROQ_API_KEY`

4. **Port conflicts**
   - Frontend: 3000 (React dev server)
   - Backend: 5000 (Express server)
   - Streamlit: 8501 (Streamlit default)

### Debug Mode

Enable debug logging in backend:
```javascript
// In server.js
process.env.DEBUG = 'true';
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Groq** for lightning-fast AI inference
- **LangChain** for LLM orchestration
- **Material-UI** for beautiful components
- **ChromaDB** for vector search capabilities

---

**Need help?** Check the Documentation page in the web app or open an issue on GitHub.
