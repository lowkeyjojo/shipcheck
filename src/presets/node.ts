import { Preset } from './index';

export const nodePreset: Preset = {
  name: 'node',
  displayName: 'Node.js',
  description: 'Release-readiness suggestions for Node.js / npm packages and CLIs.',
  suggestions: [
    {
      label: 'Confirm package.json scripts',
      detail: 'Check that useful scripts like build, test, and lint are defined and working.',
    },
    {
      label: 'Run npm pack --dry-run',
      detail: 'Preview what will be published. Ensure only intended files are included and nothing sensitive leaks.',
    },
    {
      label: 'Confirm README has install instructions',
      detail: 'Include npm install, npx usage, or npm link steps so users can get started quickly.',
    },
    {
      label: 'Confirm CI runs build and lint',
      detail: 'Your CI workflow should verify the project compiles and passes lint checks on every push.',
    },
    {
      label: 'Confirm package.json metadata',
      detail: 'Verify name, version, description, license, and repository fields are accurate and complete.',
    },
    {
      label: 'Check dist/ is included if using TypeScript',
      detail: 'Ensure compiled output is included in the package via the files array or the absence of .npmignore exclusions.',
    },
    {
      label: 'Confirm package stays lean',
      detail: 'Use a files array in package.json or .npmignore to exclude src/, tests/, and config files from the published tarball.',
    },
    {
      label: 'Bump version before publishing',
      detail: 'Run npm version patch/minor/major or manually update the version in package.json and commit.',
    },
  ],
};
