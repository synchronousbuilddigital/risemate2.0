@echo off
echo ==============================================================
echo Pushing codebase to https://github.com/synchronousbuilddigital/risemate2.0.git
echo ==============================================================

rem Add all files to staging
git add .

rem Commit changes
git commit -m "Initialize risemate 2.0 with premium loading screen, Sarvam AI chatbot, and mobile layout fixes"

rem Ensure main branch is selected
git branch -M main

rem Push to new remote
git push -u origin main

echo ==============================================================
echo Completed!
echo ==============================================================
pause
