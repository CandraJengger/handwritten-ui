#!/usr/bin/env node

import { Command } from 'commander';
import init from './commands/init';
import add from './commands/add';

const program = new Command();

program.name('handwritten-ui').description('CLI for handwritten-ui library');

program
  .command('init [template]')
  .description('Initialize handwritten ui')
  .action((template) => init({ template }));

program.command('add <component>').description('Add a component').action(add);

program.parse();
