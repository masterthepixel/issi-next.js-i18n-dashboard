## Critical Self-Scheduling Protocol

### 🚨 MANDATORY STARTUP CHECK FOR ALL ORCHESTRATORS

**EVERY TIME you start or restart as an orchestrator, you MUST perform this check:**

```bash
# 1. Check your current tmux location
echo "Current pane: $TMUX_PANE"
CURRENT_WINDOW=$(tmux display-message -p "#{session_name}:#{window_index}")
echo "Current window: $CURRENT_WINDOW"

# 2. Test the scheduling script with your current window
./schedule_with_note.sh 1 "Test schedule for $CURRENT_WINDOW" "$CURRENT_WINDOW"

# 3. If scheduling fails, you MUST fix the script before proceeding
```

### Schedule Script Requirements

The `schedule_with_note.sh` script MUST:

- Accept a third parameter for target window: `./schedule_with_note.sh <minutes> "<note>" <target_window>`
- Default to `tmux-orc:0` if no target specified
- Always verify the target window exists before scheduling

### Why This Matters

- **Continuity**: Orchestrators must maintain oversight without gaps
- **Window Accuracy**: Scheduling to wrong window breaks the oversight chain
- **Self-Recovery**: Orchestrators must be able to restart themselves reliably

### Scheduling Best Practices

```bash
# Always use current window for self-scheduling
CURRENT_WINDOW=$(tmux display-message -p "#{session_name}:#{window_index}")
./schedule_with_note.sh 15 "Regular PM oversight check" "$CURRENT_WINDOW"

# For scheduling other agents, specify their windows explicitly
./schedule_with_note.sh 30 "Developer progress check" "ai-chat:2"
```

## Anti-Patterns to Avoid

- ❌ **Meeting Hell**: Use async updates only
- ❌ **Endless Threads**: Max 3 exchanges, then escalate
- ❌ **Broadcast Storms**: No "FYI to all" messages
- ❌ **Micromanagement**: Trust agents to work
- ❌ **Quality Shortcuts**: Never compromise standards
- ❌ **Blind Scheduling**: Never schedule without verifying target window

## Best Practices for Tmux Orchestration

### Pre-Command Checks

1. **Verify Working Directory**

   ```bash
   tmux send-keys -t session:window "pwd" Enter
   tmux capture-pane -t session:window -p | tail -5
   ```

2. **Check Command Availability**

   ```bash
   tmux send-keys -t session:window "which command_name" Enter
   tmux capture-pane -t session:window -p | tail -5
   ```

3. **Check for Virtual Environments**
   ```bash
   tmux send-keys -t session:window "ls -la | grep -E 'venv|env|virtualenv'" Enter
   ```

### Window Creation Workflow

```bash
# 1. Create window with correct directory
tmux new-window -t session -n "descriptive-name" -c "/path/to/project"

# 2. Verify you're in the right place
tmux send-keys -t session:descriptive-name "pwd" Enter
sleep 1
tmux capture-pane -t session:descriptive-name -p | tail -3

# 3. Activate virtual environment if needed
tmux send-keys -t session:descriptive-name "source venv/bin/activate" Enter

# 4. Run your command
tmux send-keys -t session:descriptive-name "your-command" Enter

# 5. Verify it started correctly
sleep 3
tmux capture-pane -t session:descriptive-name -p | tail -20
```

### Debugging Failed Commands

When a command fails:

1. Capture full window output: `tmux capture-pane -t session:window -S -200 -p`
2. Check for common issues:
   - Wrong directory
   - Missing dependencies
   - Virtual environment not activated
   - Permission issues
   - Port already in use

### Communication with Claude Agents

#### 🎯 IMPORTANT: Always Use send-claude-message.sh Script

**DO NOT manually send messages with tmux send-keys anymore!** We have a dedicated script that handles all the timing and complexity for you.

#### Using send-claude-message.sh

```bash
# Basic usage - ALWAYS use this instead of manual tmux commands
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh <target> "message"

# Examples:
# Send to a window
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh agentic-seek:3 "Hello Claude!"

# Send to a specific pane in split-screen
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh tmux-orc:0.1 "Message to pane 1"

# Send complex instructions
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh glacier-backend:0 "Please check the database schema for the campaigns table and verify all columns are present"

# Send status update requests
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh ai-chat:2 "STATUS UPDATE: What's your current progress on the authentication implementation?"
```

