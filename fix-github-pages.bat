@echo off
echo ============================================
echo FIXING GITHUB PAGES DEPLOYMENT
echo ============================================

:: Go to the main directory
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"

echo.
echo [1] Building React app...
cd "all_in_one_file_agent\frontend"

:: Install dependencies
echo Installing npm dependencies...
call npm install

:: Build the app (this will also copy to docs folder due to the build script)
echo Building React app...
call npm run build

:: Go back to main directory
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"

echo.
echo [2] Verifying docs folder...
dir docs

echo.
echo [3] Committing changes...
git add .
git commit -m "Fix GitHub Pages deployment - Updated build and docs folder"
git push origin main

echo.
echo [4] Creating deployment verification...
echo GitHub Pages should now work at:
echo https://rohan911438.github.io/karam-smart-file-agent/
echo.
echo If you still get 404, try:
echo https://rohan911438.github.io/karam-smart-file-agent/docs/
echo.
echo Make sure GitHub Pages is set to:
echo Source: Deploy from a branch
echo Branch: main
echo Folder: / (root)
echo.
pause
