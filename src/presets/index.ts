import { genericPreset } from './generic';
import { nodePreset } from './node';
import { robloxPreset } from './roblox';

export type PresetName = 'generic' | 'node' | 'roblox';

export const VALID_PRESETS: PresetName[] = ['generic', 'node', 'roblox'];

export interface PresetSuggestion {
  label: string;
  detail: string;
}

export interface Preset {
  name: PresetName;
  displayName: string;
  description: string;
  suggestions: PresetSuggestion[];
}

export { genericPreset, nodePreset, robloxPreset };

export function getPreset(name: string): Preset {
  switch (name) {
    case 'node':    return nodePreset;
    case 'roblox':  return robloxPreset;
    default:        return genericPreset;
  }
}

export function resolvePreset(raw: string | undefined): PresetName {
  if (raw && (VALID_PRESETS as string[]).includes(raw)) {
    return raw as PresetName;
  }
  return 'generic';
}
