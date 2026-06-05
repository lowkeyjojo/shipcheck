import path from 'path';
import { readJson } from '../utils/fs';
import { generateChecklist } from '../generators/checklist';
import { generateReport } from '../generators/report';
import { logger } from '../utils/logger';
import { commandScan, ScanData } from './scan';

export async function commandReport(targetDir: string): Promise<void> {
  const cachePath = path.join(targetDir, '.shipcheck', 'last-scan.json');
  const cached = await readJson<ScanData>(cachePath);

  if (!cached) {
    logger.info('No previous scan found — running scan first...');
  } else {
    logger.info('Running fresh scan before generating report...');
  }
  logger.blank();

  const scanData = await commandScan(targetDir);

  const checklistPath = await generateChecklist(
    targetDir,
    scanData.results,
    scanData.preset,
    scanData.suggestions
  );
  const reportPath = await generateReport(
    targetDir,
    scanData.results,
    scanData.preset,
    scanData.suggestions
  );

  const passed = scanData.results.filter((r) => r.passed).length;
  const total = scanData.results.length;

  logger.blank();
  logger.success(`Report generated (${passed}/${total} checks passed)`);
  logger.blank();
  logger.info(`Checklist : ${path.relative(process.cwd(), checklistPath)}`);
  logger.info(`Report    : ${path.relative(process.cwd(), reportPath)}`);
  logger.blank();

  if (passed < total) {
    logger.info('Run `shipcheck codex` to generate AI-friendly fix tasks.');
  }

  logger.blank();
}
