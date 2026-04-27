import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import prompts from 'prompts';
import { execSync } from 'child_process';

// Map of component names to their required npm packages
const componentDependencies: Record<string, string[]> = {
  datepicker: ['react-datepicker', '@types/react-datepicker'],
  'date-range-picker': ['react-datepicker', '@types/react-datepicker'],
  'month-picker': ['react-datepicker', '@types/react-datepicker'],
  'time-picker': ['react-datepicker', '@types/react-datepicker'],
  typography: [],
};

function detectPackageManager(): 'pnpm' | 'yarn' | 'npm' {
  try {
    if (fs.existsSync('pnpm-lock.yaml')) return 'pnpm';
    if (fs.existsSync('yarn.lock')) return 'yarn';
  } catch {
    // ignore
  }
  return 'npm';
}

async function installDependencies(packages: string[]): Promise<boolean> {
  const pm = detectPackageManager();
  const installCmd =
    pm === 'pnpm'
      ? `pnpm add ${packages.join(' ')}`
      : pm === 'yarn'
        ? `yarn add ${packages.join(' ')}`
        : `npm install ${packages.join(' ')}`;

  console.log(chalk.blue(`\nInstalling with ${pm}...`));
  try {
    execSync(installCmd, { stdio: 'inherit' });
    console.log(chalk.green('Dependencies installed successfully!\n'));
    return true;
  } catch {
    console.log(chalk.red('Failed to install dependencies. Aborting.'));
    return false;
  }
}

export default async function add(component: string) {
  const templatePath = path.join(__dirname, 'templates', `${component}.tsx`);

  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`Component "${component}" not found`));
    return;
  }

  // ── Dependency check ────────────────────────────────────────────────────────
  const deps = componentDependencies[component];
  if (deps && deps.length > 0) {
    console.log(
      chalk.yellow(
        `\nThe "${component}" component requires additional packages:\n`,
      ),
    );
    deps.forEach((pkg) => console.log(chalk.cyan(`  • ${pkg}`)));
    console.log('');

    const { install } = await prompts({
      type: 'confirm',
      name: 'install',
      message: 'Install these dependencies now?',
      initial: true,
    });

    if (!install) {
      console.log(chalk.yellow('Aborted.'));
      return;
    }

    const success = await installDependencies(deps);
    if (!success) return;
  }

  // ── Overwrite check ─────────────────────────────────────────────────────────
  const targetDir = 'src/components/ui';
  const targetPath = path.join(targetDir, `${component}.tsx`);

  fs.ensureDirSync(targetDir);

  if (fs.existsSync(targetPath)) {
    const response = await prompts({
      type: 'confirm',
      name: 'overwrite',
      message: `Component "${component}" already exists. Do you want to overwrite it?`,
      initial: false,
    });

    if (!response.overwrite) {
      console.log(chalk.yellow('Aborted.'));
      return;
    }
  }

  fs.copyFileSync(templatePath, targetPath);

  const capitalizedName =
    component.charAt(0).toUpperCase() + component.slice(1);
  console.log(chalk.green(`${capitalizedName} component added!`));
}
