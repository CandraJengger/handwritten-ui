import chalk from 'chalk';
import { config } from '@/config';
import { Template } from '@/enums';

interface Options {
  template?: Template;
}

export default async function init({ template = Template.VITE }: Options) {
  console.log(chalk.blue('Initializing sketchy ui...'));

  const cfg = config[template];

  cfg();

  console.log(chalk.green('Sketchy UI initialized successfully!'));
}
