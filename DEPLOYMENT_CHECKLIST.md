# 📋 Deployment Checklist

## Before Deploying

- [ ] Code pushed to GitHub repository
- [ ] Environment variables ready (GROQ_API_KEY)
- [ ] Dependencies tested locally
- [ ] Build scripts working

## Frontend (Vercel)

### Setup
- [ ] Connected GitHub repo to Vercel
- [ ] Set Root Directory: `web-app/frontend`
- [ ] Framework: Create React App (auto-detected)

### Environment Variables
- [ ] `REACT_APP_API_URL` = `https://your-backend.onrender.com/api`

### Build Configuration
- [ ] Build Command: `npm run build` ✅
- [ ] Output Directory: `build` ✅  
- [ ] Install Command: `npm install` ✅

## Backend (Render)

### Setup
- [ ] Connected GitHub repo to Render
- [ ] Set Root Directory: `web-app/backend`
- [ ] Runtime: Node ✅

### Environment Variables (CRITICAL)
- [ ] `NODE_ENV` = `production`
- [ ] `PORT` = `10000`
- [ ] `GROQ_API_KEY` = `your_actual_groq_key`
- [ ] `FRONTEND_URL` = `https://your-frontend.vercel.app`
- [ ] `PYTHON_PATH` = `python3`
- [ ] `PYTHONPATH` = `./python`

### Build Configuration
- [ ] Build Command: Auto from `render.yaml` ✅
- [ ] Start Command: `node server.js` ✅

## Post-Deployment

### Testing
- [ ] Backend health: `https://your-backend.onrender.com/api/health`
- [ ] Frontend loads: `https://your-frontend.vercel.app`
- [ ] API integration working
- [ ] AI generation working (not falling back to templates)

### Verification
- [ ] CORS working (no browser errors)
- [ ] Job URL analysis working
- [ ] Email generation takes 2-10 seconds (AI mode)
- [ ] Generated emails are unique and job-specific

## Quick URLs
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Render Dashboard**: https://render.com/dashboard
- **GitHub Repo**: https://github.com/trivickram/Email-Generator

## 🚨 Common Issues & Solutions

### CORS Errors
```
Update FRONTEND_URL in Render environment variables
```

### Python/Groq Errors  
```
Verify GROQ_API_KEY is set correctly in Render
Check Python dependencies in requirements.txt
```

### Build Failures
```
Check build logs in dashboard
Verify all dependencies in package.json
```

### Still Getting Templates
```
Check GROQ_API_KEY is valid
Verify Python environment in Render logs
Test API endpoint manually
```
