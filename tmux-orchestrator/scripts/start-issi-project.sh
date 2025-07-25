#!/bin/bash

# ISSI Project Tmux Orchestrator Startup Script
# This script creates a comprehensive tmux session for the ISSI Next.js i18n project
# with specialized agents for different development areas

set -e

PROJECT_NAME="issi-i18n"
PROJECT_PATH="C:/Users/kfiagbedzi/Documents/GitHub/issi-next.js-i18n-dashboard"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Starting ISSI i18n Dashboard Project with Tmux Orchestration..."

# Check if session already exists
if tmux has-session -t "$PROJECT_NAME" 2>/dev/null; then
    echo "⚠️  Session '$PROJECT_NAME' already exists. Attaching to existing session..."
    tmux attach-session -t "$PROJECT_NAME"
    exit 0
fi

# Create main session
echo "📋 Creating tmux session: $PROJECT_NAME"
tmux new-session -d -s "$PROJECT_NAME" -c "$PROJECT_PATH"

# Window 0: Orchestrator (already created)
tmux rename-window -t "$PROJECT_NAME":0 "Orchestrator"

# Window 1: Frontend Development Agent
echo "🎨 Setting up Frontend Development Agent..."
tmux new-window -t "$PROJECT_NAME" -n "Frontend-Agent" -c "$PROJECT_PATH"

# Window 2: Backend/API Agent
echo "🔧 Setting up Backend/API Agent..."
tmux new-window -t "$PROJECT_NAME" -n "Backend-Agent" -c "$PROJECT_PATH"

# Window 3: QA Testing Agent
echo "🧪 Setting up QA Testing Agent..."
tmux new-window -t "$PROJECT_NAME" -n "QA-Agent" -c "$PROJECT_PATH"

# Window 4: Dev Server
echo "🌐 Setting up Development Server..."
tmux new-window -t "$PROJECT_NAME" -n "Dev-Server" -c "$PROJECT_PATH"

# Window 5: Build & Deployment
echo "🏗️  Setting up Build & Deployment..."
tmux new-window -t "$PROJECT_NAME" -n "Build-Deploy" -c "$PROJECT_PATH"

# Window 6: Project Manager
echo "👔 Setting up Project Manager..."
tmux new-window -t "$PROJECT_NAME" -n "Project-Manager" -c "$PROJECT_PATH"

# Window 7: Documentation Agent
echo "📚 Setting up Documentation Agent..."
tmux new-window -t "$PROJECT_NAME" -n "Docs-Agent" -c "$PROJECT_PATH"

echo "✅ Tmux session structure created successfully!"
echo ""
echo "🔥 Session Layout:"
echo "   Window 0: Orchestrator (You are here)"
echo "   Window 1: Frontend-Agent"
echo "   Window 2: Backend-Agent" 
echo "   Window 3: QA-Agent"
echo "   Window 4: Dev-Server"
echo "   Window 5: Build-Deploy"
echo "   Window 6: Project-Manager"
echo "   Window 7: Docs-Agent"
echo ""
echo "💡 Next steps:"
echo "   1. Start Claude agents in specialized windows"
echo "   2. Use send-claude-message.sh to communicate between agents"
echo "   3. Agents will self-schedule using schedule_with_note.sh"
echo ""
echo "🎯 To attach to the session: tmux attach-session -t $PROJECT_NAME"

# Switch to orchestrator window
tmux select-window -t "$PROJECT_NAME":0

# Attach to the session
tmux attach-session -t "$PROJECT_NAME"