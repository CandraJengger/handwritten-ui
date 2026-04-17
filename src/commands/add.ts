import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default async function add(component: string) {
  if (component === 'button') {
    const templatePath = path.join(__dirname, '../templates/button.tsx');

    const targetDir = 'src/components/ui';
    const targetPath = path.join(targetDir, 'button.tsx');

    fs.ensureDirSync(targetDir);
    fs.copyFileSync(templatePath, targetPath);

    console.log(chalk.green('Button component added!'));
  } else {
    console.log(chalk.red(`Component "${component}" not found`));
  }
}
