# 📧 Cold Email Generator

A powerful AI-driven tool that generates personalized cold emails based on job postings using Groq's LLM and ChromaDB for portfolio matching.

## 🏗️ Project Structure

```
NewApp/
├── streamlit-app/          # Local Streamlit development application
│   ├── main.py            # Main Streamlit application
│   ├── streamlit_app.py   # Alternative Streamlit entry point
│   ├── start_app.py       # Python startup script
│   ├── start_app.bat      # Windows startup script
│   ├── test_setup.py      # Setup validation
│   └── .env               # Environment variables (API keys)
├── web-app/               # React/Node.js web application (future)
│   ├── backend/           # Node.js API server (to be developed)
│   └── frontend/          # React frontend (to be developed)
├── shared/                # Shared Python modules
│   ├── chains.py          # LLM chain for job extraction and email generation
│   ├── portfolio.py       # Portfolio management with vector search
│   └── utils.py           # Text cleaning utilities
├── data/                  # Data files
│   └── my_portfolio.csv   # Portfolio data with tech stacks and links
├── .vscode/               # VS Code configuration
└── README.md              # This file
```

## 🚀 Quick Start (Local Streamlit)

### Prerequisites
- Python 3.11+
- Groq API key

### Setup
1. Navigate to the streamlit-app directory:
   ```bash
   cd streamlit-app
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Ensure your `.env` file has your Groq API key:
   ```
   groq_api_key=your_actual_groq_api_key_here
   ```

4. Run the application:
   ```bash
   # Option 1: Using the startup script
   python start_app.py
   
   # Option 2: Using Windows batch file
   start_app.bat
   
   # Option 3: Direct Streamlit command
   streamlit run main.py
   ```

5. Open your browser to `http://localhost:8501`

## ✨ Features

- 🔍 **Job Posting Analysis**: Extracts key information from job posting URLs
- 🤖 **AI-Powered Content**: Uses Groq's Llama model for intelligent email generation
- 📊 **Portfolio Matching**: Matches relevant portfolio projects using ChromaDB
- 💌 **Personalized Emails**: Generates tailored cold emails with relevant experience
- 🎨 **Beautiful UI**: Clean and intuitive Streamlit interface

## 🔧 Technology Stack

### Current (Streamlit App)
- **Frontend**: Streamlit web interface
- **Backend**: Python with LangChain framework
- **AI/LLM**: Groq API (Llama models)
- **Database**: ChromaDB for vector storage
- **Data Processing**: Pandas, BeautifulSoup

### Future (Web App)
- **Frontend**: React.js
- **Backend**: Node.js/Express
- **API**: RESTful API connecting to Python modules
- **Deployment**: Docker containers

## 🌐 Usage

1. **Enter Job URL**: Paste a job posting URL from any career website
2. **AI Processing**: The system will:
   - Scrape and clean the job posting content
   - Extract key details (role, skills, experience)
   - Find matching portfolio projects
   - Generate a personalized cold email
3. **Download**: Get your personalized cold email ready to send

## 🔒 Environment Setup

Create a `.env` file in the `streamlit-app` directory:
```
groq_api_key=your_groq_api_key_here
```

Get your free Groq API key from: https://console.groq.com/keys

## 🧪 Development

### Testing the Setup
```bash
cd streamlit-app
python test_setup.py
```

### VS Code Integration
Use the configured VS Code task: `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Cold Email Generator"

## 📝 Next Steps

1. **Web Application Development**: Build React frontend and Node.js backend
2. **API Development**: Create RESTful APIs for the Python modules
3. **Docker Deployment**: Containerize the entire application
4. **Enhanced UI**: Modern, responsive web interface

## 🤝 Contributing

1. Local development uses the `streamlit-app` directory
2. Web development will use the `web-app` directory
3. Shared Python logic is in the `shared` directory
4. Data files are centralized in the `data` directory
