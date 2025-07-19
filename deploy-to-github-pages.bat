@echo off
echo Building Karam Smart File Agent for GitHub Pages deployment...
echo.

REM Change to frontend directory
cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT\all_in_one_file_agent\frontend"

REM Install dependencies if package.json was modified
if exist package-lock.json (
    echo Installing dependencies...
    npm install
)

REM Build the React app for production
echo Building React app...
npm run build

REM Copy build to docs folder for GitHub Pages
echo Copying build to docs folder...
if not exist "..\..\docs" mkdir "..\..\docs"
xcopy "build\*" "..\..\docs\" /E /I /Y

REM Create .nojekyll file to prevent Jekyll processing
echo. > "..\..\docs\.nojekyll"

echo.
echo ✅ Deployment build complete!
echo.
echo Next steps:
echo 1. Commit and push changes to GitHub
echo 2. Enable GitHub Pages in repository settings
echo 3. Set source to "docs" folder
echo 4. Your app will be available at: https://rohan911438.github.io/karam-smart-file-agent
echo.
pause
