@echo off
echo Running admin user seeding script...
cd /d "%~dp0.."
npm run seed:admin
pause
