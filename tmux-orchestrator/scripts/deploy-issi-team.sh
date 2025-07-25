#!/bin/bash

# ISSI Team Deployment Script
# Deploys Claude agents to their respective tmux windows with specialized briefings

set -e

PROJECT_NAME="issi-i18n"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATES_DIR="$SCRIPT_DIR/../templates"

echo "🚀 Deploying ISSI i18n Dashboard Development Team..."

# Check if session exists
if ! tmux has-session -t "$PROJECT_NAME" 2>/dev/null; then
    echo "❌ Error: Tmux session '$PROJECT_NAME' does not exist."
    echo "Please run the startup script first:"
    echo "   ./tmux-orchestrator/scripts/start-issi-project.sh"
    exit 1
fi

# Function to deploy agent to specific window
deploy_agent() {
    local window_name=$1
    local window_index=$2
    local briefing_file=$3
    local agent_role=$4
    
    echo "👥 Deploying $agent_role to window $window_index ($window_name)..."
    
    # Start Claude in the window
    tmux send-keys -t "$PROJECT_NAME:$window_index" "claude" Enter
    sleep 3
    
    # Send the briefing
    if [ -f "$briefing_file" ]; then
        echo "📋 Sending briefing for $agent_role..."
        
        # Read briefing content and send it
        briefing_content=$(cat "$briefing_file")
        
        # Use the send-claude-message script if available
        if [ -f "$SCRIPT_DIR/../../send-claude-message.sh" ]; then
            "$SCRIPT_DIR/../../send-claude-message.sh" "$PROJECT_NAME:$window_index" "$briefing_content"
        else
            # Fallback to direct tmux commands
            tmux send-keys -t "$PROJECT_NAME:$window_index" "$briefing_content"
            sleep 1
            tmux send-keys -t "$PROJECT_NAME:$window_index" Enter
        fi
        
        echo "✅ $agent_role deployed and briefed successfully!"
    else
        echo "⚠️  Warning: Briefing file not found: $briefing_file"
        echo "📝 Sending basic briefing for $agent_role..."
        
        basic_briefing="You are the $agent_role for the ISSI Next.js i18n Dashboard project.

Your window: $PROJECT_NAME:$window_index
Your role: $agent_role

Key responsibilities:
- Follow git discipline (commit every 30 minutes)
- Communicate with Project Manager in window 6
- Use ./schedule_with_note.sh for self-scheduling
- Maintain high quality standards

Please confirm you understand your role and are ready to begin work."
        
        if [ -f "$SCRIPT_DIR/../../send-claude-message.sh" ]; then
            "$SCRIPT_DIR/../../send-claude-message.sh" "$PROJECT_NAME:$window_index" "$basic_briefing"
        else
            tmux send-keys -t "$PROJECT_NAME:$window_index" "$basic_briefing"
            sleep 1
            tmux send-keys -t "$PROJECT_NAME:$window_index" Enter
        fi
    fi
}

# Deploy agents to their respective windows
echo ""
echo "🎯 Deploying specialized agents..."

# Window 1: Frontend Agent
deploy_agent "Frontend-Agent" 1 "$TEMPLATES_DIR/frontend-agent-briefing.md" "Frontend Development Agent"

# Window 2: Backend Agent (basic briefing - create detailed template later)
deploy_agent "Backend-Agent" 2 "" "Backend/API Development Agent"

# Window 3: QA Agent
deploy_agent "QA-Agent" 3 "$TEMPLATES_DIR/qa-agent-briefing.md" "QA Testing Agent"

# Window 4: Dev Server (no Claude agent - just server)
echo "🌐 Window 4 (Dev-Server) - Reserved for development server"

# Window 5: Build Agent (basic briefing)
deploy_agent "Build-Deploy" 5 "" "Build & Deployment Agent"

# Window 6: Project Manager
deploy_agent "Project-Manager" 6 "$TEMPLATES_DIR/project-manager-briefing.md" "Project Manager"

# Window 7: Documentation Agent (basic briefing)
deploy_agent "Docs-Agent" 7 "" "Documentation Agent"

echo ""
echo "🎉 ISSI Development Team Deployment Complete!"
echo ""
echo "📊 Team Structure:"
echo "   Window 0: Orchestrator (You)"
echo "   Window 1: Frontend Agent ✅"
echo "   Window 2: Backend Agent ✅"
echo "   Window 3: QA Agent ✅"
echo "   Window 4: Dev Server (Manual)"
echo "   Window 5: Build Agent ✅"
echo "   Window 6: Project Manager ✅"
echo "   Window 7: Documentation Agent ✅"
echo ""
echo "💡 Next Steps:"
echo "   1. Switch to Project Manager window: tmux select-window -t $PROJECT_NAME:6"
echo "   2. Start development server in window 4: tmux select-window -t $PROJECT_NAME:4"
echo "   3. Project Manager will coordinate team activities"
echo "   4. All agents will self-schedule and report progress"
echo ""
echo "🔄 To monitor team communication:"
echo "   tmux capture-pane -t $PROJECT_NAME:6 -p  # Project Manager"
echo "   tmux capture-pane -t $PROJECT_NAME:1 -p  # Frontend Agent"
echo "   tmux capture-pane -t $PROJECT_NAME:3 -p  # QA Agent"
echo ""
echo "⚡ Team is now operational and ready for autonomous development!"