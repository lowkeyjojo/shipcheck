import { CheckResult } from './readme';
import { exists, resolvePath } from '../utils/fs';

export async function checkGitignore(targetDir: string): Promise<CheckResult> {
  const filePath = resolvePath(targetDir, '.gitignore');
  const found = await exists(filePath);

  if (!found) {
    return {
      name: '.gitignore',
      passed: false,
      detail: '.gitignore not found',
      fix: 'Create a .gitignore file to prevent node_modules, .env files, and build output from being committed.',
    };
  }

  return {
    name: '.gitignore',
    passed: true,
    detail: '.gitignore found',
  };
}
