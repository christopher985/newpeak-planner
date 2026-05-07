# Weakness Log

이 파일은 결함, 보류, 재검토 대상을 숨기지 않고 기록한다.

## 상태값

| 상태 | 의미 |
| --- | --- |
| LOGGED | 기록됨, 아직 조치 없음 |
| PLANNED | 개선 범위 확정 |
| RESOLVED | 해결 및 검증 완료 |
| FAILED | 시도 실패, 대안 필요 |
| DEFERRED | 의도적으로 보류 |
| REVIEW-LATER | 나중에 재검토 |
| ARCHIVED | 현 구조에 영향 없음 |

## 이슈 테이블

| ID | 발견일 | 카테고리 | 제목 | 영향도 | 현재 처리 | 상태 |
| --- | --- | --- | --- | --- | --- | --- |
| W-20260507-001 | 2026-05-07 | 아키텍처 | `index.html`이 3,000줄을 넘는 거대 단일 실행 파일 | MEDIUM | 단일 파일 제약이 명시되어 있어 분리는 보류. 대신 `knowledge/index.json`에서 함수 영역을 색인화한다. | DEFERRED |
| W-20260507-002 | 2026-05-07 | 테스트 | 브라우저 E2E/Notion fixture 검증 부재 | MEDIUM | 최소 JS 문법 검증은 추가. 운영 데이터 검증은 배포 전 수동 확인 필요. | LOGGED |
| W-20260507-003 | 2026-05-07 | 운영 | Codex는 Claude Code 자동 stage/commit hook을 실행하지 않음 | LOW | `AGENTS.md`에 명시. Codex에서는 커밋/푸시를 명시 요청 시에만 수행한다. | LOGGED |
