import { CheckResult } from './readme';
import { exists, resolvePath } from '../utils/fs';

const CANDIDATES = ['CHANGELOG.md', 'CHANGELOG', 'CHANGELOG.txt', 'CHANGES.md', 'CHANGES', 'HISTORY.md'];

export async function checkChangelog(targetDir: string): Promise<CheckResult> {
  for (const candidate of CANDIDATES) {
    const filePath = resolvePath(targetDir, candidate);
    if (await exists(filePath)) {
      return {
        name: 'CHANGELOG',
        passed: true,
        detail: `${candidate} found`,
      };
    }
  }

  return {
    name: 'CHANGELOG',
    passed: false,
    detail: 'No CHANGELOG file found',
    fix: 'Create a CHANGELOG.md documenting notable changes for each release. See keepachangelog.com for a good format.',
  };
}
