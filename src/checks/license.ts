import { CheckResult } from './readme';
import { exists, resolvePath } from '../utils/fs';

const CANDIDATES = ['LICENSE', 'LICENSE.md', 'LICENSE.txt', 'LICENCE', 'LICENCE.md'];

export async function checkLicense(targetDir: string): Promise<CheckResult> {
  for (const candidate of CANDIDATES) {
    const filePath = resolvePath(targetDir, candidate);
    if (await exists(filePath)) {
      return {
        name: 'LICENSE',
        passed: true,
        detail: `${candidate} found`,
      };
    }
  }

  return {
    name: 'LICENSE',
    passed: false,
    detail: 'No LICENSE file found',
    fix: 'Add a LICENSE file. For open-source projects the MIT license is a common choice.',
  };
}
