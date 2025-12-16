# 🚀 KnowVA Vercel Deployment Guide

## Prerequisites
- Vercel account ([vercel.com](https://vercel.com))
- Frontend code ready (build tested ✅)

## 📋 Deployment Steps

### Option 1: Web Interface (Recommended)

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/new](https://vercel.com/new)

2. **Import Project**
   - Select "Import Git Repository" OR "Deploy manually"
   - If manual: Drag & drop the `knowva---voice-ai-intelligence` folder

3. **Configure Build Settings**
   ```
   Framework Preset: Other
   Root Directory: knowva---voice-ai-intelligence (if importing repo)
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   VITE_GEMINI_API_KEY = AIzaSyC1NhJKaNP_8fDRCsNMQNIAhV1iXU1g2tA
   VITE_API_URL = https://theknownetworkcorp.com/api
   VITE_RETELL_DEMO_AGENT_ID = agent_a4c11f5a0cbedd9dfac1358e01
   VITE_ENV = production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build

6. **Custom Domain**
   - Go to Settings → Domains
   - Add: `theknownetworkcorp.com`
   - Vercel will show DNS records to add

### Option 2: Vercel CLI (If working)

```bash
cd knowva---voice-ai-intelligence
vercel login
vercel --prod
```

## ✅ Post-Deployment Tests

Test these URLs after deployment:

- **Frontend:** `https://your-vercel-url.vercel.app`
- **API Health:** `https://theknownetworkcorp.com/api/health`
- **Form Submission:** Try submitting the contact form
- **Voice Demo:** Test the voice demo button

## 🔧 Troubleshooting

**Build Fails:**
- Check environment variables are set correctly
- Verify `npm install` works locally

**API Calls Fail:**
- Verify `VITE_API_URL` is set to `https://theknownetworkcorp.com/api`
- Check CORS settings on backend

**Domain Issues:**
- DNS records may take 10-30 minutes to propagate
- Clear DNS cache if needed

---

**🎯 Ready to deploy? Your frontend is fully configured and tested!**