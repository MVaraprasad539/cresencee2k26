@echo off
echo Starting CreSencE 2k26 Local Server...
echo.
echo ========================================================
echo IMPORTANT: Make sure you have updated js/firebase-config.js with your keys!
echo If you see an error below, Python might not be installed or in your PATH.
echo ========================================================
echo.

set PORT=8000
echo Trying to start server on port %PORT%...

:: Start browser immediately to give it time to load
start "" "http://localhost:%PORT%"

:: Attempt to start server
python -m http.server %PORT%
if %errorlevel% neq 0 (
    echo.
    echo Port %PORT% seems busy or Python failed. Trying Port 8080...
    set PORT=8080
    start "" "http://localhost:8080"
    python -m http.server 8080
)

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Could not start server on 8000 or 8080.
    echo Please check if Python is installed.
    pause
)

pause
