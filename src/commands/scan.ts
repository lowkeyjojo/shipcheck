import path from 'path';
import ora from 'ora';
import { runAllChecks, CheckResult } from '../checks';
import { writeJson } from '../utils/fs';
import { readConfig } from '../utils/config';
import { getPreset, PresetSuggestion } from '../presets';
import { logger } from '../utils/logger';

export interface ScanData {
  scannedAt: string;
  targetDir: string;
  results: CheckResult[];
  passed: number;
  total: number;
  preset: string;
  suggestions: PresetSuggestion[];
}

export async function commandScan(targetDir: string): Promise<ScanData> {
  const config = await readConfig(targetDir);
  const preset = getPreset(config?.preset ?? 'generic');

  const spinner = ora({ text: `Scanning ${targetDir} ...`, color: 'cyan' }).start();

  let results: CheckResult[];
  try {
    results = await runAllChecks(targetDir);
    spinner.stop();
  } catch (err) {
    spinner.fail('Scan failed');
    throw err;
  }

  logger.blank();
  logger.section(`Scanning ${targetDir}  [preset: ${preset.name}]`);
  logger.blank();

  for (const r of results) {
    if (r.passed) {
      logger.pass(r.name, r.detail);
    } else {
      logger.fail(r.name, r.detail);
    }
  }

  const passed = results.filter((r) => r.passed).length;
  const total = results.length;

  logger.summary(passed, total);

  if (preset.suggestions.length > 0) {
    logger.section(`${preset.displayName} Preset Suggestions`);
    logger.blank();
    for (const s of preset.suggestions) {
      logger.info(`${s.label}`);
    }
    logger.blank();
  }

  if (passed < total) {
    logger.info('Run `shipcheck report` to generate a full report with fix suggestions.');
  } else {
    logger.info('All checks passed! Run `shipcheck report` to generate release docs.');
  }

  logger.blank();

  const scanData: ScanData = {
    scannedAt: new Date().toISOString(),
    targetDir,
    results,
    passed,
    total,
    preset: preset.name,
    suggestions: preset.suggestions,
  };

  const cachePath = path.join(targetDir, '.shipcheck', 'last-scan.json');
  await writeJson(cachePath, scanData);

  return scanData;
}
