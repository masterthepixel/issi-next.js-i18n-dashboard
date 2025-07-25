# ISSI Tmux Orchestrator Implementation

## Overview

The ISSI project now includes a complete **Tmux Orchestrator** system for autonomous AI-powered development. This enables Claude agents to work continuously across multiple tmux sessions, maintaining development progress 24/7 without human supervision.

## 🚀 Quick Start

### 1. Start the ISSI Development Team
```bash
# Create and configure the tmux session
./tmux-orchestrator/scripts/start-issi-project.sh
```

### 2. Deploy Claude Agents
```bash
# Deploy specialized agents to their windows
./tmux-orchestrator/scripts/deploy-issi-team.sh
```

### 3. Monitor Team Progress
```bash
# View Project Manager window (coordination hub)
tmux select-window -t issi-i18n:6

# Check different agents
tmux select-window -t issi-i18n:1  # Frontend Agent
tmux select-window -t issi-i18n:3  # QA Agent
```

## 🏗️ Team Structure

The system creates an 8-window tmux session with specialized roles:

| Window | Agent Role | Responsibilities |
|--------|------------|-----------------|
| 0 | **Orchestrator** | High-level coordination, deployment decisions |
| 1 | **Frontend Agent** | React components, i18n, UI/UX, Tailwind CSS |
| 2 | **Backend Agent** | Data management, API endpoints, server logic |
| 3 | **QA Agent** | Testing, validation, URL checking, accessibility |
| 4 | **Dev Server** | Development server management |
| 5 | **Build Agent** | CI/CD, builds, deployment pipeline |
| 6 | **Project Manager** | Quality standards, team coordination, oversight |
| 7 | **Documentation Agent** | Documentation maintenance, knowledge management |

## 🛠️ Core Scripts

### Session Management
- **`start-issi-project.sh`** - Creates the tmux session structure
- **`deploy-issi-team.sh`** - Deploys Claude agents with specialized briefings

### Communication & Scheduling
- **`send-claude-message.sh`** - Send messages between agents (already exists)
- **`schedule_with_note.sh`** - Self-scheduling system for agents
- **`tmux_utils.py`** - Python utilities for tmux interaction (already exists)

## 📋 Agent Briefings

Detailed briefing templates ensure each agent understands their role:

- **`frontend-agent-briefing.md`** - React, i18n, UI/UX specialist
- **`project-manager-briefing.md`** - Quality standards, team coordination
- **`qa-agent-briefing.md`** - Testing, validation, quality assurance

## 💬 Communication Protocols

### Status Updates
Agents provide structured status reports:
```
STATUS [Agent-Name] [Timestamp]
Completed: [Specific tasks completed]
Current: [What working on now]
Blocked: [Any blockers or dependencies]
ETA: [Expected completion time]
```

### Cross-Agent Messaging
```bash
# Send message to specific agent
./send-claude-message.sh issi-i18n:1 "Please update the product page component"

# Coordinate between agents
./send-claude-message.sh issi-i18n:6 "Frontend reports component ready for QA testing"
```

## ⏰ Self-Scheduling System

Agents maintain autonomous operation through self-scheduling:

```bash
# Schedule regular check-ins
./schedule_with_note.sh 30 "Progress check and status update" "issi-i18n:1"

# Schedule cross-team coordination
./schedule_with_note.sh 60 "Coordinate with QA for testing" "issi-i18n:6"
```

## 🔐 Git Discipline

**MANDATORY** for all agents:
- **Auto-commit every 30 minutes** during active work
- **Commit before task switches** - never leave uncommitted changes
- **Meaningful commit messages** - describe what and why
- **Feature branch workflow** for new development
- **Tag stable versions** before major changes

## 🧪 ISSI-Specific Quality Assurance

### Automated Testing Integration
```bash
# Product URL validation (30 products × 3 languages = 90 URLs)
npm run test:products:all

# Complete validation suite
npm run validate:all

# Lint and code quality
npm run lint
```

### Critical Quality Gates
- ✅ All 90 product URLs return 200 OK
- ✅ Zero JavaScript console errors in any language
- ✅ WCAG AA accessibility compliance
- ✅ Mobile-first responsive design works perfectly
- ✅ i18n support complete (EN/ES/FR)

## 📊 Monitoring & Oversight

### Project Manager Dashboard
The Project Manager (Window 6) maintains oversight through:
- Regular status collection from all agents
- Quality verification before any deployments
- Risk identification and mitigation
- Cross-team coordination and task assignment

### Orchestrator Oversight
The Orchestrator (Window 0) handles:
- Strategic project direction
- Inter-project dependencies
- Team deployment and configuration
- Escalation resolution

## 🚨 Emergency Procedures

### Critical Issue Response
1. **Immediate**: Stop current work, commit progress
2. **Document**: Capture exact error messages and reproduction steps
3. **Escalate**: Notify Project Manager and Orchestrator
4. **Coordinate**: Use structured communication for resolution

### Quality Emergency Stops
Development halts for:
- Security vulnerabilities
- Data loss or corruption risks
- Complete system failures
- Critical accessibility violations

## 📈 Success Metrics

### Team Performance
- **30-minute commit frequency** maintained by all agents
- **>95% build success rate** across all deployments
- **100% product URL functionality** across all languages
- **Zero critical bugs** in production releases

### Process Efficiency
- **<2 hour blocker resolution** average time
- **<15 minute communication response** between agents
- **>90% automated test coverage** for all features
- **100% WCAG AA compliance** maintained

## 🔄 Development Workflow

### Daily Operations
1. **Morning Standup**: Project Manager collects status from all agents
2. **Continuous Development**: Agents work autonomously with 30-minute commits
3. **Regular Check-ins**: Self-scheduled progress reviews
4. **End-of-Day Review**: Complete system validation by QA

### Feature Development Cycle
1. **Planning**: Orchestrator and Project Manager define requirements
2. **Assignment**: Project Manager assigns tasks to appropriate agents
3. **Development**: Frontend/Backend agents implement features
4. **Testing**: QA Agent validates functionality across all languages
5. **Integration**: Build Agent handles deployment pipeline
6. **Documentation**: Documentation Agent updates guides and README

## 🎯 Next Steps

1. **Run the startup script** to create your tmux session
2. **Deploy the team** using the deployment script
3. **Monitor the Project Manager** window for team coordination
4. **Let agents work autonomously** with scheduled check-ins
5. **Maintain oversight** through the Orchestrator role

## 📞 Support & Troubleshooting

### Common Issues
- **Session not found**: Run `start-issi-project.sh` first
- **Agent not responding**: Check window exists with `tmux list-windows`
- **Communication failures**: Verify `send-claude-message.sh` is executable
- **Scheduling issues**: Check `schedule_with_note.sh` permissions

### Debug Commands
```bash
# List all tmux sessions
tmux list-sessions

# Check windows in ISSI session
tmux list-windows -t issi-i18n

# Capture agent window output
tmux capture-pane -t issi-i18n:1 -p
```

---

**The ISSI Tmux Orchestrator enables true autonomous development. Your team will work continuously, maintain quality standards, and deliver results while you sleep.** 🌙✨

*Ready to launch? Run `./tmux-orchestrator/scripts/start-issi-project.sh` to begin!*