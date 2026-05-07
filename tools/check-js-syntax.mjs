import fs from 'node:fs';

const checks = [];

function checkInlineScripts(path) {
  const html = fs.readFileSync(path, 'utf8');
  const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(match => match[1]);
  if (!scripts.length) throw new Error(`${path}: no inline <script> blocks found`);
  scripts.forEach((script, index) => {
    new Function(script);
    checks.push(`${path} inline script ${index + 1}`);
  });
}

function checkCommonJs(path) {
  const code = fs.readFileSync(path, 'utf8');
  new Function('require', 'exports', 'module', code);
  checks.push(path);
}

checkInlineScripts('index.html');
checkCommonJs('netlify/functions/proxy.js');

console.log(`PASS ${checks.length} syntax checks`);
checks.forEach(item => console.log(`- ${item}`));
