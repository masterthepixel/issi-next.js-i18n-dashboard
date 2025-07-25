#!/bin/bash

# Schedule with Note Script for ISSI Project
# Allows Claude agents to schedule their own check-ins and reminders
# Usage: ./schedule_with_note.sh <minutes> "<note>" [target_window]

set -e

if [ $# -lt 2 ]; then
    echo "❌ Error: Invalid arguments"
    echo "Usage: $0 <minutes> \"<note>\" [target_window]"
    echo "Example: $0 30 \"Check frontend development progress\" \"issi-i18n:1\""
    exit 1
fi

MINUTES=$1
NOTE=$2
TARGET_WINDOW=${3:-"issi-i18n:0"}  # Default to orchestrator window
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
NOTE_FILE="$SCRIPT_DIR/tmux-orchestrator/registry/next_check_note.txt"

# Validate minutes is a number
if ! [[ "$MINUTES" =~ ^[0-9]+$ ]]; then
    echo "❌ Error: Minutes must be a positive integer"
    exit 1
fi

# Ensure target window exists before scheduling
if ! tmux list-windows -t "${TARGET_WINDOW%:*}" 2>/dev/null | grep -q "${TARGET_WINDOW#*:}:"; then
    echo "❌ Error: Target window '$TARGET_WINDOW' does not exist"
    echo "Available windows:"
    tmux list-windows -t "${TARGET_WINDOW%:*}" 2>/dev/null || echo "Session '${TARGET_WINDOW%:*}' not found"
    exit 1
fi

# Calculate exact execution time
CURRENT_TIME=$(date +%s)
EXECUTION_TIME=$((CURRENT_TIME + MINUTES * 60))
EXECUTION_TIME_READABLE=$(date -d "@$EXECUTION_TIME" '+%Y-%m-%d %H:%M:%S')

# Create note file with scheduling information
mkdir -p "$(dirname "$NOTE_FILE")"
cat > "$NOTE_FILE" << EOF
SCHEDULED REMINDER
===================
Note: $NOTE
Target Window: $TARGET_WINDOW
Scheduled: $(date '+%Y-%m-%d %H:%M:%S')
Execute At: $EXECUTION_TIME_READABLE
Minutes: $MINUTES

This reminder was scheduled by an agent for self-management and oversight.
EOF

echo "⏰ Scheduling reminder for $MINUTES minutes from now..."
echo "📝 Note: $NOTE"
echo "🎯 Target: $TARGET_WINDOW"
echo "⏱️  Execute at: $EXECUTION_TIME_READABLE"

# Schedule the task using background process
(
    sleep $((MINUTES * 60))
    
    # Check if the target window still exists
    if tmux list-windows -t "${TARGET_WINDOW%:*}" 2>/dev/null | grep -q "${TARGET_WINDOW#*:}:"; then
        # Send the reminder message
        MESSAGE="🔔 SCHEDULED REMINDER: $NOTE

This is an automated reminder scheduled $MINUTES minutes ago.
Current time: $(date '+%Y-%m-%d %H:%M:%S')

Please review your current progress and continue with assigned tasks."
        
        # Use the existing send-claude-message.sh script
        if [ -f "$SCRIPT_DIR/send-claude-message.sh" ]; then
            "$SCRIPT_DIR/send-claude-message.sh" "$TARGET_WINDOW" "$MESSAGE"
        else
            # Fallback to direct tmux commands
            tmux send-keys -t "$TARGET_WINDOW" "$MESSAGE"
            sleep 0.5
            tmux send-keys -t "$TARGET_WINDOW" Enter
        fi
        
        # Log the reminder execution
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Reminder sent to $TARGET_WINDOW: $NOTE" >> "$SCRIPT_DIR/tmux-orchestrator/logs/reminder_log.txt"
    else
        # Log that the target window no longer exists
        echo "$(date '+%Y-%m-%d %H:%M:%S') - Target window $TARGET_WINDOW no longer exists for reminder: $NOTE" >> "$SCRIPT_DIR/tmux-orchestrator/logs/reminder_log.txt"
    fi
    
    # Clean up the note file
    rm -f "$NOTE_FILE"
) &

# Store the background process ID for potential cleanup
BG_PID=$!
echo "$BG_PID:$EXECUTION_TIME:$TARGET_WINDOW:$NOTE" >> "$SCRIPT_DIR/tmux-orchestrator/registry/scheduled_tasks.txt"

echo "✅ Reminder scheduled successfully!"
echo "🆔 Background Process ID: $BG_PID"
echo ""
echo "💡 To cancel this reminder, you can kill process $BG_PID:"
echo "   kill $BG_PID"