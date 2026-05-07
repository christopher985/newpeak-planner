# Newpeak Todo Project Instructions

이 파일의 범위는 `C:\Users\USER\Desktop\ToDo\newpeak` 전체입니다.

## 프로젝트 개요

- 서비스: Newpeak 팀이 사용하는 Notion 연동 Todo 웹보드
- 운영 URL: `https://nptodolist.netlify.app`
- GitHub: `https://github.com/christopher985/newpeak-planner`
- 배포: GitHub push 후 Netlify 자동 배포

## IDA+SDA 운영 지도

- 이 프로젝트는 IDA와 SDA 중 정합 요소만 채택합니다.
- 최상위 단일 진실원은 `knowledge/index.json`입니다.
- 사람이 읽는 구조 설명은 `knowledge/architecture/main.md`입니다.
- 작업 이력은 `knowledge/workflow/session_ledger.md`에 append-only로 기록합니다.
- 결함, 보류, 재검토 대상은 `knowledge/workflow/weakness_log.md`에 상태값과 함께 기록합니다.
- 도메인 용어는 `knowledge/workflow/domain_glossary.md`에 연결합니다.
- SDA의 물리적 5레이어 재배치는 `index.html` 단일 파일 제약과 충돌하므로 적용하지 않습니다.
- 변경 시 `knowledge/index.json`과 관련 workflow 문서를 함께 확인합니다.

## 기술 스택

- 프론트엔드: `index.html` 단일 파일, 순수 HTML/CSS/JS
- 백엔드: `netlify/functions/proxy.js` Netlify Serverless Function
- 데이터: Notion API
- CORS 처리: Netlify Function 프록시

## 핵심 제약

- `index.html`은 단일 파일 구조를 유지합니다. CSS/JS를 별도 파일로 분리하지 않습니다.
- Notion API 호출은 반드시 `/.netlify/functions/proxy/`를 경유합니다. 브라우저에서 Notion API를 직접 호출하지 않습니다.
- GitHub push는 Netlify 자동 배포를 유발하므로, 사용자가 명시적으로 요청하기 전에는 push하지 않습니다.
- `token.txt`, `.env*`, `*token*`, `*secret*` 파일 내용은 출력하지 않습니다.

## Git 및 배포 정책

- Claude Code의 `.claude/hooks` 자동 stage/commit 훅은 Codex에서 자동 실행되지 않습니다.
- Codex에서는 사용자가 명시적으로 요청한 경우에만 커밋합니다.
- push 또는 `..\push.bat` 실행 전에는 변경 내용, 영향 범위, Netlify 배포 발생 가능성을 먼저 보고합니다.
- 자동 커밋 동작을 Codex 쪽에 새로 구성해야 한다면, 먼저 사용자에게 확인을 받습니다.

## Notion 연동

- 주간 태스크 DB ID: `0de58e7636134d4382df512e18a3ab0f`
- 고정 스케줄 DB ID: `014f0605d8fb490abfb58789e7a9c30b`
- API 호출 패턴:

```js
fetch('/.netlify/functions/proxy/databases/{DB_ID}/query', {
  headers: { 'x-notion-token': token }
})
```

- Notion 인프라, 스키마, 배포 이력에 의존하는 작업은 가능한 경우 아래 페이지를 확인합니다.
- Notion 접근 권한이나 커넥터가 없으면 그 사실을 보고하고, 로컬 파일 기준으로 진행 가능한 범위를 분리합니다.
- 인프라 페이지: `https://www.notion.so/34160753b398814db235f2407e5fff46`

## 주요 파일

- 앱 본문: `C:\Users\USER\Desktop\ToDo\newpeak\index.html`
- Netlify 프록시: `C:\Users\USER\Desktop\ToDo\newpeak\netlify\functions\proxy.js`
- 배포 스크립트: `C:\Users\USER\Desktop\ToDo\push.bat`
- GitHub 토큰 파일: `C:\Users\USER\Desktop\ToDo\token.txt` (내용 출력 금지)

## 현재 기능 컨텍스트

- 3개월 캘린더
- 날짜 클릭 시 해당 날짜 Todo 표시
- 오늘 날짜 강조와 선택 날짜 표시
- 날짜별 진행 상태 도트
- 담당자 탭 전환: 크리스토퍼, 켈리, 에디
- 고정 스케줄 패널
- 이번 주 진행 현황 바
- Notion 통합 토큰 초기 설정 화면
- 라이트 테마

## 팀 정보

| 이름 | 역할 | 색상 |
| --- | --- | --- |
| 크리스토퍼 | 퍼포먼스 마케팅 | `#e05c1a` |
| 켈리 | 콘텐츠 마케팅 | `#ec4899` |
| 에디 | 생산기획 | `#3b82f6` |

## 검증 기준

- `index.html` 변경 시 브라우저에서 주요 화면이 깨지지 않는지 확인합니다.
- 프록시 변경 시 가능하면 Node 문법 검사 또는 로컬 함수 실행으로 확인합니다.
- 최소 문법 검증은 `node tools/check-js-syntax.mjs`를 사용합니다.
- 검증할 수 없는 항목은 완료 보고에서 `[검증 불가]`로 명시합니다.

## Claude Code 호환 파일

- `CLAUDE.md`, `.claude/settings.json`, `.claude/settings.local.json`, `.claude/hooks/*`는 기존 Claude Code 사용을 위해 유지합니다.
- Codex가 따라야 할 프로젝트 규칙은 이 `AGENTS.md`입니다.
