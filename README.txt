챔피언스시티 업로드 (게스트 등록 → 구글시트 · 텔레그램 · 🔔 연결)

[원인]
게스트 화면(index.html)에 웹앱 URL이 비어 있어서 관심등록 · 방문예약이 구글로 전송되지 않았습니다.

[올리는 파일]
public/index.html   게스트 첫 화면 (config.js 에서 웹앱 URL을 읽도록 수정)
public/config.js    웹앱 URL 한 줄 설정 파일 (새 파일)

[1. config.js 에 웹앱 URL 넣기]
1) config.js 를 메모장으로 엽니다.
2) '여기에_웹앱_URL_붙여넣기' 를 지우고 웹앱 URL 을 붙여넣습니다. 따옴표 ' ' 는 남겨 둡니다.
   예) window.CC_SYNC_URL = 'https://script.google.com/macros/s/AKfy...../exec';
   웹앱 URL 찾는 곳: Apps Script → [배포] → [배포 관리] → 웹 앱 URL 복사
3) 저장

[2. GitHub 올리기]
1) public/index.html, public/config.js 를 ChamPionsCity1 저장소 public 폴더에 넣습니다 (index.html 은 덮어쓰기).
2) Summary '게스트 웹앱 연결' → Commit to main → Push origin
3) 2~3분 뒤 시크릿 탭에서 게스트 화면 → 관심등록 테스트

[3. 확인]
- 구글시트 '① 상담_챔스' 의 상담_매수(또는 상담_매도) · 게스트수신 탭에 한 줄이 생기면 성공
- 텔레그램 알림이 오는지 확인
- 직원 화면 🔔 은 1분 안에 숫자가 뜹니다 (직원 조회 키 입력 필요)

[그래도 안 될 때 확인]
- Apps Script 배포 설정: 실행 = 나, 액세스 = 모든 사용자  (배포 관리 → ✏ 에서 확인)
- 스크립트 속성 TG_TOKEN · TG_CHAT 값
- 직원 화면 ⚙ 설정 > 구글시트 · 알림 연동 > [연결 테스트] 를 눌러 '연결테스트' 탭에 줄이 생기는지
