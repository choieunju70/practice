# 부산한일라이온스 홈페이지

남색과 금색을 중심으로 만든 반응형 한국어 홈페이지입니다. Windows, 휴대폰에서 사용할 수 있고 설치나 빌드가 필요 없습니다.

## 실행

`홈페이지 열기.cmd`를 더블 클릭하거나 `index.html`을 브라우저로 여세요. 인터넷이 없어도 홈페이지는 열립니다. 실시간 부산 날씨는 인터넷이 필요하며, 조회 실패 시 재시도 안내를 표시합니다.

## 포함된 내용

- 클럽 소개, 회원 소개, 창립 역사
- 연도별 봉사활동 선택과 활동 상세 창
- 한국시간의 현재 월에 맞춘 이달의 봉사활동
- 355-A(부산)지구 연락처와 공식 사이트 링크
- 회원 경조사와 상세 창
- Open-Meteo 기반 부산 날씨와 새로고침
- 모바일 메뉴, 키보드 접근, 반응형 화면

## 실제 자료 입력

회원명, 창립일, 클럽 봉사 기록은 제공되지 않았고 공개 검색에서도 확인되지 않아 빈 상태로 준비했습니다. 실제 자료는 `data.js`의 배열에 넣으면 표시됩니다. 웹페이지에서 직접 저장하는 관리자 기능이나 회원 로그인은 포함되어 있지 않습니다. 변경한 파일을 GitHub에 올리면 공개 내용이 갱신됩니다.

아래는 **입력 형식 예시이며 실제 기록이 아닙니다.** 값은 모두 확인된 자료로 바꾸세요. `date`는 `YYYY-MM-DD` 형식을 사용합니다.

```javascript
window.CLUB_DATA = {
  members: [
    { name: '실제 회원명', role: '회장', introduction: '회원 소개 문장', image: 'assets/member-01.jpg' }
  ],
  history: [
    { year: '실제 창립 연도', title: '클럽 창립', description: '확인된 창립일과 창립 배경' }
  ],
  activities: [
    { date: '2026-10-15', title: '실제 봉사활동명', category: '지역 봉사', location: '실제 장소', summary: '짧은 안내', description: '일정과 참여 안내 또는 활동 기록', image: 'assets/service-01.jpg' }
  ],
  news: [
    { date: '2026-10-10', category: '경사', title: '실제 경조사 제목', location: '실제 장소', description: '공개 가능한 안내 내용' }
  ]
};
```

사진은 `assets` 폴더에 넣으세요. 파일명은 영문, 숫자, 하이픈을 권장합니다. 사진이 없으면 `image`를 생략하세요. 이 파일과 사진은 공개되므로 회원이 공개에 동의한 소개와 경조사 정보만 올리세요. 현재 화면의 L 표시는 장식용 문자이며 공식 라이온스 휘장이 아닙니다.

## GitHub에 올리고 홈페이지 공개하기

1. GitHub에서 새 저장소를 만듭니다.
2. 저장소의 **Add file → Upload files**로 이 폴더 안의 파일 전체를 올립니다. `index.html`, `styles.css`, `app.js`, `data.js`, `assets`가 저장소 최상위에 위치해야 합니다.
3. 저장소의 **Settings → Pages**에서 **Deploy from a branch**를 선택합니다.
4. `main` 브랜치와 `/(root)` 폴더를 선택하고 저장합니다.
5. Pages에 표시되는 홈페이지 주소를 엽니다. 저장소의 공개 범위와 계정 요금제에 따라 Pages 사용 가능 여부가 달라질 수 있습니다.

코드는 아직 GitHub에 업로드하거나 인터넷에 공개하지 않았습니다. 계정, 저장소 정보 없이 실행 가능한 파일을 준비한 상태입니다. GitHub Pages는 정적 사이트로 서버와 데이터베이스가 필요 없습니다.

## 파일 구성

- `index.html`: 홈페이지 내용 및 구조
- `styles.css`: 색상, 글꼴, PC·모바일 레이아웃
- `data.js`: 회원·연혁·봉사활동·경조사 자료
- `app.js`: 목록, 연도 선택, 상세 창, 모바일 메뉴, 날씨
- `assets/busan.png`: 부산 광안대교 사진
- `홈페이지 열기.cmd`: Windows 실행 도우미
- `.nojekyll`: GitHub Pages 정적 파일 제공 설정

## 참고 및 출처

- 요청하신 참고 주소 https://icms.pknu.ac.kr/ps1/6406 는 부경대학교 사회복지학과 공지사항 페이지로 확인했습니다. 부산한일라이온스의 공식 자료로 사용하지 않았으며 게시판 구성만 참고했습니다.
- 부산지구 정보: https://korealionsclubs.org/html/sub02/02.asp (2026-10-01 확인). 공식 지구 링크 https://www.lc355a.or.kr/ 는 제공하지만 조회 시 서버 응답을 확인하지 못했습니다.
- 사진: 부산관광공사 글로벌마케팅팀 발행, 하이픈그룹 제작, 광안리해수욕장_광안대교. 공공누리 제1유형(출처표시). https://www.visitbusan.net/archive/dataSearch/view.nm?dataSid=METADATA009493 . 사진은 화면에서 일부 잘라 표시하며 원본 파일은 수정하지 않았습니다.
- 날씨: https://open-meteo.com/ , CC BY 4.0. https://creativecommons.org/licenses/by/4.0/ . 기상 모델 기반 정보이며 비상 상황이나 야외 활동 판단은 공식 기상 예보를 확인하세요. 무료 비상업용 API를 사용합니다.
- GitHub Pages 안내: https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
