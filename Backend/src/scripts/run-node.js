#!/usr/bin/env node
/**
 * Wrapper: no Windows com Node >= 22 usa --use-system-ca (certificados locais).
 * No Linux/CI (Node 20) roda sem a flag, que não existe nessa versão.
 */
const { spawnSync } = require('child_process');

const target = process.argv[2];
const extraArgs = process.argv.slice(3);

if (!target) {
  console.error('Uso: node src/scripts/run-node.js <arquivo> [...args]');
  process.exit(1);
}

const major = Number(String(process.versions.node).split('.')[0]);
const nodeArgs = [];

if (process.platform === 'win32' && major >= 22) {
  nodeArgs.push('--use-system-ca');
}

const result = spawnSync(process.execPath, [...nodeArgs, target, ...extraArgs], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status == null ? 1 : result.status);
