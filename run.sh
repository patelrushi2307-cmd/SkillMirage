#!/usr/bin/env bash
set -e

echo "======================================================="
echo "     Starting SkillMirage Live Architecture"
echo "======================================================="
echo ""
echo "Starting Backend API Server on Port 3001..."
(cd server && npm run dev) &

echo "Starting Frontend on Vite (Port 8080)..."
(cd client && npm run dev) &

echo ""
echo "Both servers are starting in the background!"
echo "Frontend: http://localhost:8080"
echo "Backend:  http://localhost:3001"
echo ""
echo "Tip: run 'npm run install:all' first if you haven't installed dependencies yet."
echo "Press Ctrl+C to stop all servers."
wait
