@echo off
REM Simple batch file progress monitor for Windows
echo.
echo ===============================================
echo 🔍 ISSI Team Progress Monitor
echo ===============================================
echo ⏰ %date% %time%
echo.

echo 📝 Git Status:
echo ---------------
git log --oneline -3 2>nul || echo No git history found
echo.

echo 🏗️ Build Status:
echo ---------------
if exist ".next\build-manifest.json" (
    echo ✅ Build exists
    dir /tc ".next\build-manifest.json" | find "build-manifest"
) else (
    echo ❌ No recent build found
)
echo.

echo 👥 Agent Status:
echo ---------------
if exist "tmux-orchestrator\registry\agent-status.md" (
    echo 📄 Agent status file exists
    echo Last modified:
    dir /tc "tmux-orchestrator\registry\agent-status.md" | find "agent-status"
) else (
    echo ❌ No agent status file found
)
echo.

echo 📋 Active Tasks:
echo ---------------
if exist "tmux-orchestrator\registry\" (
    dir /b "tmux-orchestrator\registry\*.md" 2>nul || echo No task files found
) else (
    echo ❌ No registry directory found
)
echo.

echo 📁 Recent Changes:
echo ------------------
echo Files modified in last hour:
forfiles /p src /s /m *.* /c "cmd /c echo @path @fdate @ftime" 2>nul | find "%date:~0,10%" | head -5 2>nul || echo No recent changes found
echo.

echo ===============================================
echo 🔄 Run monitor-team.bat to refresh
echo ===============================================
