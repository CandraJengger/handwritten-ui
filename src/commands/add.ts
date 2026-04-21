import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';

export default async function add(component: string) {
  const templatePath = path.join(__dirname, `templates/${component}.tsx`);

  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`Component "${component}" not found`));
    return;
  }

  const targetDir = 'src/components/ui';
  const targetPath = path.join(targetDir, `${component}.tsx`);

  fs.ensureDirSync(targetDir);
  fs.copyFileSync(templatePath, targetPath);

  const capitalizedName =
    component.charAt(0).toUpperCase() + component.slice(1);
  console.log(chalk.green(`${capitalizedName} component added!`));
}
