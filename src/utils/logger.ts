import chalk from 'chalk';

export const SHIP = '⛵';
export const CHECK = '✅';
export const CROSS = '❌';
export const WARN  = '⚠️ ';
export const INFO  = 'ℹ️ ';

export const logger = {
  banner(version: string) {
    console.log('');
    console.log(chalk.cyan.bold(`  ${SHIP}  ShipCheck v${version}`) + chalk.gray('  — Release Readiness Scanner'));
    console.log('');
  },

  section(text: string) {
    console.log(chalk.bold.white(`  ${text}`));
  },

  pass(label: string, detail?: string) {
    const suffix = detail ? chalk.gray(`  ${detail}`) : '';
    console.log(`  ${CHECK}  ${chalk.green(label)}${suffix}`);
  },

  fail(label: string, detail?: string) {
    const suffix = detail ? chalk.gray(`  ${detail}`) : '';
    console.log(`  ${CROSS}  ${chalk.red(label)}${suffix}`);
  },

  warn(label: string) {
    console.log(`  ${WARN} ${chalk.yellow(label)}`);
  },

  info(text: string) {
    console.log(`  ${INFO} ${chalk.cyan(text)}`);
  },

  divider() {
    console.log(chalk.gray('  ─────────────────────────────────'));
  },

  summary(passed: number, total: number) {
    console.log('');
    logger.divider();
    const color = passed === total ? chalk.green : passed >= total / 2 ? chalk.yellow : chalk.red;
    console.log(`  ${color.bold(`${passed} / ${total} checks passed`)}`);
    console.log('');
  },

  success(text: string) {
    console.log(`  ${CHECK}  ${chalk.green.bold(text)}`);
  },

  error(text: string) {
    console.log(`  ${CROSS}  ${chalk.red.bold(text)}`);
  },

  blank() {
    console.log('');
  },
};
