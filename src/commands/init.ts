import chalk from 'chalk';
import prompts from 'prompts';
import { Template } from '@/enums';
import { config } from '@/config';

interface Options {
  template?: Template;
}

export default async function init({ template }: Options) {
  console.log(chalk.blue('Initializing skeci ui...'));

  const response = await prompts([
    {
      type: template ? null : 'select',
      name: 'template',
      message: 'Choose a template:',
      choices: [
        { title: 'Next.js', value: Template.NEXT },
        { title: 'Vite', value: Template.VITE },
      ] as const,
      initial: 0,
    },
  ]);

  const selectedTemplate = template || response.template;

  if (!selectedTemplate) {
    console.log(chalk.red('No template selected.'));
    return;
  }

  const cfg = config[selectedTemplate as keyof typeof config];
  cfg();

  console.log(chalk.green('Skeci UI initialized successfully!'));
}
