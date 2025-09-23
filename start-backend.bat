@echo off
echo Starting Lorena Store Backend Server...
echo.
cd Backend
echo Current directory: %CD%
echo.
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting server...
call npm start
pause