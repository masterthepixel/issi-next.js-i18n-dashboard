import { isValidKey, validKeyErrorMessage } from "../helpers.js";
import { RUN_OPTION_QUESTION } from "./sharedQuestions.js";

export const newEnvQuestions = [
    {
        type: "input",
        name: "apiBaseUrl",
        message: "Enter your API base URL (or press enter for default):",
        default: "https://api.example.com"
    },
    {
        type: "input",
        name: "contentApiKey",
        message: "Enter your content API key (optional):"
    },
    {
        type: "input",
        name: "googleClientId",
        message: "Enter your Google OAuth Client ID (optional):"
    },
    {
        type: "input",
        name: "googleClientSecret",
        message: "Enter your Google OAuth Client Secret (optional):"
    },
    {
        type: "input",
        name: "githubClientId",
        message: "Enter your GitHub OAuth Client ID (optional):"
    },
    {
        type: "input",
        name: "githubClientSecret",
        message: "Enter your GitHub OAuth Client Secret (optional):"
    },
    {
        type: "input",
        name: "gaMeasurementId",
        message: "Enter your Google Analytics Measurement ID (optional):"
    },
    {
        type: "input",
        name: "cloudinaryCloudName",
        message: "Enter your Cloudinary cloud name (optional):"
    },
    {
        type: "input",
        name: "uploadPreset",
        message: "Enter your Cloudinary upload preset (optional):"
    },
    {
        type: "input",
        name: "smtpHost",
        message: "Enter your SMTP host (optional):"
    },
    {
        type: "input",
        name: "smtpUser",
        message: "Enter your SMTP username (optional):"
    },
    {
        type: "input",
        name: "smtpPassword",
        message: "Enter your SMTP password (optional):",
        type: "password"
    },
    RUN_OPTION_QUESTION
];
