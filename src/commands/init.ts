import fs from 'fs-extra';
import chalk from 'chalk';
import { execSync } from 'child_process';

export default async function init() {
  console.log(chalk.blue('Initializing Tailwind...'));

  // 1. install dependencies
  execSync('npm install -D tailwindcss postcss autoprefixer', {
    stdio: 'inherit',
  });

  // 2. create tailwind config
  const tailwindConfig = `
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4ade80"
      }
    }
  },
  plugins: [],
}
`;
  fs.writeFileSync('tailwind.config.js', tailwindConfig);

  // 3. create CSS file
  const css = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
  fs.ensureDirSync('src');
  fs.writeFileSync('src/index.css', css);

  console.log(chalk.green('Tailwind initialized successfully!'));
}
