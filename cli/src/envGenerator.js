import crypto from "crypto";
import fs from "fs";
import chalk from "chalk";

export const generateEnv = (envValues) => {
  let isDockerCompose = envValues.runOption === "docker-compose";
  let dbPort = isDockerCompose ? 3307 : 3306;
  let platformUrl = isDockerCompose
    ? "http://host.docker.internal:8000"
    : "http://localhost:8000";

  const envDefinition = getEnvDefinition(
    envValues,
    isDockerCompose,
    dbPort,
    platformUrl
  );

  const envFileContent = generateEnvFileContent(envDefinition);
  saveEnvFile(envFileContent);
};

const getEnvDefinition = (envValues) => {
  return {
    "Development Environment": {
      NODE_ENV: "development",
      NEXT_PUBLIC_SITE_URL: "http://localhost:3000",
    },
    "Content Management": {
      NEXT_PUBLIC_API_BASE_URL: envValues.apiBaseUrl || "https://api.example.com",
      NEXT_PUBLIC_CONTENT_API_KEY: envValues.contentApiKey || '"<your-content-api-key>"',
    },
    "Next Auth Configuration": {
      NEXTAUTH_SECRET: generateAuthSecret(),
      NEXTAUTH_URL: "http://localhost:3000",
    },
    "Authentication Providers": {
      GOOGLE_CLIENT_ID: envValues.googleClientId || '"<your-google-client-id>"',
      GOOGLE_CLIENT_SECRET: envValues.googleClientSecret || '"<your-google-client-secret>"',
      GITHUB_CLIENT_ID: envValues.githubClientId || '"<your-github-client-id>"',
      GITHUB_CLIENT_SECRET: envValues.githubClientSecret || '"<your-github-client-secret>"',
    },
    "Analytics & Tracking": {
      NEXT_PUBLIC_GA_MEASUREMENT_ID: envValues.gaMeasurementId || '"<your-ga-measurement-id>"',
      NEXT_PUBLIC_HOTJAR_ID: envValues.hotjarId || '"<your-hotjar-id>"',
    },
    "Media & Assets": {
      NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: envValues.cloudinaryCloudName || '"<your-cloudinary-cloud-name>"',
      NEXT_PUBLIC_UPLOAD_PRESET: envValues.uploadPreset || '"<your-upload-preset>"',
    },
    "Email Services": {
      SMTP_HOST: envValues.smtpHost || '"<your-smtp-host>"',
      SMTP_PORT: envValues.smtpPort || '587',
      SMTP_USER: envValues.smtpUser || '"<your-smtp-user>"',
      SMTP_PASSWORD: envValues.smtpPassword || '"<your-smtp-password>"',
    },
  };
};

const generateEnvFileContent = (config) => {
  let configFile = "";

  Object.entries(config).forEach(([section, variables]) => {
    configFile += `# ${section}:\n`;
    Object.entries(variables).forEach(([key, value]) => {
      configFile += `${key}=${value}\n`;
    });
    configFile += "\n";
  });

  return configFile.trim();
};

const generateAuthSecret = () => {
  const length = 32;
  const buffer = crypto.randomBytes(length);
  return buffer.toString("base64");
};

const ENV_PATH = "../.env.local";

export const doesEnvFileExist = () => {
  return fs.existsSync(ENV_PATH);
};

// Read the existing env file, test if it is missing any keys or contains any extra keys
export const testEnvFile = () => {
  const data = fs.readFileSync(ENV_PATH, "utf8");

  // Make a fake definition to compare the keys of
  const envDefinition = getEnvDefinition({});

  const lines = data
    .split("\n")
    .filter((line) => !line.startsWith("#") && line.trim() !== "");
  const envKeysFromFile = lines.map((line) => line.split("=")[0]);

  const envKeysFromDef = Object.entries(envDefinition).flatMap(
    ([section, entries]) => Object.keys(entries)
  );

  const missingFromFile = envKeysFromDef.filter(
    (key) => !envKeysFromFile.includes(key)
  );

  if (missingFromFile.length > 0) {
    let errorMessage = "\nYour .env.local file is missing the following keys:\n";
    missingFromFile.forEach((key) => {
      errorMessage += chalk.whiteBright(`- ❌  ${key}\n`);
    });
    errorMessage += "\n";

    errorMessage += chalk.red(
      "We recommend deleting your .env file(s) and restarting this script."
    );
    throw new Error(errorMessage);
  }
};

export const saveEnvFile = (envFileContent) => {
  fs.writeFileSync(ENV_PATH, envFileContent);
};
