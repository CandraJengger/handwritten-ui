import fs from 'fs-extra';
import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      fontFamily: {
        virgil: ['Virgil', 'sans-serif'],
      },
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
@font-face {
  font-family: 'Virgil';
  src: url('/virgil.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@import "tailwindcss";
`;
  fs.ensureDirSync('src');
  fs.writeFileSync('src/index.css', css);

  // 4. copy font
  console.log(chalk.blue('Linking handwriting font...'));
  const fontName = 'virgil.woff2';
  // In production (dist/), the font is in the same directory as the index.js or one level up
  // In development, it's in public/
  const possiblePaths = [
    path.resolve(__dirname, '..', fontName), // dist/virgil.woff2 (standard)
    path.resolve(__dirname, fontName), // dist/commands/virgil.woff2 (if copied there)
    path.resolve(__dirname, '../../public', fontName), // public/virgil.woff2 (dev)
  ];

  const sourcePath = possiblePaths.find((p) => fs.existsSync(p));

  if (sourcePath) {
    fs.ensureDirSync('public');
    fs.copySync(sourcePath, path.join('public', fontName));
    console.log(chalk.green(`Copied ${fontName} to public/`));
  } else {
    console.warn(
      chalk.yellow(
        `Warning: Could not find ${fontName} in any expected locations.`,
      ),
    );
  }

  console.log(chalk.green('Handwritten UI initialized successfully!'));
}
