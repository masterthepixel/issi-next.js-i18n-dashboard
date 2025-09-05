# First Time Setup 👋

Welcome to the ISSI Next.js i18n Dashboard project! This guide is designed for developers who are new to the project or need a step-by-step walkthrough of the setup process.

## 🎯 What You'll Learn

By the end of this guide, you'll be able to:

- Set up your development environment
- Run the application locally
- Understand the project structure
- Make your first code changes
- Deploy your changes (optional)

## 📋 Before You Start

### Time Estimate

- **Basic Setup**: 15-30 minutes
- **Full Setup with CMS**: 45-60 minutes
- **First Contribution**: 1-2 hours

### What You Need

- A computer with internet access
- Basic knowledge of JavaScript/TypeScript
- Familiarity with command line tools
- A GitHub account (optional, for contributions)

## 🚀 Step-by-Step Setup

### Step 1: Install Prerequisites

#### Option A: Using the Automated Script (Recommended)

If you're on Windows, we have an automated setup script:

```bash
# Download and run the setup script
# (Script location: scripts/setup-dev-environment.ps1)
```

#### Option B: Manual Installation

1. **Install Node.js**

   - Visit: https://nodejs.org/
   - Download the LTS version (20.x recommended)
   - Run the installer and follow the prompts

2. **Install pnpm (Package Manager)**

   ```bash
   npm install -g pnpm
   ```

3. **Install Git**

   - Visit: https://git-scm.com/
   - Download and install Git for your platform

