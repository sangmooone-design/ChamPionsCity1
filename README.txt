챔피언스시티 업로드 (게스트 등록 전송 주소 수정)

[올리는 파일]
public/dashboard.dc.html   게스트 화면은 config.js 의 웹앱 URL 을 항상 먼저 씁니다

[방법]
1) public/dashboard.dc.html 을 ChamPionsCity1 저장소 public 폴더에 덮어씁니다.
2) Summary '게스트 전송 수정' → Commit to main → Push origin
3) 2~3분 뒤 '시크릿 탭'으로 게스트 화면을 열고 관심등록 테스트

[직원 설정 웹앱 URL 맞추기]
직원 화면 ⚙ 설정 > 구글시트 · 알림 연동 > 웹앱 URL 이
config.js 의 주소와 글자 하나까지 같은지 확인하세요.
https://script.google.com/macros/s/AKfycbwKJz39c1hyapCqGc6BbUU3_jSWKOUljeqHk-5avfr-qT-gK50xO8ISbCwDN76UladTwA/exec

[그래도 안 되면 · Apps Script 실행 기록 보기]
1) script.google.com → 프로젝트 → 왼쪽 ☰ '실행' (시계 모양)
2) 관심등록 직후 맨 위 'doPost' 줄을 누릅니다
   - '완료' 인데 시트에 없으면 → 웹앱 URL 이 다른 배포(다른 시트)를 가리키는 것
   - '실패' 면 → 빨간 오류 문구를 그대로 알려 주세요
   - doPost 줄이 아예 없으면 → 요청이 오지 않은 것 (config.js · 시크릿 탭 확인)
