/**
 * O @angular/build tenta reescrever o overlay do Vite com um replace que não
 * casa no client.mjs do Vite 7 — o ng serve quebra com
 * "Failed to update Vite client error overlay text".
 */
const fs = require('fs');
const path = require('path');

const target = path.join(
  __dirname,
  '..',
  'node_modules',
  '@angular',
  'build',
  'src',
  'tools',
  'vite',
  'plugins',
  'angular-memory-plugin.js'
);

if (!fs.existsSync(target)) {
  process.exit(0);
}

const marker = 'const overlayInline =';
let source = fs.readFileSync(target, 'utf8');
if (source.includes(marker)) {
  process.exit(0);
}

const patchedFn = `async function loadViteClientCode(file, disableViteTransport = false) {
    const originalContents = await (0, promises_1.readFile)(file, 'utf-8');
    const overlayConcat = '"You can also disable this overlay by setting ", ' +
        'h("code", { part: "config-option-name" }, "server.hmr.overlay"), ' +
        '" to ", ' +
        'h("code", { part: "config-option-value" }, "false"), ' +
        '" in ", ' +
        'h("code", { part: "config-file-name" }, hmrConfigName), ' +
        '"."';
    const overlayInline = '"You can also disable this overlay by setting ", h("code", { part: "config-option-name" }, "server.hmr.overlay"), " to ", h("code", { part: "config-option-value" }, "false"), " in ", h("code", { part: "config-file-name" }, hmrConfigName), "."';
    let updatedContents = originalContents.replace(overlayConcat, '').replace(overlayInline, '""');
    if (disableViteTransport) {
        const previousUpdatedContents = updatedContents;
        updatedContents = updatedContents.replace('transport.connect(createHMRHandler(handleMessage));', '');
        if (previousUpdatedContents !== updatedContents) {
            updatedContents = updatedContents.replace('console.debug("[vite] connecting...")', '');
        }
    }
    return updatedContents;
}`;

source = source.replace(/async function loadViteClientCode\([\s\S]*?\n\}/, patchedFn);
if (!source.includes(marker)) {
  console.warn('patch-angular-vite-overlay: função não encontrada, nada alterado.');
  process.exit(0);
}
fs.writeFileSync(target, source);
console.log('patch-angular-vite-overlay: overlay do Vite ajustado.');
