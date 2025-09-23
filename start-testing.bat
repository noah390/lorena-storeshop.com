@echo off
echo ========================================
echo    Lorena Store - Testing Environment
echo ========================================
echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd Backend && npm start"
echo.
echo Waiting for server to start...
timeout /t 3 /nobreak >nul
echo.
echo Opening test page...
start "" "test-site.html"
echo.
echo ========================================
echo Backend server is running on port 4000
echo Test page opened in your browser
echo.
echo To test the site:
echo 1. Use the test page links
echo 2. Or open index.html directly
echo.
echo Press any key to close this window...
pause >nul