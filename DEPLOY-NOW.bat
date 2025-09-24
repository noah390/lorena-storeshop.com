@echo off
echo 🚀 DEPLOYING LORENA STORE TO VERCEL
echo.

echo Step 1: Navigate to your CodeCommit repo directory
echo Run: cd path\to\your\codecommit\repo
echo.

echo Step 2: Add GitHub remote
echo Run: git remote add github https://github.com/yourusername/lorena-store.git
echo.

echo Step 3: Push to GitHub
echo Run: git push github main
echo.

echo Step 4: Move files to root (if needed)
echo Run: move E-CommerceWebsite\* .
echo Run: rmdir E-CommerceWebsite /s /q
echo Run: git add .
echo Run: git commit -m "Move to root for Vercel"
echo Run: git push github main
echo.

echo Step 5: Deploy to Vercel
echo 1. Go to https://vercel.com
echo 2. Click "Import Project"
echo 3. Select your GitHub repo
echo 4. Click "Deploy"
echo.

echo ✅ Your site will be live at: https://lorena-store.vercel.app
pause