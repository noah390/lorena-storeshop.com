@echo off
echo.
echo ========================================
echo    LORENA STORE ADMIN PANEL STARTUP
echo ========================================
echo.

cd Backend
echo Starting Lorena Store Backend Server...
echo Server will run on http://localhost:4000
echo Admin Panel: http://localhost:4000/../admin.html
echo.

start "Lorena Backend" cmd /k "npm start"

timeout /t 3 /nobreak >nul

echo Opening Admin Panel...
start "" "http://localhost:4000/../admin.html"

echo.
echo ========================================
echo  ADMIN CREDENTIALS:
echo  Email: abbeyayo53@gmail.com
echo  Password: Abbey123
echo ========================================
echo.
echo Press any key to exit...
pause >nul