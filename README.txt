챔피언스시티 업로드 (공유 저장 화면 · 다시 만든 파일)

[원인]
지난번 dashboard.dc.html 에 공유 저장 기능이 빠진 채로 묶였습니다. 서버(worker · D1 · STAFF_KEY)는 정상입니다.

[올리는 파일]
public/dashboard.dc.html   (덮어쓰기 · wrangler.jsonc · src/worker.js 는 그대로)

[방법]
1) public/dashboard.dc.html 을 저장소 public 폴더에 덮어씁니다.
2) Summary '공유 저장 화면' → Commit to main → Push origin
3) Deployments 성공 확인 (2~3분)

[처음 한 번]
1) 관리자 컴퓨터(직원 추가해 둔 컴퓨터)에서 먼저 /staff/ 접속 → Ctrl+F5
2) '사무실 코드 입력' 화면 → STAFF_KEY 값 입력 → 로그인
3) 상단 '● 공유 저장됨' 확인 → 이 컴퓨터 자료가 서버로 올라감
4) 그다음 휴대폰 접속 → 사무실 코드 입력 → 로그인 → 추가한 직원이 이름 목록에 보이면 성공

[이후]
- 인터넷 사용기록을 지워도 자료는 서버에 남습니다. 사무실 코드만 다시 넣으면 그대로 나옵니다.
- 직원 추가 · 상담카드 · 호실 변경은 약 5초 안에 다른 기기에 나타납니다.
