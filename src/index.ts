#!/usr/bin/env node

import { Command } from 'commander';
import init from './commands/init';
import add from './commands/add';

const program = new Command();

program.name('skeci-ui').description('CLI for skeci-ui library');

program
  .command('init')
  .description('Initialize skeci ui')
  .action((template) => init({ template }));

program.command('add <component>').description('Add a component').action(add);

program.parse();
