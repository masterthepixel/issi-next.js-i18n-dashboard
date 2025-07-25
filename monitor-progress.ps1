#!/usr/bin/env pwsh
# PowerShell Progress Monitor for Windows
# Monitor ISSI team progress through multiple channels

Write-Host "🔍 ISSI Team Progress Monitor" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host "⏰ $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Yellow
Write-Host ""

# 1. Git Status - Show recent commits
Write-Host "📝 Recent Git Activity:" -ForegroundColor Green
Write-Host "----------------------" -ForegroundColor Green
try {
    git log --oneline -5 2>$null
}
catch {
    Write-Host "No git history found" -ForegroundColor Red
}
Write-Host ""

# 2. Check build status
Write-Host "🏗️ Build Status:" -ForegroundColor Green
Write-Host "---------------" -ForegroundColor Green
if (Test-Path ".next\build-manifest.json") {
    $buildTime = (Get-Item ".next\build-manifest.json").LastWriteTime
    Write-Host "✅ Build exists - Last modified: $buildTime" -ForegroundColor Green
}
else {
    Write-Host "❌ No recent build found" -ForegroundColor Red
}
Write-Host ""

# 3. Lint status check
Write-Host "🔍 Current Lint Status:" -ForegroundColor Green
Write-Host "----------------------" -ForegroundColor Green
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    Write-Host "Running quick lint check..." -ForegroundColor Yellow
    try {
        $lintOutput = pnpm lint 2>&1 | Select-Object -Last 5
        $lintOutput | ForEach-Object { Write-Host $_ }
    }
    catch {
        Write-Host "Lint check failed" -ForegroundColor Red
    }
}
else {
    Write-Host "pnpm not available" -ForegroundColor Red
}
Write-Host ""

# 4. Agent Status
Write-Host "👥 Agent Status:" -ForegroundColor Green
Write-Host "---------------" -ForegroundColor Green
if (Test-Path "tmux-orchestrator\registry\agent-status.md") {
    $agentStatus = Get-Content "tmux-orchestrator\registry\agent-status.md" -Raw
    # Extract summary section
    $summary = $agentStatus -split "---" | Select-Object -Last 1
    Write-Host $summary
}
else {
    Write-Host "No agent status file found" -ForegroundColor Red
}
Write-Host ""

# 5. Active tasks
Write-Host "📋 Active Tasks:" -ForegroundColor Green
Write-Host "---------------" -ForegroundColor Green
if (Test-Path "tmux-orchestrator\registry\") {
    $taskFiles = Get-ChildItem "tmux-orchestrator\registry\*.md"
    foreach ($file in $taskFiles) {
        Write-Host "📄 $($file.Name)" -ForegroundColor Yellow
        Write-Host "   Modified: $($file.LastWriteTime)" -ForegroundColor Gray
    }
}
else {
    Write-Host "No task registry found" -ForegroundColor Red
}
Write-Host ""

# 6. File change monitoring
Write-Host "📁 Recent File Changes:" -ForegroundColor Green
Write-Host "----------------------" -ForegroundColor Green
try {
    $recentFiles = Get-ChildItem -Path "src\" -Recurse -File | 
    Where-Object { $_.LastWriteTime -gt (Get-Date).AddMinutes(-30) } |
    Sort-Object LastWriteTime -Descending |
    Select-Object -First 5
    
    if ($recentFiles) {
        foreach ($file in $recentFiles) {
            Write-Host "📝 $($file.FullName.Replace($PWD, '.'))" -ForegroundColor Yellow
            Write-Host "   Modified: $($file.LastWriteTime)" -ForegroundColor Gray
        }
    }
    else {
        Write-Host "No recent file changes in last 30 minutes" -ForegroundColor Gray
    }
}
catch {
    Write-Host "Could not check file changes" -ForegroundColor Red
}
Write-Host ""

Write-Host "================================" -ForegroundColor Cyan
Write-Host "🔄 Run '.\monitor-progress.ps1' anytime to refresh" -ForegroundColor Cyan
