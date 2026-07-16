#!/usr/bin/env node
require('dotenv').config();
const { runRadar } = require('../blog/radar');

async function main() {
  const maxArg = process.argv.find(a => a.startsWith('--max='));
  const maxNew = maxArg ? Number(maxArg.split('=')[1]) : 3;

  console.log('🛰️  Rodando radar do blog Punk Code...');
  const result = await runRadar({ maxNew });
  console.log(JSON.stringify(result, null, 2));
  console.log(`✅ Criados: ${result.createdCount} | Pulados: ${result.skippedCount} | Erros: ${result.errors.length}`);
}

main().catch(error => {
  console.error('❌', error.message || error);
  process.exit(1);
});