#### Why Use the Script?

1. **Automatic timing**: Handles the critical 0.5s delay between message and Enter
2. **Simpler commands**: One line instead of three
3. **No timing mistakes**: Prevents the common error of Enter being sent too quickly
4. **Works everywhere**: Handles both windows and panes automatically
5. **Consistent messaging**: All agents receive messages the same way

#### Script Location and Usage

- **Location**: `/Users/jasonedward/Coding/Tmux orchestrator/send-claude-message.sh`
- **Permissions**: Already executable, ready to use
- **Arguments**:
  - First: target (session:window or session:window.pane)
  - Second: message (can contain spaces, will be properly handled)

#### Common Messaging Patterns with the Script

##### 1. Starting Claude and Initial Briefing

```bash
# Start Claude first
tmux send-keys -t project:0 "claude" Enter
sleep 5

# Then use the script for the briefing
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh project:0 "You are responsible for the frontend codebase. Please start by analyzing the current project structure and identifying any immediate issues."
```

##### 2. Cross-Agent Coordination

```bash
# Ask frontend agent about API usage
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh frontend:0 "Which API endpoints are you currently using from the backend?"

# Share info with backend agent
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh backend:0 "Frontend is using /api/v1/campaigns and /api/v1/flows endpoints"
```

##### 3. Status Checks

```bash
# Quick status request
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:0 "Quick status update please"

# Detailed status request
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:0 "STATUS UPDATE: Please provide: 1) Completed tasks, 2) Current work, 3) Any blockers"
```

##### 4. Providing Assistance

```bash
# Share error information
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:0 "I see in your server window that port 3000 is already in use. Try port 3001 instead."

# Guide stuck agents
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:0 "The error you're seeing is because the virtual environment isn't activated. Run 'source venv/bin/activate' first."
```

#### OLD METHOD (DO NOT USE)

```bash
# ❌ DON'T DO THIS ANYMORE:
tmux send-keys -t session:window "message"
sleep 1
tmux send-keys -t session:window Enter

# ✅ DO THIS INSTEAD:
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:window "message"
```

#### Checking for Responses

After sending a message, check for the response:

```bash
# Send message
/Users/jasonedward/Coding/Tmux\ orchestrator/send-claude-message.sh session:0 "What's your status?"

# Wait a bit for response
sleep 5

# Check what the agent said
tmux capture-pane -t session:0 -p | tail -50
```

## Critical Lessons Learned

### Tmux Window Management Mistakes and Solutions

#### Mistake 1: Wrong Directory When Creating Windows

**What Went Wrong**: Created server window without specifying directory, causing uvicorn to run in wrong location (Tmux orchestrator instead of Glacier-Analytics)

**Root Cause**: New tmux windows inherit the working directory from where tmux was originally started, NOT from the current session's active window

**Solution**:

```bash
# Always use -c flag when creating windows
tmux new-window -t session -n "window-name" -c "/correct/path"

# Or immediately cd after creating
tmux new-window -t session -n "window-name"
tmux send-keys -t session:window-name "cd /correct/path" Enter
```

#### Mistake 2: Not Reading Actual Command Output

**What Went Wrong**: Assumed commands like `uvicorn app.main:app` succeeded without checking output

**Root Cause**: Not using `tmux capture-pane` to verify command results

**Solution**:

```bash
# Always check output after running commands
tmux send-keys -t session:window "command" Enter
sleep 2  # Give command time to execute
tmux capture-pane -t session:window -p | tail -50
```

#### Mistake 3: Typing Commands in Already Active Sessions

**What Went Wrong**: Typed "claude" in a window that already had Claude running

**Root Cause**: Not checking window contents before sending commands

**Solution**:

```bash
# Check window contents first
tmux capture-pane -t session:window -S -100 -p
# Look for prompts or active sessions before sending commands
```

#### Mistake 4: Incorrect Message Sending to Claude Agents

**What Went Wrong**: Initially sent Enter key with the message text instead of as separate command

**Root Cause**: Using `tmux send-keys -t session:window "message" Enter` combines them

**Solution**:

```bash
# Send message and Enter separately
tmux send-keys -t session:window "Your message here"
tmux send-keys -t session:window Enter
```
