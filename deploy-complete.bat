@echo off
echo ======================================
echo Karam Smart File Agent - Deployment
echo GitHub Pages Deployment Script
echo ======================================

echo.
echo [1/6] Checking current directory...
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"
if not exist "all_in_one_file_agent\frontend" (
    echo ERROR: Frontend directory not found!
    pause
    exit /b 1
)

echo.
echo [2/6] Installing frontend dependencies...
cd "all_in_one_file_agent\frontend"
echo Installing npm packages...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo.
echo [3/6] Building React application...
echo Building for production...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [4/6] Copying build files to docs folder...
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"
if exist "docs\static" rmdir /s /q "docs\static"
if exist "docs\*.json" del /q "docs\*.json"
if exist "docs\*.ico" del /q "docs\*.ico"
if exist "docs\*.png" del /q "docs\*.png"
if exist "docs\*.txt" del /q "docs\*.txt"

xcopy "all_in_one_file_agent\frontend\build\*" "docs\" /E /Y /Q
if %errorlevel% neq 0 (
    echo ERROR: Failed to copy build files!
    pause
    exit /b 1
)

echo.
echo [5/6] Preserving custom files...
echo Ensuring karam-client.js is preserved...
if not exist "docs\karam-client.js" (
    echo WARNING: karam-client.js not found in docs folder!
)

echo.
echo [6/6] Git operations...
echo Checking git status...
git status

echo.
echo Adding all changes to git...
git add .

echo.
echo Creating commit...
git commit -m "Deploy Karam Smart File Agent v2.0 with client-side processing"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ======================================
echo DEPLOYMENT COMPLETED!
echo ======================================
echo.
echo Your app should be available at:
echo https://rohan911438.github.io/karam-smart-file-agent
echo.
echo Note: GitHub Pages may take a few minutes to update.
echo.
pause
