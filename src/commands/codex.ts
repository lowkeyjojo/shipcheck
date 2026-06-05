import path from 'path';
import { readJson } from '../utils/fs';
import { generateCodex } from '../generators/codex';
import { logger } from '../utils/logger';
import { commandScan, ScanData } from './scan';

export async function commandCodex(targetDir: string): Promise<void> {
  const cachePath = path.join(targetDir, '.shipcheck', 'last-scan.json');
  const cached = await readJson<ScanData>(cachePath);

  if (!cached) {
    logger.info('No previous scan found — running scan first...');
  } else {
    logger.info('Running fresh scan before generating tasks...');
  }
  logger.blank();

  const scanData = await commandScan(targetDir);

  const codexPath = await generateCodex(
    targetDir,
    scanData.results,
    scanData.preset,
    scanData.suggestions
  );

  const failed = scanData.results.filter((r) => !r.passed).length;

  logger.blank();
  if (failed === 0) {
    logger.success(`All checks passed — ${scanData.suggestions.length} preset reminder(s) included.`);
  } else {
    logger.success(`Codex task file generated (${failed} required task${failed !== 1 ? 's' : ''}, ${scanData.suggestions.length} preset reminder${scanData.suggestions.length !== 1 ? 's' : ''})`);
  }
  logger.blank();
  logger.info(`Tasks: ${path.relative(process.cwd(), codexPath)}`);
  logger.blank();
}
