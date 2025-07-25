# WSL + Tmux Setup Guide (Native, No Docker)

## 🎯 **Switch to Native Ubuntu WSL**

You're currently in Docker's WSL environment. Let's switch to your native Ubuntu installation:

### **Step 1: Exit Docker WSL and Enter Native Ubuntu**
```bash
# Exit current Docker WSL session
exit

# In PowerShell, launch your native Ubuntu WSL
wsl -d Ubuntu

# Or simply:
wsl
```

### **Step 2: Install Required Tools in Native WSL**
```bash
# Update package lists
sudo apt update

# Install tmux and essential tools
sudo apt install -y tmux git curl build-essential

# Install Node.js (for your Next.js project)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Verify installations
tmux -V
node --version
pnpm --version
```

### **Step 3: Navigate to Your Project**
```bash
# Go to your project directory
cd /mnt/c/Users/kfiagbedzi/Documents/GitHub/issi-next.js-i18n-dashboard

# Verify you're in the right place
ls -la | grep package.json
```

### **Step 4: Test Tmux Installation**
```bash
# Start a tmux session
tmux new-session -d -s test-session

# List sessions to verify it's working
tmux list-sessions

# Kill the test session
tmux kill-session -t test-session
```

### **Step 5: Launch ISSI Tmux Orchestrator**
```bash
# Make scripts executable
chmod +x ./tmux-orchestrator/scripts/*.sh
chmod +x ./schedule_with_note.sh
chmod +x ./send-claude-message.sh

# Start the ISSI development team
./tmux-orchestrator/scripts/start-issi-project.sh

# Deploy Claude agents to their windows
./tmux-orchestrator/scripts/deploy-issi-team.sh
```

## 🚀 **Benefits of Native WSL + Tmux**
- ✅ **No Docker overhead** - Direct access to system resources
- ✅ **Full Linux environment** - All bash scripts work perfectly
- ✅ **Native file system access** - Direct access to Windows files
- ✅ **Better performance** - No containerization layer
- ✅ **Persistent sessions** - Tmux sessions survive across WSL restarts

## 🔧 **Troubleshooting**
If you encounter issues:

### **WSL Not Finding Ubuntu**
```powershell
# List available distributions
wsl --list --verbose

# Set Ubuntu as default
wsl --set-default Ubuntu
```

### **Permission Issues**
```bash
# Fix script permissions
find ./tmux-orchestrator -name "*.sh" -exec chmod +x {} \;
```

### **Node.js/pnpm Issues**
```bash
# Alternative Node.js installation via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 20
nvm use 20
```
