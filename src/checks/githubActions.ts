import path from 'path';
import { CheckResult } from './readme';
import { exists, listDir, resolvePath } from '../utils/fs';

export async function checkGithubActions(targetDir: string): Promise<CheckResult> {
  const workflowDir = resolvePath(targetDir, '.github', 'workflows');
  const dirExists = await exists(workflowDir);

  if (!dirExists) {
    return {
      name: 'GitHub Actions',
      passed: false,
      detail: '.github/workflows/ directory not found',
      fix: 'Create .github/workflows/ and add at least one workflow file (e.g. ci.yml) to automate testing or releases.',
    };
  }

  const files = await listDir(workflowDir);
  const workflows = files.filter(
    (f) => path.extname(f).toLowerCase() === '.yml' || path.extname(f).toLowerCase() === '.yaml'
  );

  if (workflows.length === 0) {
    return {
      name: 'GitHub Actions',
      passed: false,
      detail: '.github/workflows/ exists but contains no workflow files',
      fix: 'Add at least one .yml workflow file inside .github/workflows/.',
    };
  }

  return {
    name: 'GitHub Actions',
    passed: true,
    detail: `${workflows.length} workflow(s) found`,
  };
}
