챔피언스시티 공유 저장 (B안 · Cloudflare D1) 설치 방법

이 작업을 하면 설정 · 직원 · PIN · 권한 · 동호배치표 호실 상태 · 상담카드 · 상담이력대장 · 계약자DB 가
모든 직원 · 컴퓨터 · 휴대폰에서 같은 내용으로 보이고 이어서 작업할 수 있습니다.

────────────────────────────────
[1단계] 데이터베이스 만들기 (Cloudflare · 3분)
1) dash.cloudflare.com 로그인
2) 왼쪽 메뉴 [Storage & databases] → [D1 SQL database] → [+ Create] (또는 Create database)
3) 이름: champs-db   → 위치(Location)는 기본값 → [Create]
4) 만들어진 champs-db 화면에서 'Database ID' 옆 복사 버튼을 눌러 ID를 복사합니다
   (예: 3f2a9c1e-xxxx-xxxx-xxxx-xxxxxxxxxxxx)

[2단계] wrangler.jsonc 에 ID 넣기 (메모장 · 1분)
1) 압축 안의 wrangler.jsonc 를 메모장으로 엽니다
2) "여기에_데이터베이스_ID_붙여넣기" 의 글자만 지우고 복사한 ID를 붙여넣습니다 (따옴표 " " 는 남김)
3) 저장

[3단계] 사무실 코드(STAFF_KEY) 등록 (Cloudflare · 2분)
1) Cloudflare → [Workers & Pages] → championscity1 → [Settings] → [Variables and Secrets] → [+ Add]
2) Type: Secret   ·   Variable name: STAFF_KEY   ·   Value: 직원들과 공유할 사무실 코드
   (구글 Apps Script 에 넣은 STAFF_KEY 와 같은 값으로 쓰면 하나만 기억하면 됩니다)
3) [Deploy] (또는 Save)

[4단계] GitHub 올리기 (GitHub Desktop)
저장소 ChamPionsCity1 폴더에 압축 안의 파일을 같은 위치로 넣습니다
  - wrangler.jsonc            → 저장소 맨 위 (기존 파일 덮어쓰기)
  - src/worker.js             → 저장소 맨 위에 src 폴더를 새로 만들고 그 안에
  - public/dashboard.dc.html  → public 폴더 (덮어쓰기)
Summary '공유 저장 D1' → [Commit to main] → [Push origin]
→ Cloudflare 가 자동으로 다시 배포합니다 (2~3분). Workers & Pages → championscity1 → Deployments 에서 '성공' 확인

[5단계] 처음 한 번 자료 올리기 (관리자 컴퓨터)
1) 지금까지 쓰던 관리자 컴퓨터에서 https://championscity1.sangmooone.workers.dev/staff/ 접속 (Ctrl+F5)
2) '사무실 코드 입력' 화면 → 3단계 코드 입력 → 확인
3) 로그인하면 상단 '담당' 옆에 '● 공유 저장됨 14:05' 가 보이면 성공
   → 이 컴퓨터에 있던 설정 · 직원 · 상담카드가 서버로 자동으로 올라갑니다 (서버가 비어 있을 때 1회)
4) 반드시 관리자 컴퓨터에서 먼저 하세요. 서버에 자료가 생긴 뒤 접속하는 기기는 서버 자료로 시작합니다.

[6단계] 다른 컴퓨터 · 휴대폰
접속 → 사무실 코드 1회 입력 → 로그인. 같은 직원 목록 · 같은 상담카드가 보입니다.
다른 직원이 저장한 내용은 약 5초 안에 자동으로 나타납니다.

────────────────────────────────
[상단 표시 뜻]
● 공유 저장됨 14:05     정상 (모든 기기와 공유 중)
저장 중… 3건            서버로 올리는 중
⚠ 연결 끊김 · 3건 대기  인터넷이 끊김. 이 기기에 먼저 저장하고, 연결되면 자동으로 올라감
○ 이 기기에만 저장       서버 설치 전 (1~4단계 전) 상태
⚠ 공유 꺼짐             사무실 코드가 없거나 틀림

[알아 두실 점]
- 인터넷 사용기록을 지워도 자료는 서버에 남습니다. 다시 사무실 코드만 넣으면 됩니다.
- 같은 호실 · 같은 카드를 두 사람이 동시에 고치면 나중에 저장한 내용이 남습니다. 이전 내용은 서버 기록(hist)에 남습니다.
- 설정 > 전체 비우기 는 이제 모든 기기에 반영됩니다. 구글시트 기록은 그대로입니다.
- 구글시트 · 텔레그램 기록과 게스트 관심등록 🔔 알림은 지금처럼 그대로 동작합니다.
- 무료 한도(하루 읽기 500만 · 쓰기 10만 건) 안에서 충분합니다.

[안 될 때]
- 4단계 후 Deployments 가 '실패' → wrangler.jsonc 의 ID 를 다시 확인 (따옴표 · 띄어쓰기)
- 계속 '○ 이 기기에만 저장' → https://championscity1.sangmooone.workers.dev/api/ping 을 열어
  {"ok":true,...} 가 보이면 서버는 정상, 404 화면이면 배포가 안 된 것
- '"hasKey":false' 가 보이면 3단계 STAFF_KEY 가 등록되지 않은 것
