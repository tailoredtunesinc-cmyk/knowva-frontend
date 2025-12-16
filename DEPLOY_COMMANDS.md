# KnowVA Frontend - Automatic Vercel Deployment

## 🚀 Quick Deploy Commands

After creating GitHub repo, run these commands:

```bash
cd knowva---voice-ai-intelligence

# Add GitHub remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/knowva-frontend.git

# Push to GitHub
git push -u origin main
```

## 🔧 Vercel Auto-Deployment

1. **Go to Vercel:** [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository**
3. **Select your `knowva-frontend` repository**
4. **Auto-detect settings** (uses `vercel.json`)
5. **Add environment variables:**
   ```
   VITE_GEMINI_API_KEY = AIzaSyC1NhJKaNP_8fDRCsNMQNIAhV1iXU1g2tA
   VITE_API_URL = https://theknownetworkcorp.com/api
   VITE_RETELL_DEMO_AGENT_ID = agent_a4c11f5a0cbedd9dfac1358e01
   VITE_ENV = production
   ```
6. **Deploy automatically!**

## ✅ Benefits

- **Continuous Deployment:** Push code → Auto-deploy
- **Environment Variables:** Securely managed
- **Custom Domain:** Easy setup
- **HTTPS:** Automatic SSL

---

**Create the GitHub repo first, then run the commands above!** 🎯