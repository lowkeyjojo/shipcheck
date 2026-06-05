import path from 'path';
import { readJson, writeJson } from './fs';
import { PresetName, VALID_PRESETS } from '../presets';

export interface ShipCheckConfig {
  version: string;
  createdAt: string;
  targetDir: string;
  preset: PresetName;
}

function configPath(targetDir: string): string {
  return path.join(targetDir, '.shipcheck', 'config.json');
}

export async function readConfig(targetDir: string): Promise<ShipCheckConfig | null> {
  const cfg = await readJson<ShipCheckConfig>(configPath(targetDir));
  if (!cfg || !(VALID_PRESETS as string[]).includes(cfg.preset)) {
    return null;
  }
  return cfg;
}

export async function writeConfig(targetDir: string, config: ShipCheckConfig): Promise<void> {
  await writeJson(configPath(targetDir), config);
}
