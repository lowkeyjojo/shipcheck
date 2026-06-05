import { Preset } from './index';

export const robloxPreset: Preset = {
  name: 'roblox',
  displayName: 'Roblox',
  description: 'Release-readiness suggestions for Roblox game and experience releases.',
  suggestions: [
    {
      label: 'Mobile UI QA',
      detail: 'Test layouts on phone and tablet screen sizes. Confirm touch buttons are large enough, UI respects safe areas, and nothing overflows.',
    },
    {
      label: 'DataStore safety',
      detail: 'Confirm DataStore reads and writes have error handling. Verify data migrations are safe, defaults are set for new keys, and rollback behavior is understood.',
    },
    {
      label: 'Gamepass and developer product checks',
      detail: 'Verify all gamepass and developer product IDs are correct for production. Confirm purchase flows, receipt handlers, and transaction logging work as expected.',
    },
    {
      label: 'Leaderboard and stat testing',
      detail: 'Confirm leaderboard values update correctly during play and on rejoin. Check that values cannot be easily exploited or spoofed.',
    },
    {
      label: 'Remove or disable admin and test-only scripts',
      detail: 'Disable or gate debug commands, admin panels, test item grants, and free currency cheats before releasing to the public.',
    },
    {
      label: 'Server performance review',
      detail: 'Check server script memory usage and replication costs. Avoid unbounded loops, excessive RemoteEvent calls, or scripts that run every heartbeat unnecessarily.',
    },
    {
      label: 'Player data save and load testing',
      detail: 'Verify player data persists correctly across sessions, server shutdowns, and game updates. Test with a fresh account and an existing account.',
    },
    {
      label: 'Remote security and input validation',
      detail: 'Ensure all RemoteFunction and RemoteEvent handlers validate input on the server. Never trust the client for gameplay-critical values.',
    },
  ],
};
