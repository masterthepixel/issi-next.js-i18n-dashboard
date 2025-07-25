import inquirer from "inquirer";
import dotenv from "dotenv";
import { printTitle } from "./helpers.js";
import { doesEnvFileExist, generateEnv, testEnvFile } from "./envGenerator.js";
import { newEnvQuestions } from "./questions/newEnvQuestions.js";
import { existingEnvQuestions } from "./questions/existingEnvQuestions.js";
import { spawn } from "child_process";
import chalk from "chalk";

const handleExistingEnv = () => {
  console.log(chalk.yellow("Existing .env.local file found. Validating..."));

  try {
    testEnvFile();
  } catch (e) {
    console.log(e.message);
    return;
  }

  inquirer.prompt(existingEnvQuestions).then((answers) => {
    handleRunOption(answers.runOption);
  });
};

const handleNewEnv = () => {
  inquirer.prompt(newEnvQuestions).then((answers) => {
    generateEnv(answers);
    console.log("\n✅ Environment file (.env.local) successfully created!");
    handleRunOption(answers.runOption);
  });
};

const handleRunOption = (runOption) => {
  const projectPath = "/mnt/c/Users/kfiagbedzi/Documents/GitHub/issi-next.js-i18n-dashboard";
  
  if (runOption === "dev") {
    console.log(chalk.green("\n🚀 Starting development server..."));
    console.log(chalk.cyan(`Changing to project directory: ${projectPath}`));
    
    const devServer = spawn("npm", ["run", "dev"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    
    devServer.on('error', (err) => {
      console.error(chalk.red('Failed to start development server:'), err.message);
      console.log(chalk.yellow(`Please navigate to ${projectPath} and run 'npm install && npm run dev' manually.`));
    });
  }
  
  if (runOption === "build") {
    console.log(chalk.green("\n🏗️ Building and starting production server..."));
    console.log(chalk.cyan(`Changing to project directory: ${projectPath}`));
    
    const buildProcess = spawn("npm", ["run", "build"], {
      cwd: projectPath,
      stdio: "inherit",
    });
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log(chalk.green("Build completed! Starting production server..."));
        const startProcess = spawn("npm", ["start"], {
          cwd: projectPath,
          stdio: "inherit",
        });
      } else {
        console.error(chalk.red('Build failed with code'), code);
      }
    });
  }

  if (runOption === "manual") {
    console.log(chalk.green("\n✅ Environment file created successfully!"));
    console.log(chalk.cyan(`Navigate to: ${projectPath}`));
    console.log(chalk.white("Then run: npm install && npm run dev"));
    console.log(chalk.gray("\nYour .env.local file is ready with the configured environment variables."));
  }
};

printTitle();

if (doesEnvFileExist()) {
  handleExistingEnv();
} else {
  handleNewEnv();
}
