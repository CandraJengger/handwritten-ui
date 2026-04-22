import fs from 'fs-extra';
import chalk from 'chalk';
import { execSync } from 'child_process';
import path from 'path';

export function nextConfig() {
  // 1. install dependencies
  execSync(
    'npm install -D tailwindcss postcss @tailwindcss/postcss roughjs lucide-react',
    {
      stdio: 'inherit',
    },
  );

  // 2. create CSS file
  const css = `
@font-face {
  font-family: 'Virgil';
  src: url('/virgil.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@import "tailwindcss";

@theme {
  --font-virgil: 'Virgil', sans-serif;
}
`;

  fs.ensureDirSync('src/app');
  fs.writeFileSync('src/app/globals.css', css);

  // 3 copy lib
  const templatePath = path.join(__dirname, 'lib');

  const targetDir = 'src/app/lib';
  const targetPath = path.join(targetDir, 'styles.ts');

  fs.ensureDirSync(targetDir);
  fs.copySync(templatePath, targetPath);

  console.log(chalk.green('Lib added!'));

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
}
