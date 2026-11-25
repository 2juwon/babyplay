# 태오플레이 (babyplay)

아이와 함께하는 미니게임 모음. 빌드 없이 정적 파일만으로 돌아가요.

## 구조

```
index.html            첫 화면(태오플레이 랜딩)
menu.html             놀이 고르기: 게임 카드 목록
games.js              게임 목록(menu.html이 이걸 읽어 카드를 그려요)
shared/bp.css         공통 스타일(홈 버튼 등)
manifest.webmanifest  앱 설치 정보
sw.js                 서비스 워커(설치·오프라인)
icons/                앱 아이콘
games/<id>/index.html 각 게임
games/<id>/thumb.svg  메인 카드 그림(정사각형)
```

## 게임 추가하기

1. `games/<id>/index.html`에 게임을 만들어요.
2. `<head>`에 `<link href="../../shared/bp.css" rel="stylesheet">`를 넣고, 화면 위쪽에 홈 버튼을 달아요.
   ```html
   <a class="bp-home" href="../../menu.html" aria-label="홈으로">…집 아이콘 svg…</a>
   ```
3. `games/<id>/thumb.svg`에 카드 그림을 넣어요.
4. `games.js`의 `BP_GAMES`에 항목을 하나 추가해요.

## 앱으로 설치

`manifest.webmanifest`와 `sw.js`로 홈 화면에 설치할 수 있어요(PWA). 안드로이드 크롬은 첫 화면의 "앱으로 설치하기" 버튼, 아이폰·아이패드는 사파리 공유 → 홈 화면에 추가.
게임을 추가하면 `sw.js`의 `CORE` 목록에 경로를 넣고 `CACHE` 이름의 숫자를 올려 주세요(예: `babyplay-v2`). 새 게임 페이지 `<head>`에도 다른 게임처럼 manifest·아이콘 태그와 서비스 워커 등록 줄을 넣어요.

## 로컬에서 보기

```
python3 -m http.server 8000
```
브라우저에서 http://localhost:8000 을 열어요.

## 게임

- **손전등 도둑 찾기** (`games/flashlight`): 손가락으로 깜깜한 마을을 비춰 숨은 도둑을 찾아요. 5명을 잡으면 끝. 고양이(비추면 야옹 하고 다른 곳으로 도망)와 박쥐(비추면 날아가요)도 숨어 있어요.
- **로얄 스매시** (`games/royal-smash`): 대포로 구슬을 쏴 원탁 위 블록을 떨어뜨려요. 게임 본체는 [2juwon/royal-smash](https://github.com/2juwon/royal-smash)에 있고, 여기서는 홈 버튼을 얹어 iframe으로 불러와요.
