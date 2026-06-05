#!/usr/bin/env node
import { Command } from 'commander';
import path from 'path';
import { logger } from './utils/logger';
import { commandInit } from './commands/init';
import { commandScan } from './commands/scan';
import { commandReport } from './commands/report';
import { commandCodex } from './commands/codex';
import pkg from '../package.json';

const program = new Command();

program
  .name('shipcheck')
  .description('⛵ Release-readiness scanner for your projects')
  .version(pkg.version);

program
  .command('init')
  .description('Initialise ShipCheck in the current directory')
  .option('-d, --dir <path>', 'Target directory to initialise', process.cwd())
  .action((opts: { dir: string }) => {
    const targetDir = path.resolve(opts.dir);
    logger.banner(pkg.version);
    commandInit(targetDir).catch((err: Error) => {
      logger.error(err.message);
      process.exit(1);
    });
  });

program
  .command('scan')
  .description('Scan the current directory for release readiness')
  .option('-d, --dir <path>', 'Target directory to scan', process.cwd())
  .action((opts: { dir: string }) => {
    const targetDir = path.resolve(opts.dir);
    logger.banner(pkg.version);
    commandScan(targetDir).catch((err: Error) => {
      logger.error(err.message);
      process.exit(1);
    });
  });

program
  .command('report')
  .description('Generate RELEASE_CHECKLIST.md and .shipcheck/report.md')
  .option('-d, --dir <path>', 'Target directory', process.cwd())
  .action((opts: { dir: string }) => {
    const targetDir = path.resolve(opts.dir);
    logger.banner(pkg.version);
    commandReport(targetDir).catch((err: Error) => {
      logger.error(err.message);
      process.exit(1);
    });
  });

program
  .command('codex')
  .description('Generate .codex/tasks/release-readiness.md for AI/Codex agents')
  .option('-d, --dir <path>', 'Target directory', process.cwd())
  .action((opts: { dir: string }) => {
    const targetDir = path.resolve(opts.dir);
    logger.banner(pkg.version);
    commandCodex(targetDir).catch((err: Error) => {
      logger.error(err.message);
      process.exit(1);
    });
  });

program.parse(process.argv);
