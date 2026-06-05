import path from 'path';
import { writeJson, exists } from '../utils/fs';
import { logger } from '../utils/logger';

interface ShipCheckConfig {
  version: string;
  createdAt: string;
  targetDir: string;
}

export async function commandInit(targetDir: string): Promise<void> {
  const configPath = path.join(targetDir, '.shipcheck', 'config.json');
  const alreadyExists = await exists(configPath);

  if (alreadyExists) {
    logger.warn('ShipCheck is already initialised in this directory.');
    logger.info(`Config: ${configPath}`);
    logger.blank();
    return;
  }

  const config: ShipCheckConfig = {
    version: '0.1.0',
    createdAt: new Date().toISOString(),
    targetDir,
  };

  await writeJson(configPath, config);

  logger.success('ShipCheck initialised!');
  logger.blank();
  logger.info(`Config saved to: ${path.relative(process.cwd(), configPath)}`);
  logger.blank();
  console.log('  Next steps:');
  console.log('');
  console.log('    shipcheck scan    — scan this project for release readiness');
  console.log('    shipcheck report  — generate a report in .shipcheck/report.md');
  console.log('    shipcheck codex   — generate AI-friendly tasks in .codex/');
  logger.blank();
}
