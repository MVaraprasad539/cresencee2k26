@echo off
echo Syncing changes to GitHub...
git add .
set /p commit_msg="Enter commit message (e.g., Updated homepage): "
if "%commit_msg%"=="" set commit_msg="Update"
git commit -m "%commit_msg%"
git push origin main
echo.
echo Done! Changes are now on GitHub.
pause
