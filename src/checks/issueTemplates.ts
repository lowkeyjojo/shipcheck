import path from 'path';
import { CheckResult } from './readme';
import { exists, listDir, resolvePath } from '../utils/fs';

export async function checkIssueTemplates(targetDir: string): Promise<CheckResult> {
  const templateDir = resolvePath(targetDir, '.github', 'ISSUE_TEMPLATE');
  const dirExists = await exists(templateDir);

  if (!dirExists) {
    return {
      name: 'GitHub Issue Templates',
      passed: false,
      detail: '.github/ISSUE_TEMPLATE/ directory not found',
      fix: 'Create .github/ISSUE_TEMPLATE/ and add at least one template file (e.g. bug_report.md, feature_request.md).',
    };
  }

  const files = await listDir(templateDir);
  const TEMPLATE_EXTS = new Set(['.md', '.yml', '.yaml']);
  const templates = files.filter((f) => TEMPLATE_EXTS.has(path.extname(f).toLowerCase()));

  if (templates.length === 0) {
    return {
      name: 'GitHub Issue Templates',
      passed: false,
      detail: '.github/ISSUE_TEMPLATE/ exists but contains no template files',
      fix: 'Add at least one .md, .yml, or .yaml template file inside .github/ISSUE_TEMPLATE/.',
    };
  }

  return {
    name: 'GitHub Issue Templates',
    passed: true,
    detail: `${templates.length} template(s) found`,
  };
}
