# 🚀 QUICK MANUAL VERCEL DEPLOYMENT

## Step-by-Step (5 minutes):

### 1. Open Vercel
Go to: **https://vercel.com/new**

### 2. Manual Upload
- Click **"Import Git Repository"** → **"Deploy manually"**
- **Drag the entire `dist` folder** into the upload area
- OR click **"Upload"** and select all files from `dist/`

### 3. Configure
- **Project Name:** `knowva-frontend`
- **Framework:** Select **"Other"**
- **Root Directory:** Leave blank

### 4. Environment Variables
Add these:
```
VITE_GEMINI_API_KEY = AIzaSyC1NhJKaNP_8fDRCsNMQNIAhV1iXU1g2tA
VITE_API_URL = https://theknownetworkcorp.com/api
VITE_RETELL_DEMO_AGENT_ID = agent_a4c11f5a0cbedd9dfac1358e01
VITE_ENV = production
```

### 5. Deploy
- Click **"Deploy"**
- Wait **30 seconds**
- Get your URL!

### 6. Custom Domain
- Settings → Domains → Add `theknownetworkcorp.com`
- Copy DNS records to dns-parking.com

---

## ✅ That's it! Your frontend will be live in 5 minutes.

**Ready? Go to https://vercel.com/new now!** 🚀