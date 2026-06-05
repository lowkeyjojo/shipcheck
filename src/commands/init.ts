import path from 'path';
import { exists } from '../utils/fs';
import { readConfig, writeConfig } from '../utils/config';
import { PresetName } from '../presets';
import { logger } from '../utils/logger';

export async function commandInit(targetDir: string, preset: PresetName = 'generic'): Promise<void> {
  const configFile = path.join(targetDir, '.shipcheck', 'config.json');
  const existing = await readConfig(targetDir);
  const alreadyExists = await exists(configFile);

  await writeConfig(targetDir, {
    version: '0.1.0',
    createdAt: new Date().toISOString(),
    targetDir,
    preset,
  });

  if (alreadyExists && existing) {
    if (existing.preset === preset) {
      logger.success(`ShipCheck already set to preset: ${preset} (config refreshed)`);
    } else {
      logger.success(`Preset changed: ${existing.preset} → ${preset}`);
    }
  } else {
    logger.success(`ShipCheck initialised! (preset: ${preset})`);
  }

  logger.blank();
  logger.info(`Config saved to: ${path.relative(process.cwd(), configFile)}`);
  logger.blank();
  console.log('  Next steps:');
  console.log('');
  console.log('    shipcheck scan    — scan this project for release readiness');
  console.log('    shipcheck report  — generate a report in .shipcheck/report.md');
  console.log('    shipcheck codex   — generate AI-friendly tasks in .codex/');
  logger.blank();
}
