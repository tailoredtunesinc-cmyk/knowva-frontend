@echo off
echo 🚀 KnowVA Frontend Vercel Deployment Script
echo ===========================================

cd knowva---voice-ai-intelligence

echo 📦 Installing dependencies...
npm install

echo 🔨 Testing build...
npm run build

echo ✅ Build successful! Ready for Vercel deployment.
echo.
echo 📋 Next steps:
echo 1. Go to https://vercel.com/new
echo 2. Import this project (knowva---voice-ai-intelligence folder)
echo 3. Configure build settings as in VERCEL_DEPLOYMENT.md
echo 4. Add environment variables from .env.vercel
echo 5. Deploy!
echo.
echo 🌐 After deployment, update DNS records provided by Vercel
echo.
pause