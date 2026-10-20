챔피언스시티 업로드 (직원 화면 🔔 게스트 등록 알림)

[올리는 파일]
public/dashboard.dc.html   화면 본체 (🔔 알림 · 알림음 · PC/휴대폰 알림 · 조회 키 설정)
gas/Code.gs                구글 Apps Script 코드 (GitHub에 올리지 않습니다)

[1. 구글 Apps Script 수정]
1) script.google.com → 챔피언스시티 프로젝트 → Code.gs 내용을 통째로 새 Code.gs로 바꾸고 저장
2) 프로젝트 설정(톱니) → 스크립트 속성 → [속성 추가]
   속성: STAFF_KEY   값: 아무 문자 (예: champs-2026-7240)  → 저장
3) 함수 선택에서 setup → [실행]  ('게스트수신' 탭이 생깁니다)
4) 배포 → 배포 관리 → 연필 → 버전: 새 버전 → 배포 (웹앱 주소는 그대로)

[2. GitHub 올리기]
1) public/dashboard.dc.html 을 ChamPionsCity1 저장소 public 폴더에 덮어씁니다.
2) Summary '직원 알림' → Commit to main → Push origin

[3. 직원 기기마다 1회]
1) https://championscity1.sangmooone.workers.dev/staff/ 로그인
2) 설정 · 모듈 → 구글시트 · 알림 연동
   - 웹앱 URL 확인
   - 직원 조회 키: 위 STAFF_KEY 와 같은 값 입력
   - 'PC · 휴대폰 알림' 켜기 → 브라우저 알림 허용
3) 게스트 화면에서 관심등록을 하나 해 보고 1분 안에 🔔 숫자가 뜨는지 확인

* 조회 키가 없으면 게스트 개인정보를 읽을 수 없게 막혀 있습니다. 키는 직원에게만 알려 주세요.
