@echo off
echo 🚀 UPLOADING LORENA STORE TO GITHUB
echo.

echo Step 1: Clone your GitHub repo
git clone https://github.com/noah390/lorenastoreshop.com.git
cd lorenastoreshop.com

echo.
echo Step 2: Copy all files from E-CommerceWebsite folder to this directory
echo Copy all files from: %~dp0
echo To: %cd%

echo.
echo Step 3: Add and commit files
git add .
git commit -m "Add Lorena Store complete website"

echo.
echo Step 4: Push to GitHub
git push origin main

echo.
echo ✅ DONE! Your code is now on GitHub
echo Go to: https://github.com/noah390/lorenastoreshop.com
pause