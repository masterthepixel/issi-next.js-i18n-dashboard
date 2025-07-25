export const RUN_OPTION_QUESTION = {
  type: 'list',
  name: 'runOption',
  choices: [
    { value: "dev", name: "🚀 Development Server (npm run dev)" },
    { value: "build", name: "🏗️ Build & Start (npm run build && npm start)" },
    { value: "manual", name: "✋ Just generate .env file" },
  ],
  message: 'What would you like to do after generating the environment file?',
  default: "dev",
}
