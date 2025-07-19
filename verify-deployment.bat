@echo off
echo ============================================
echo VERIFYING GITHUB PAGES DEPLOYMENT
echo ============================================

cd /d "c:\Users\ABHINAV KUMAR\Desktop\AGENT"

echo.
echo [CHECKING ROOT DIRECTORY]
echo Root index.html exists:
if exist "index.html" (echo ✅ YES) else (echo ❌ NO)

echo.
echo [CHECKING DOCS DIRECTORY]
echo docs folder exists:
if exist "docs" (echo ✅ YES) else (echo ❌ NO)

echo docs/index.html exists:
if exist "docs\index.html" (echo ✅ YES) else (echo ❌ NO)

echo docs/static folder exists:
if exist "docs\static" (echo ✅ YES) else (echo ❌ NO)

echo karam-client.js exists:
if exist "docs\karam-client.js" (echo ✅ YES) else (echo ❌ NO)

echo.
echo [CHECKING FILES IN DOCS]
echo Contents of docs folder:
dir docs

echo.
echo [CHECKING GIT STATUS]
git status

echo.
echo ============================================
echo CURRENT URLS TO TRY:
echo ============================================
echo 1. https://rohan911438.github.io/karam-smart-file-agent/
echo 2. https://rohan911438.github.io/karam-smart-file-agent/docs/
echo 3. https://rohan911438.github.io/karam-smart-file-agent/index.html
echo 4. https://rohan911438.github.io/karam-smart-file-agent/test-page.html
echo.
echo If none work, check GitHub Pages settings:
echo 1. Go to repository Settings → Pages
echo 2. Source: Deploy from a branch
echo 3. Branch: main
echo 4. Folder: / (root)
echo 5. Save and wait 5-10 minutes
echo.
pause
