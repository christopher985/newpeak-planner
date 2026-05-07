# Domain Glossary

| 용어 | 의미 | 코드/데이터 연결 |
| --- | --- | --- |
| Todo 카드 | 팀원이 처리할 업무 카드 | Notion 주간 태스크 DB, `S.tasks`, `mapTask()` |
| 완료 | 업무가 실제로 완료 버튼을 눌러 처리된 상태 | Notion `완료` checkbox |
| 완료시점 | 완료가 발생한 실제 시간. 주간 완료 섹션의 기준 | Notion `완료시점`, `taskDoneDateStr()` |
| 이번주 완료 | 선택 날짜가 속한 주에 완료된 카드 목록 | `weekRange()`, `taskDoneDateStr()`, `render()` |
| 선택 날짜 | 캘린더에서 현재 보고 있는 날짜 | `S.selectedDate` |
| 이월 카드 | 오늘 이전 날짜의 미완료 카드가 오늘 이후 화면에 표시되는 상태 | `loadCarried()`, `carried-*` cache |
| 고정 스케줄 | 요일 또는 월일 기준으로 반복 표시되는 업무 | Notion 고정 스케줄 DB, `loadSched()` |
| 퍼포먼스 팀 | 브랜드/영역/CRM 기능을 포함하는 팀 탭 | `S.team === '퍼포먼스'` |
| 디자인 요청 | 디자인 팀의 별도 요청 보드 | `DESIGN_DB`, `loadDesignReqs()` |
| 콘텐츠 요청 | 콘텐츠 팀의 별도 요청 보드 | `CONTENT_DB`, `loadContentReqs()` |
| CRM 카드 | CRM 캘린더 이벤트와 Notion callout 상세 | `CRM_DB`, CRM 함수군 |
| Notion 프록시 | 브라우저 CORS 문제를 피하기 위한 Netlify 함수 | `/.netlify/functions/proxy`, `netlify/functions/proxy.js` |
| 배포 | GitHub push 후 Netlify가 운영 사이트를 갱신하는 과정 | `push.sh`, `push.bat`, Netlify linked deploy |
