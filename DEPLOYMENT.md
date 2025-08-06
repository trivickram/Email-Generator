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
   - **IMPORTANT**: Use the render.yaml file at the repository root
   - OR manually configure:
     - Root Directory: `web-app/backend`
     - Runtime: Node
     - Build Command: `npm install && python3 -m pip install -r requirements.txt`
     - Start Command: `node server.js`

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
   - **Option A**: Use render.yaml from repository root (RECOMMENDED)
   - **Option B**: Manual configuration with root directory set to `web-app/backend`

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

1. **"Cannot find module 'express'" Error**:
   - **Cause**: Render is not finding dependencies due to incorrect root directory
   - **Solution**: 
     - Use the render.yaml file from repository root (recommended)
     - OR set Root Directory to `web-app/backend` in Render dashboard
     - OR redeploy with correct build configuration

2. **CORS Error**:
   - Check FRONTEND_URL in Render
   - Verify allowedOrigins in server.js

3. **Python/Groq Issues**:
   - Verify GROQ_API_KEY is set
   - Check Python requirements.txt

4. **Build Failures**:
   - Check build logs in Render/Vercel
   - Verify dependencies in package.json

### Quick Fix for Current Error:

If you're seeing the "Cannot find module 'express'" error:

1. **Delete current Render service**
2. **Create new service using render.yaml**:
   - Upload the render.yaml from repository root
   - This ensures proper directory structure
3. **Set environment variables** as specified above

### Logs:
- **Render**: Dashboard → Service → Logs
- **Vercel**: Dashboard → Project → Functions
