#!/usr/bin/env pwsh
# Watch specific files for changes
param(
    [int]$Seconds = 5
)

$filesToWatch = @(
    "tmux-orchestrator\registry\agent-status.md",
    "tmux-orchestrator\registry\lint-error-fixes-task.md",
    "src\components\*.tsx",
    "src\components\ui\*.tsx"
)

Write-Host "👀 Watching files for changes every $Seconds seconds..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

$lastHashes = @{}

while ($true) {
    $changed = $false
    
    foreach ($pattern in $filesToWatch) {
        $files = Get-ChildItem $pattern -ErrorAction SilentlyContinue
        foreach ($file in $files) {
            $hash = (Get-FileHash $file.FullName -Algorithm MD5).Hash
            $key = $file.FullName
            
            if ($lastHashes[$key] -and $lastHashes[$key] -ne $hash) {
                Write-Host "🔄 CHANGED: $($file.Name)" -ForegroundColor Green
                Write-Host "   Time: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Gray
                Write-Host "   Path: $($file.FullName.Replace($PWD, '.'))" -ForegroundColor Gray
                Write-Host ""
                $changed = $true
            }
            
            $lastHashes[$key] = $hash
        }
    }
    
    if (-not $changed) {
        Write-Host "." -NoNewline -ForegroundColor Gray
    }
    
    Start-Sleep $Seconds
}
