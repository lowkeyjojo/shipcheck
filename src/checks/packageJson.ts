import { CheckResult } from './readme';
import { exists, readJson, resolvePath } from '../utils/fs';

interface PackageJsonShape {
  name?: string;
  version?: string;
  description?: string;
}

export async function checkPackageJson(targetDir: string): Promise<CheckResult> {
  const filePath = resolvePath(targetDir, 'package.json');
  const found = await exists(filePath);

  if (!found) {
    return {
      name: 'package.json',
      passed: false,
      detail: 'package.json not found',
      fix: 'Run `npm init` to create a package.json for your project.',
    };
  }

  const pkg = await readJson<PackageJsonShape>(filePath);
  if (!pkg) {
    return {
      name: 'package.json',
      passed: false,
      detail: 'package.json exists but could not be parsed',
      fix: 'Check package.json for syntax errors (use a JSON validator or run `node -e "require(\'./package.json\')"`).',
    };
  }

  const missing: string[] = [];
  if (!pkg.name) missing.push('name');
  if (!pkg.version) missing.push('version');
  if (!pkg.description) missing.push('description');

  if (missing.length > 0) {
    return {
      name: 'package.json',
      passed: false,
      detail: `package.json is missing: ${missing.join(', ')}`,
      fix: `Add the following fields to package.json: ${missing.join(', ')}.`,
    };
  }

  return {
    name: 'package.json',
    passed: true,
    detail: `${pkg.name}@${pkg.version}`,
  };
}
