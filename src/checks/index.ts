import { checkReadme, CheckResult } from './readme';
import { checkLicense } from './license';
import { checkChangelog } from './changelog';
import { checkGitignore } from './gitignore';
import { checkPackageJson } from './packageJson';
import { checkIssueTemplates } from './issueTemplates';
import { checkGithubActions } from './githubActions';

export type { CheckResult };

export async function runAllChecks(targetDir: string): Promise<CheckResult[]> {
  const results = await Promise.all([
    checkReadme(targetDir),
    checkLicense(targetDir),
    checkChangelog(targetDir),
    checkGitignore(targetDir),
    checkPackageJson(targetDir),
    checkIssueTemplates(targetDir),
    checkGithubActions(targetDir),
  ]);
  return results;
}
