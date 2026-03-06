@echo off
echo =======================================================
echo     Starting SkillMirage Live Architecture
echo =======================================================
echo.
echo Starting Backend API Server on Port 3001...
start "SkillMirage Backend" cmd /k "cd server && npm run dev"

echo Starting Frontend on Vite...
start "SkillMirage Frontend" cmd /k "cd client && npm run dev"

echo.
echo Both servers are starting in new windows!
echo The Frontend will automatically open in your browser, or you can go to http://localhost:8080
echo.
echo Tip: run 'npm run install:all' first if you haven't installed dependencies yet.
echo.
pause
