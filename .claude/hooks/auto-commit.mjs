#!/usr/bin/env node
// Stop hook: 스테이지된 변경이 있으면 자동 커밋
// 푸시는 절대 안 함 — 사용자 요청 시에만 수동 push
// 실패 시 stderr 출력 + exit 2 (원칙 1: 조용한 대체 금지)

import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

try {
  // 스크립트 위치 기준 저장소 루트 (.claude/hooks/ → ../..)
  const __filename = fileURLToPath(import.meta.url);
  const cwd = path.resolve(path.dirname(__filename), '../..');

  // git 저장소 확인
  try {
    execSync('git rev-parse --git-dir', { cwd, stdio: 'ignore' });
  } catch {
    // 저장소 밖 → no-op
    process.exit(0);
  }

  // 스테이지된 파일 목록
  const staged = execSync('git diff --cached --name-only', { cwd, encoding: 'utf8' }).trim();
  if (!staged) {
    // 스테이지 없음 → no-op
    process.exit(0);
  }

  const files = staged.split('\n').filter(Boolean);
  const basenames = files.map(f => path.basename(f));
  const shown = basenames.slice(0, 3).join(', ');
  const more = files.length > 3 ? ` (+${files.length - 3} more)` : '';
  const msg = `auto: ${shown}${more}`;

  execSync(`git commit -m ${JSON.stringify(msg)}`, { cwd, stdio: 'inherit' });
  console.error(`[auto-commit] ${msg}`);
} catch (e) {
  console.error(`[auto-commit ERROR] ${e.message}`);
  process.exit(2);
}
