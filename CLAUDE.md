# 뉴픽 Todo 프로젝트 규칙

## Git 자동화 정책

### 자동 커밋 (세션 종료 시)
- `.claude/hooks/auto-stage.mjs` — Edit/Write 후 해당 파일 자동 `git add`
- `.claude/hooks/auto-commit.mjs` — Stop hook 발동 시 스테이지된 변경을 `auto: <filenames>` 메시지로 커밋
- hook 등록 위치: `.claude/settings.json` 의 `hooks` 섹션
- 수동 개입 불필요. 매 턴 종료 시 자동 진행.

### 푸시는 수동
**Claude 는 자동 푸시 절대 금지.**
- 사용자가 명시적으로 "푸시해줘" / "배포해줘" / `push.bat` 실행 을 요청한 경우에만 진행.
- auto-commit hook 은 커밋만 수행 (auto-commit.mjs 내부 규칙).
- 푸시 실행 전 변경 요약 + 영향 범위(Netlify 자동 배포 연동) 를 반드시 사용자에게 보고.
- 행위 기반 규칙이므로 settings.json 의 permissions 로는 강제하지 않음 (필요 시 사용자가 push.bat 을 직접 실행 가능해야 하기 때문).

### 이유
- Netlify 가 GitHub push 를 감지하여 자동 배포 → 푸시는 즉시 배포. 비의도 배포 위험.
- 커밋은 로컬 되돌리기 가능, 푸시는 원격 이력 오염 시 되돌리기 부담.

## 파일 구조 제약
- `index.html` 은 **단일 파일 구조 유지** (CSS/JS 분리 금지). 빌드 파이프라인 부재로 분리 시 캐시·순서 의존성 부채 발생.
- Notion API 호출은 반드시 `/.netlify/functions/proxy/` 경유 (CORS).

## 관련 참조
- 전역 규칙: `C:\Users\USER\CLAUDE.md`
- 프로젝트 지침: `C:\Users\USER\Desktop\ToDo\claude_project_instructions.txt`
- Notion 인스트럭처: https://www.notion.so/34160753b398814db235f2407e5fff46
