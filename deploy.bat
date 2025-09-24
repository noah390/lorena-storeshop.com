@echo off
echo ================================
echo   Lorena Store Deployment
echo ================================
echo.

echo Initializing git repository...
git init

echo Adding all files...
git add .

echo Creating initial commit...
git commit -m "Initial deployment of Lorena Store"

echo.
echo To complete deployment:
echo 1. Create a new repository on GitHub named 'lorena-store'
echo 2. Run these commands:
echo    git remote add origin https://github.com/YOUR-USERNAME/lorena-store.git
echo    git branch -M main
echo    git push -u origin main
echo 3. Enable GitHub Pages in repository settings
echo.
echo Your site will be live at:
echo https://YOUR-USERNAME.github.io/lorena-store
echo.
echo Admin panel will be at:
echo https://YOUR-USERNAME.github.io/lorena-store/admin-firebase.html
echo Login: admin@lorenastore.com / admin123
echo ================================
pause