4. **Install VS Code (Recommended Editor)**
   - Visit: https://code.visualstudio.com/
   - Install the editor
   - Install recommended extensions (we'll cover this later)

### Step 2: Verify Your Installation

Open a terminal/command prompt and run these commands:

```bash
# Check Node.js version
node --version
# Should show: v20.x.x or v18.x.x

# Check pnpm version
pnpm --version
# Should show: 8.x.x or higher

# Check Git version
git --version
# Should show: 2.x.x
```

If any command fails, go back to Step 1 and reinstall that tool.

### Step 3: Clone the Project

```bash
# Open terminal/command prompt
# Navigate to where you want to store the project
cd Desktop  # or any folder you prefer

# Clone the repository
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git

# Enter the project directory
cd issi-next.js-i18n-dashboard

# Check that you're on the right branch
git branch
# Should show: feat/shadcn-initial
```

### Step 4: Install Project Dependencies

```bash
# Install all project dependencies
pnpm install

# This may take 2-5 minutes depending on your internet speed
# You'll see lots of progress messages - this is normal
```

> **What are dependencies?** These are pre-built code libraries that our project needs to run. pnpm downloads and installs them automatically.

### Step 5: Configure Environment Variables

```bash
# Copy the environment template
cp .env.example .env.local

# Open the file to see what needs to be configured
code .env.local  # or use notepad .env.local
```

The `.env.local` file contains settings for different features. For basic development, you only need a few:

```env
# Basic settings (uncomment these)
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# Keep everything else commented out for now
```

> **Why comment things out?** Many features are optional. We keep them commented to avoid configuration errors during initial setup.

### Step 6: Start the Development Server

```bash
# Start the application
pnpm dev
```

You should see output like:

```
▲ Next.js 15.5.2
- Local:        http://localhost:3000
- Environments: .env.local
✓ Ready in 2.3s
```

### Step 7: View Your Application

1. **Open your web browser**
2. **Navigate to**: `http://localhost:3000`
3. **You should see**: The ISSI dashboard homepage

### Step 8: Test Basic Features

Try these to make sure everything works:

1. **Language Switching**

   - Look for language buttons/flags
   - Try switching between English, Spanish, and French
   - URLs should change: `/en/`, `/es/`, `/fr/`

2. **Navigation**

   - Click on different menu items
   - Try the 3D globe navigation
   - Test breadcrumb navigation

3. **Responsive Design**
   - Resize your browser window
   - Try different screen sizes
   - Check mobile layout

## 🧪 Testing Your Setup

### Run the Test Suite

```bash
# Run all tests
pnpm test

# You should see tests passing (green checkmarks)
```

### Check Code Quality

```bash
# Check for code issues
pnpm lint

# Fix any issues automatically
pnpm lint:fix
```

## 📁 Understanding the Project Structure

Let's explore what you just downloaded:

```
issi-next.js-i18n-dashboard/
├── src/                    # Your main application code
│   ├── app/               # Next.js pages and routes
│   ├── components/        # Reusable UI components
│   ├── lib/              # Helper functions and utilities
│   └── lang/             # Translation files (EN/ES/FR)
├── docs/                  # Documentation (you're reading this!)
├── public/               # Images, fonts, and static files
├── package.json          # Project configuration and scripts
├── tailwind.config.ts    # Styling configuration
└── next.config.mjs       # Next.js configuration
```

### Key Directories to Know

- **`src/app/`**: Where page components live
- **`src/components/`**: Reusable UI pieces
- **`src/lang/`**: Translation files for i18n
- **`docs/`**: Documentation (like this guide)

## 🛠️ Your First Code Change

Let's make a small, safe change to verify everything works:

### Step 1: Open the Project in VS Code

```bash
# Open the project in VS Code
code .
```

### Step 2: Install Recommended Extensions

VS Code will prompt you to install recommended extensions. Install these:

- **ES7+ React/Redux/React-Native snippets**
- **Tailwind CSS IntelliSense**
- **TypeScript Importer**
- **Auto Rename Tag**

### Step 3: Make a Small Change

1. Open `src/app/[locale]/page.tsx`
2. Find a text element (look for something like "Welcome" or "Hello")
3. Change the text slightly (e.g., add an exclamation mark)
4. Save the file

### Step 4: See Your Change

The browser should automatically refresh and show your change!

## 🔧 Common First-Time Issues

### Issue: "pnpm: command not found"

**Solution**: Reinstall pnpm

```bash
npm install -g pnpm
```

### Issue: Port 3000 already in use

**Solution**: Use a different port

```bash
pnpm dev --port 3001
```

Then visit: `http://localhost:3001`

### Issue: "Module not found" errors

**Solution**: Clear and reinstall dependencies

```bash
rm -rf node_modules
pnpm install
```

### Issue: Git clone fails

**Solution**: Check your internet connection and try again

```bash
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git
```

## 🎯 What's Next?

### Immediate Next Steps

1. **Explore the codebase**: Look at different components
2. **Try the CMS**: Set up PayloadCMS for content management
3. **Read more docs**: Check out the guides in `docs/`

### Learning Path

1. **[Component Development Guide](../COMPONENT_DEVELOPMENT_GUIDE.md)** - How to build components
2. **[Next.js 15 Compatibility](../NEXTJS_15_COMPATIBILITY.md)** - Framework-specific features
3. **[Internationalization Guide](../guides/i18n-guide.md)** - Multi-language features

### Making Contributions

1. **Read the Contributing Guide** (if available)
2. **Check existing issues** on GitHub
3. **Start with small changes** and work up to larger features

## 📞 Getting Help

### Documentation Resources

- **[Troubleshooting Guide](../guides/troubleshooting.md)** - Solutions to common problems
- **[FAQ](../guides/faq.md)** - Frequently asked questions
- **[Bugs and Issues](../project/bugs-and-issues.md)** - Known problems

### Community Support

- **GitHub Issues**: Report bugs or ask questions
- **Project Wiki**: Additional documentation
- **Team Chat**: Ask other developers (if available)

## ✅ Success Checklist

Before you finish this setup:

- [ ] All prerequisites installed and working
- [ ] Project cloned successfully
- [ ] Dependencies installed without errors
- [ ] Development server starts successfully
- [ ] Application loads in browser
- [ ] Language switching works
- [ ] Made and saw your first code change
- [ ] Tests pass (optional but recommended)

## 🎉 Congratulations!

You've successfully set up the ISSI Next.js i18n Dashboard! You're now ready to:

- Explore the codebase
- Make changes and see them live
- Learn about modern React/Next.js development
- Contribute to the project

Welcome to the team! 🚀

---

**Last Updated**: September 2, 2025
**For**: New developers and first-time contributors
