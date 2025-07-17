# API Key Security Guide

## 🔐 Important Security Notice

**NEVER commit your API keys to version control!**

This project uses several security measures to protect your API keys:

### 1. Environment Variables (.env file)
- Your API key should be stored in the `.env` file
- This file is automatically ignored by git (listed in `.gitignore`)
- The app prioritizes environment variables over other sources

### 2. Streamlit Secrets
- Backup option for API key storage
- File: `.streamlit/secrets.toml`
- This file is also ignored by git for security

### 3. Setup Process

1. **Run the setup script:**
   ```bash
   python setup_api_key.py
   ```

2. **Get your API key:**
   - Visit: https://console.groq.com/keys
   - Create a free account
   - Generate an API key

3. **Configure your .env file:**
   ```bash
   GROQ_API_KEY=your_actual_api_key_here
   ```

### 4. What NOT to do:
- ❌ Don't put API keys directly in code
- ❌ Don't commit .env files
- ❌ Don't share API keys in public repositories
- ❌ Don't put API keys in documentation

### 5. What TO do:
- ✅ Use .env files (already in .gitignore)
- ✅ Use environment variables
- ✅ Use Streamlit secrets for deployment
- ✅ Rotate keys regularly
- ✅ Use separate keys for development/production

### 6. If you accidentally commit an API key:
1. **Revoke the key immediately** at https://console.groq.com/keys
2. Generate a new key
3. Update your .env file
4. Remove the key from git history:
   ```bash
   git reset --hard HEAD~1  # Remove last commit
   # or use git filter-branch for older commits
   ```

### 7. Deployment
For production deployment (Streamlit Cloud, Heroku, etc.):
- Use platform-specific environment variable settings
- Never use local .env files in production
- Use secrets management services
