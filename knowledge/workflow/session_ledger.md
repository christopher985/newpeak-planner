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

## 2026-05-08 - Pending Todo preservation on auth/network failure

- 목적: 웹보드를 오래 켜둔 뒤 인증/연결이 끊긴 상태에서 만든 Todo 카드가 새로고침 후 사라지지 않게 한다.
- 변경: Google Calendar 토큰은 자동 로그인 팝업 대신 silent refresh를 주기적으로 시도하고, Todo 생성 실패 시 카드를 `localStorage` 대기열에 보존한 뒤 연결 복구 시 Notion에 자동 동기화하도록 했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, 실패 API mock에서 pending queue 저장 PASS, 성공 API mock에서 pending queue 비움 PASS.
- 남은 위험: Google 계정 세션 자체가 만료된 경우 브라우저 정책상 완전한 무로그인 갱신은 불가능하다. 이 경우 Google Calendar 배지만 일시 중지되고 Todo 임시 저장은 유지된다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 실제 운영 토큰으로 장시간 방치 후 카드 생성/재연결 시나리오를 수동 확인한다.

## 2026-05-18 - Incomplete card manual reorder fix

- 목적: 미완료 섹션에서 카드를 드래그해도 원하는 위치가 아니라 최상단으로 이동하는 문제를 수정한다.
- 변경: 드래그 시 현재 화면 순서를 기준으로 수동 정렬 순서를 재계산하고, 놓은 위치가 대상 카드의 위/아래인지 반영하도록 했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, 수동 순서 재계산 로직 테스트 PASS, `git diff --check` 패치 오류 없음.
- 남은 위험: 실제 운영 데이터가 로드된 브라우저에서의 수동 드래그 확인은 아직 수행하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 운영 화면에서 미완료 카드 3개 이상으로 위/중간/아래 이동을 수동 확인한다.

## 2026-05-18 - Carried incomplete card reorder correction

- 목적: 이월 카드가 섞인 미완료 섹션에서 드래그 위치 변경이 적용되지 않는 문제를 수정한다.
- 변경: 순서 계산 기준을 당일 카드만이 아니라 화면에 실제 표시되는 미완료 카드 전체(이월 + 당일)로 통일했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, 이월 카드와 당일 카드가 섞인 브라우저 드래그 smoke PASS.
- 남은 위험: 실제 운영 Notion 데이터로 장시간 사용 중인 브라우저 상태까지는 확인하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 운영 화면에서 이월 카드와 당일 카드를 섞어 위/중간/아래 이동을 확인한다.

## 2026-05-19 - Promotion channel color fallback fix

- 목적: Google Calendar에서 토마토로 보이는 프로모션 이벤트가 Todo 웹보드에서 회색으로 표시되는 문제를 수정한다.
- 변경: 이벤트 개별 `colorId`가 없을 때 Google CalendarList의 기본 배경색을 fallback으로 사용해 자사몰/쿠팡/스마트스토어 채널을 판정하도록 했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, 토마토 `colorId`와 토마토 캘린더 배경색 fallback smoke PASS.
- 남은 위험: 실제 2026-06-28 운영 Google Calendar 이벤트 응답 원문은 OAuth 토큰을 노출하지 않고는 직접 확인하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 배포 후 2026-06-28 올라잇클래스 프로모션 배지가 자사몰 색으로 표시되는지 운영 화면에서 확인한다.

## 2026-05-19 - Promotion channel hue fallback correction

- 목적: 프로모션 캘린더 색상이 여전히 회색으로 표시되는 원인을 좁히고 색상 판정을 보강한다.
- 변경: fallback 배경색을 정확한 hex 문자열로만 비교하지 않고, 토마토/연분홍/귤/바나나/세이지/바질 계열 hue 범위로 채널을 판정하도록 했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, 토마토 계열 변형(`#d50000`, `#dc2127`, `#ea4335`) 자사몰 판정 smoke PASS.
- 남은 위험: 실제 2026-06-28 운영 Google Calendar 이벤트 응답 원문은 OAuth 토큰을 노출하지 않고는 직접 확인하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 배포 후 2026-06-28 올라잇클래스 프로모션 배지가 회색이 아닌 자사몰 색으로 표시되는지 확인한다.

## 2026-05-19 - Codex local auto-commit policy

- 목적: 사용자가 수정사항을 요청하고 Codex가 파일 변경을 반영한 경우 로컬 커밋까지 자동 생성하도록 프로젝트 운영 규칙을 바꾼다.
- 변경: `AGENTS.md`의 Git 및 배포 정책을 수정해 자동 커밋 조건, 예외, stage 범위, push 금지 원칙을 명시했다.
- 검증: `knowledge/index.json` JSON 파싱 PASS, Git diff 검사 PASS.
- 남은 위험: Codex 앱 자체 훅이 아니라 프로젝트 지침 기반 운영 규칙이므로, 향후 세션의 에이전트가 이 지침을 읽고 준수해야 한다.
- 관련 파일: `AGENTS.md`, `knowledge/index.json`
- 다음 작업: 이후 파일 변경 작업부터 자동 로컬 커밋 여부를 최종 보고에 포함한다.

## 2026-05-20 - Performance Drop section removal

- 목적: 퍼포먼스 팀 미완료 컬럼 아래의 Drop 섹션을 제거한다.
- 변경: `rPerformanceLayout()`에서 Drop 섹션 렌더링과 Drop 전용 필터를 제거하고, `currentIncIds()`가 미완료 전체를 기준으로 수동 정렬을 계산하도록 조정했다.
- 검증: `node tools/check-js-syntax.mjs` PASS, `git diff --check` PASS, headless Edge 퍼포먼스 화면 smoke PASS(`미완료` 표시, `Drop`/드래그 안내 미표시).
- 남은 위험: 실제 운영 Notion 데이터가 많은 상태에서의 장시간 사용 검증은 아직 수행하지 않았다.
- 관련 파일: `index.html`, `knowledge/index.json`
- 다음 작업: 배포 후 운영 화면에서 퍼포먼스 미완료 컬럼만 보이는지 확인한다.
