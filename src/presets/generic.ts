import { Preset } from './index';

export const genericPreset: Preset = {
  name: 'generic',
  displayName: 'Generic',
  description: 'General release-readiness reminders for any project.',
  suggestions: [
    {
      label: 'Review README',
      detail: 'Confirm your README has clear install and usage instructions a new user can follow.',
    },
    {
      label: 'Confirm license is appropriate',
      detail: 'Check that the chosen license matches how you want others to use the project.',
    },
    {
      label: 'Review CHANGELOG before release',
      detail: 'Make sure all notable changes for this version are documented.',
    },
    {
      label: 'Confirm CI passes',
      detail: 'Ensure all automated checks (lint, build, tests) are green before shipping.',
    },
    {
      label: 'Check for secrets or local-only config',
      detail: 'Search for API keys, passwords, or hardcoded paths that should not be public.',
    },
    {
      label: 'Confirm release version and tag',
      detail: 'Bump the version number, commit, and create a git tag before publishing.',
    },
  ],
};
