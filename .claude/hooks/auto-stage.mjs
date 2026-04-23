#!/usr/bin/env node
// PostToolUse hook (Edit|Write): 편집된 파일을 git에 스테이지
// 실패 시 stderr 출력 + exit 2 (원칙 1: 조용한 대체 금지)

import { execSync } from 'node:child_process';
import path from 'node:path';

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', c => (raw += c));
process.stdin.on('end', () => {
  try {
    const j = JSON.parse(raw || '{}');
    const p = j.tool_input?.file_path;
    if (!p) {
      // file_path 없는 Edit/Write는 없음. 조용히 종료.
      process.exit(0);
    }
    const dir = path.dirname(p);

    // git 저장소 안인지 확인
    try {
      execSync(`git -C ${JSON.stringify(dir)} rev-parse --git-dir`, { stdio: 'ignore' });
    } catch {
      console.error(`[auto-stage] skip (git 저장소 밖): ${p}`);
      process.exit(0);
    }

    // 스테이지
    execSync(`git -C ${JSON.stringify(dir)} add ${JSON.stringify(p)}`, { stdio: 'inherit' });
    console.error(`[auto-stage] ${path.basename(p)}`);
  } catch (e) {
    console.error(`[auto-stage ERROR] ${e.message}`);
    process.exit(2);
  }
});
