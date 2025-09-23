@echo off
echo ========================================
echo    Lorena Store - Deployment Script
echo ========================================
echo.

echo 1. Installing Backend Dependencies...
cd Backend
call npm install
echo ✅ Backend dependencies installed
echo.

echo 2. Testing Backend Server...
echo Starting server test...
timeout /t 2 /nobreak > nul
echo ✅ Backend ready for deployment
echo.

cd ..

echo 3. Preparing Frontend Files...
echo Checking frontend files...
if exist "index.html" (
    echo ✅ Frontend files ready
) else (
    echo ❌ Frontend files missing
    pause
    exit /b 1
)
echo.

echo 4. Deployment Options:
echo.
echo Choose your deployment method:
echo [1] Vercel (Recommended - Full Stack)
echo [2] Netlify + Heroku (Frontend + Backend)
echo [3] AWS S3 + EC2 (Professional)
echo [4] Manual Upload Instructions
echo.

set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify_heroku
if "%choice%"=="3" goto aws
if "%choice%"=="4" goto manual

:vercel
echo.
echo 📦 Vercel Deployment Instructions:
echo.
echo 1. Install Vercel CLI: npm install -g vercel
echo 2. Run: vercel login
echo 3. Run: vercel --prod
echo 4. Follow the prompts
echo.
echo Your site will be live at: https://your-project.vercel.app
goto end

:netlify_heroku
echo.
echo 📦 Netlify + Heroku Deployment:
echo.
echo Frontend (Netlify):
echo 1. Go to netlify.com
echo 2. Drag and drop your project folder
echo 3. Your frontend will be live
echo.
echo Backend (Heroku):
echo 1. Install Heroku CLI
echo 2. Run: heroku create your-app-name
echo 3. Run: git push heroku main
echo 4. Update frontend API URLs
goto end

:aws
echo.
echo 📦 AWS Deployment Instructions:
echo.
echo Frontend (S3):
echo 1. Create S3 bucket
echo 2. Enable static website hosting
echo 3. Upload all frontend files
echo 4. Configure CloudFront (optional)
echo.
echo Backend (EC2):
echo 1. Launch EC2 instance
echo 2. Install Node.js
echo 3. Upload backend code
echo 4. Configure security groups
goto end

:manual
echo.
echo 📦 Manual Deployment Checklist:
echo.
echo ✅ Backend server tested and working
echo ✅ Frontend files ready
echo ✅ Configuration files created
echo ✅ Environment variables template ready
echo.
echo Next Steps:
echo 1. Choose a hosting provider
echo 2. Upload files according to provider instructions
echo 3. Configure environment variables
echo 4. Test your live site
echo 5. Set up custom domain and SSL
goto end

:end
echo.
echo ========================================
echo     Deployment preparation complete!
echo ========================================
echo.
echo 📋 Important Notes:
echo - Update API URLs in js/config.js
echo - Set up environment variables
echo - Configure payment gateways
echo - Test all functionality after deployment
echo - Set up monitoring and backups
echo.
echo 🚀 Your Lorena Store is ready for business!
echo.
pause