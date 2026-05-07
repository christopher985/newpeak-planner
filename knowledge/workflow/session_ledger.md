# Session Ledger

이 파일은 세션별 작업 이력을 append-only로 남긴다. `AGENTS.md`에는 현재 운영 규칙만 유지하고, 과거 이력은 여기에 둔다.

## 2026-05-07 - Claude Code to Codex migration baseline

- 목적: Claude Code로 작업하던 프로젝트를 Codex가 이해할 수 있게 마이그레이션한다.
- 변경: `AGENTS.md`를 추가하고 `CLAUDE.md`와 `.claude`는 호환용으로 보존했다.
- 검증: 파일 생성 확인, Git 프로젝트 루트 확인.
- 남은 위험: Claude hook 자동 커밋은 Codex에서 자동 실행되지 않는다.
- 관련 파일: `AGENTS.md`, `CLAUDE.md`, `.claude/`
- 다음 작업: Codex에서 사용할 단일 진실원과 아키텍처 색인을 구축한다.

## 2026-05-07 - Completed-week date semantics fix

- 목적: 미래 날짜를 선택한 상태에서 완료 버튼을 눌러도 완료 주간 귀속은 실제 완료시점 기준이 되도록 한다.
- 변경: `완료시점` 기반 주간 필터, KST 날짜 변환, 이월 카드 완료 시 실제 오늘 날짜 저장을 적용했다.
- 검증: JS 문법 검사 PASS, 2026-05-07 완료 카드가 2026-05-03~2026-05-09 주에만 보이는 로직 테스트 PASS.
- 남은 위험: 실제 Notion 운영 데이터 기반 브라우저 검증은 아직 수행하지 않았다.
- 관련 파일: `index.html`
- 다음 작업: 배포 전 운영 화면에서 동일 시나리오를 수동 확인한다.

## 2026-05-07 - IDA+SDA compatible architecture rebuild

- 목적: 첨부된 IDA/SDA 패러다임 중 프로젝트 제약과 정합하는 요소만 채택해 아키텍처를 재구축한다.
- 변경: `knowledge/index.json`, `knowledge/architecture/main.md`, `knowledge/workflow/weakness_log.md`, `knowledge/workflow/domain_glossary.md`, `tools/check-js-syntax.mjs`를 추가하고 `AGENTS.md`에 운영 지도를 연결했다.
- 검증: `knowledge/index.json` JSON 파싱 PASS, `node tools/check-js-syntax.mjs` PASS, `git diff --check` 오류 없음.
- 남은 위험: 브라우저 E2E와 Notion 실제 API 검증은 별도 수행 필요.
- 관련 파일: `knowledge/`, `tools/check-js-syntax.mjs`, `AGENTS.md`
- 다음 작업: 최소 검증 도구를 실행하고 결과를 최종 보고한다.

## 2026-05-07 - Global DESIGN.md neutral UI pass

- 목적: 프로젝트 전용 `design.md`가 없으므로 `C:\Users\USER\.codex\design\DESIGN.md` fallback 기준으로 Todo 웹보드 UI를 정돈한다.
- 변경: 중립 배경, 흰 표면, `#2563EB` 상호작용 색, 8px radius, 절제된 border/shadow, focus-visible 상태, 캘린더 선택 상태를 적용했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, Edge headless 초기 설정 화면 시각 확인 PASS, fake 토큰 기반 보드 화면 시각 확인 PASS.
- 남은 위험: 실제 Notion 토큰과 운영 데이터로 카드가 많은 상태의 스크롤/밀도 검증은 아직 수행하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 사용자가 승인하면 커밋/푸시 전 운영 데이터로 주요 탭을 수동 확인한다.
