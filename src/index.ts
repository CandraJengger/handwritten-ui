#!/usr/bin/env node

import { Command } from 'commander';
import init from './commands/init';
import add from './commands/add';

const program = new Command();

program.name('sketchy-ui').description('CLI for sketchy-ui library');

program
  .command('init [template]')
  .description('Initialize sketchy ui')
  .action((template) => init({ template }));

program.command('add <component>').description('Add a component').action(add);

program.parse();
