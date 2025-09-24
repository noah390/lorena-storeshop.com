@echo off
echo Starting Lorena Store Admin Panel...
echo.

cd Backend
echo Starting backend server...
start /B node server.js

timeout /t 3 /nobreak >nul

echo Opening admin panel...
start http://localhost:4000/admin.html

echo.
echo Admin Panel: http://localhost:4000/admin.html
echo Username: admin
echo Password: admin123
echo.
echo Press any key to exit...
pause >nul