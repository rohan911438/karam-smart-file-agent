@echo off
echo ========================================
echo KARAM SMART FILE AGENT - GITHUB PAGES DEPLOYMENT
echo ========================================

:: Set the working directory
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"

echo.
echo [STEP 1] Checking repository status...
git status
echo.

echo [STEP 2] Building the React frontend...
cd "all_in_one_file_agent\frontend"
echo Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo ERROR: npm install failed!
    pause
    exit /b 1
)

echo Building production version...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo [STEP 3] Going back to main directory...
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"

echo.
echo [STEP 4] Ensuring docs folder has the right files...
echo Current docs folder contents:
dir docs

echo.
echo [STEP 5] Adding all files to git...
git add .

echo.
echo [STEP 6] Creating commit...
git commit -m "Deploy Karam Smart File Agent to GitHub Pages - Fix 404 issue"

echo.
echo [STEP 7] Pushing to GitHub...
git push origin main

echo.
echo [STEP 8] Creating .nojekyll file in docs to bypass Jekyll...
echo. > docs\.nojekyll

echo.
echo [STEP 9] Committing .nojekyll file...
git add docs\.nojekyll
git commit -m "Add .nojekyll to docs folder"
git push origin main

echo.
echo ========================================
echo DEPLOYMENT COMPLETE!
echo ========================================
echo.
echo Now please follow these steps on GitHub:
echo.
echo 1. Go to: https://github.com/rohan911438/karam-smart-file-agent
echo 2. Click on "Settings" tab
echo 3. Scroll down to "Pages" in the left sidebar
echo 4. Under "Source", select "Deploy from a branch"
echo 5. Select "main" branch
echo 6. Select "/ (root)" folder
echo 7. Click "Save"
echo.
echo Your site will be available at:
echo https://rohan911438.github.io/karam-smart-file-agent
echo.
echo Note: It may take 5-10 minutes for changes to appear.
echo.
pause
