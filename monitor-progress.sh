#!/bin/bash
# Progress Monitor Script for ISSI Tmux Orchestrator
# Monitor team progress through multiple channels

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOGS_DIR="$SCRIPT_DIR/tmux-orchestrator/logs"
REGISTRY_DIR="$SCRIPT_DIR/tmux-orchestrator/registry"

# Create directories if they don't exist
mkdir -p "$LOGS_DIR" "$REGISTRY_DIR"

echo "🔍 ISSI Team Progress Monitor"
echo "============================"
echo "⏰ $(date '+%Y-%m-%d %H:%M:%S')"
echo ""

# 1. Git Status - Show recent commits
echo "📝 Recent Git Activity:"
echo "----------------------"
git log --oneline -10 --color=always 2>/dev/null || echo "No git history found"
echo ""

# 2. Check build status
echo "🏗️ Build Status:"
echo "---------------"
if [ -f ".next/build-manifest.json" ]; then
    echo "✅ Build exists - Last modified: $(stat -c %y .next/build-manifest.json 2>/dev/null || stat -f %Sm .next/build-manifest.json 2>/dev/null || echo 'unknown')"
else
    echo "❌ No recent build found"
fi
echo ""

# 3. Active tmux sessions
echo "🖥️ Active Tmux Sessions:"
echo "-----------------------"
tmux list-sessions 2>/dev/null || echo "No tmux sessions found"
echo ""

# 4. Scheduled tasks status
echo "⏰ Scheduled Tasks:"
echo "-----------------"
if [ -f "$REGISTRY_DIR/scheduled_tasks.txt" ]; then
    while IFS=':' read -r pid execution_time window note; do
        if kill -0 "$pid" 2>/dev/null; then
            echo "🟢 Active: PID $pid - $(date -d "@$execution_time" '+%H:%M:%S') - $window - $note"
        else
            echo "🔴 Completed: PID $pid - $note"
        fi
    done < "$REGISTRY_DIR/scheduled_tasks.txt"
else
    echo "No scheduled tasks found"
fi
echo ""

# 5. Lint status
echo "🔍 Current Lint Status:"
echo "----------------------"
if command -v pnpm >/dev/null 2>&1; then
    echo "Running quick lint check..."
    pnpm lint 2>&1 | tail -5
else
    echo "pnpm not available"
fi
echo ""

# 6. Task registry
echo "📋 Active Tasks:"
echo "---------------"
if [ -d "$REGISTRY_DIR" ]; then
    for task_file in "$REGISTRY_DIR"/*.md; do
        if [ -f "$task_file" ]; then
            echo "📄 $(basename "$task_file")"
            echo "   Modified: $(stat -c %y "$task_file" 2>/dev/null || stat -f %Sm "$task_file" 2>/dev/null || echo 'unknown')"
        fi
    done
else
    echo "No task registry found"
fi
echo ""

# 7. Log summary
echo "📊 Recent Activity Logs:"
echo "-----------------------"
if [ -d "$LOGS_DIR" ]; then
    for log_file in "$LOGS_DIR"/*.txt; do
        if [ -f "$log_file" ]; then
            echo "📄 $(basename "$log_file"):"
            tail -3 "$log_file" 2>/dev/null | sed 's/^/   /'
            echo ""
        fi
    done
else
    echo "No logs directory found"
fi

echo "================================"
echo "🔄 Run './monitor-progress.sh' anytime to refresh"
