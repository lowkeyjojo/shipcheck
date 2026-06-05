import { exists, fileSize, resolvePath } from '../utils/fs';

export interface CheckResult {
  name: string;
  passed: boolean;
  detail: string;
  fix?: string;
}

export async function checkReadme(targetDir: string): Promise<CheckResult> {
  const filePath = resolvePath(targetDir, 'README.md');
  const found = await exists(filePath);

  if (!found) {
    return {
      name: 'README.md',
      passed: false,
      detail: 'README.md not found',
      fix: 'Create a README.md describing what your project does, how to install it, and how to use it.',
    };
  }

  const size = await fileSize(filePath);
  if (size < 50) {
    return {
      name: 'README.md',
      passed: false,
      detail: 'README.md exists but appears to be nearly empty',
      fix: 'Add a project description, installation steps, and usage examples to README.md.',
    };
  }

  return {
    name: 'README.md',
    passed: true,
    detail: 'README.md found',
  };
}
