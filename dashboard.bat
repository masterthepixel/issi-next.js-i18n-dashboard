@echo off
cls
echo.
echo ================================================
echo 🎯 ISSI Team Dashboard - Quick Status
echo ================================================
echo.

REM Quick lint check
echo 🔍 Lint Status:
pnpm lint 2>nul | find "warning" | wc -l 2>nul || echo "Cannot determine lint count"

REM Agent status summary  
echo.
echo 👥 Team Status:
if exist "tmux-orchestrator\registry\agent-status.md" (
    findstr /C:"Status:" "tmux-orchestrator\registry\agent-status.md" 2>nul | find /C "🟢" >nul && echo "✅ Agents active" || echo "⏸️ Agents idle"
) else (
    echo "❌ No status available"
)

REM Recent commits
echo.
echo 📝 Latest Work:
git log --oneline -1 2>nul || echo "No recent commits"

REM Build status
echo.
echo 🏗️ Build:
if exist ".next\build-manifest.json" (
    echo "✅ Built successfully"
) else (
    echo "❌ No build found"
)

echo.
echo ================================================
echo 🔄 Run dashboard.bat for refresh
timeout /t 1 >nul
