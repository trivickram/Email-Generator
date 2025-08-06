# 🚀 Deployment Guide

## Frontend Deployment to Vercel

### Prerequisites
- GitHub account
- Vercel account (free)

### Steps:

1. **Push your code to GitHub** (if not already done)
2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
3. **Import Project**:
   - Click "New Project"
   - Import from GitHub: `trivickram/Email-Generator`
   - Root Directory: `web-app/frontend`
   - Framework: Create React App

4. **Environment Variables**:
   - `REACT_APP_API_URL`: `https://your-backend-app.onrender.com/api`

5. **Build Settings** (auto-detected):
   - Build Command: `npm run build`
   - Output Directory: `build`
   - Install Command: `npm install`

### Expected Result:
- Frontend URL: `https://your-app-name.vercel.app`

---

## Backend Deployment to Render

### Prerequisites
- GitHub account  
- Render account (free)
- Groq API key

### Steps:

1. **Go to [Render Dashboard](https://render.com/dashboard)**
2. **Create Web Service**:
   - Connect GitHub: `trivickram/Email-Generator`
   - Root Directory: `web-app/backend`
   - Runtime: Node

3. **Environment Variables** (CRITICAL):
   ```
   NODE_ENV=production
   PORT=10000
   GROQ_API_KEY=your_groq_api_key_here
   FRONTEND_URL=https://your-frontend.vercel.app
   PYTHON_PATH=python3
   PYTHONPATH=./python
   ```

4. **Build Settings**:
   - Build Command: (use render.yaml)
   - Start Command: `node server.js`

### Expected Result:
- Backend URL: `https://your-backend-app.onrender.com`

---

## 🔗 Update Cross-References

### After Both Are Deployed:

1. **Update Frontend Environment**:
   ```bash
   # In Vercel dashboard, update:
   REACT_APP_API_URL=https://your-actual-backend.onrender.com/api
   ```

2. **Update Backend CORS**:
   ```bash
   # In Render dashboard, update:
   FRONTEND_URL=https://your-actual-frontend.vercel.app
   ```

---

## 🧪 Testing Deployment

### Health Checks:
- Backend: `https://your-backend.onrender.com/api/health`
- Frontend: `https://your-frontend.vercel.app`

### API Test:
```bash
curl -X POST \
  https://your-backend.onrender.com/api/email/generate \
  -H "Content-Type: application/json" \
  -d '{"jobUrl":"https://careers.google.com/jobs/results/python-developer"}'
```

---

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Error**:
   - Check FRONTEND_URL in Render
   - Verify allowedOrigins in server.js

2. **Python/Groq Issues**:
   - Verify GROQ_API_KEY is set
   - Check Python requirements.txt

3. **Build Failures**:
   - Check build logs in Render/Vercel
   - Verify dependencies in package.json

### Logs:
- **Render**: Dashboard → Service → Logs
- **Vercel**: Dashboard → Project → Functions
