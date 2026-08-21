# Time Tipping Compass — 실행 및 배포 안내

이 폴더는 **Time Tipping Compass**의 완성 소스입니다. 순수 HTML·CSS·JavaScript PWA로 만들었으며, 별도의 데이터베이스 없이 각 브라우저의 `localStorage`에 기록을 저장합니다.

## 1. 이 압축 파일로 할 수 있는 일

| 사용 환경 | 권장 실행 방법 | 가능 여부 |
|---|---|---|
| Windows·macOS·Linux | 폴더를 풀고 Node.js로 `server.js` 실행 | 가능 |
| GitHub Pages | 이 폴더의 정적 파일을 저장소에 올려 HTTPS 웹사이트로 배포 | 가능 |
| Android Chrome | HTTPS로 배포한 주소를 열고 **앱 설치** | 가능 |
| `index.html` 파일을 직접 열기 | 간단한 화면 확인 | 권장하지 않음 |
| Android APK 설치 | 안정적인 HTTPS 주소와 Android 패키징 절차 후 생성 | 준비 필요 |

> `index.html`을 파일 앱에서 바로 여는 방식(`file://`)은 서비스 워커와 설치형 PWA 기능이 제한될 수 있습니다. 데스크톱에서는 아래처럼 로컬 서버로 실행하고, 휴대폰에서는 HTTPS 주소를 사용하는 것이 안전합니다.

## 2. 데스크톱에서 실행하기

### 준비물

- Node.js 18 이상
- Chrome, Edge, Safari 등 최신 브라우저

### 실행 순서

1. 압축 파일을 원하는 폴더에 풉니다.
2. 터미널(Windows는 PowerShell)을 해당 폴더에서 엽니다.
3. 다음 명령을 실행합니다.

```bash
node server.js
```

4. 브라우저에서 다음 주소를 엽니다.

```text
http://localhost:4173
```

5. 종료하려면 터미널에서 `Ctrl + C`를 누릅니다.

## 3. 데이터 보관에 관한 중요한 점

현재 기록은 **서버나 압축 파일 안이 아니라 사용 중인 브라우저에만 저장**됩니다. 따라서 다음을 주의해야 합니다.

| 상황 | 결과 |
|---|---|
| 같은 기기·같은 브라우저에서 계속 사용 | 기록 유지 |
| 브라우저 앱 데이터 삭제 또는 시크릿 모드 사용 | 기록이 사라질 수 있음 |
| 다른 휴대폰·다른 컴퓨터에서 열기 | 기존 기록은 자동으로 보이지 않음 |
| GitHub에 코드만 올리기 | 코드만 공유되며 개인 기록은 올라가지 않음 |

기기 간 동기화와 자동 백업은 추후 Supabase 같은 백엔드를 연결할 때 추가할 기능입니다.

## 4. GitHub에 올리는 방법

GitHub 저장소를 새로 만든 뒤, 이 폴더의 파일을 그대로 올리면 됩니다. GitHub Pages를 사용하면 정적 웹사이트를 HTTPS로 배포할 수 있어 Android의 PWA 설치에도 적합합니다.

```bash
git init
git add .
git commit -m "Add Time Tipping Compass PWA"
git branch -M main
git remote add origin https://github.com/사용자이름/저장소이름.git
git push -u origin main
```

그 뒤 GitHub 저장소의 **Settings → Pages**에서 `main` 브랜치와 `/ (root)`를 선택해 배포합니다. 생성된 `https://사용자이름.github.io/저장소이름/` 주소를 Android Chrome으로 열면 앱 설치를 진행할 수 있습니다.

## 5. Android에서 앱처럼 설치하기

1. HTTPS로 배포된 앱 주소를 Android Chrome에서 엽니다.
2. Chrome 메뉴에서 **앱 설치** 또는 **홈 화면에 추가**를 선택합니다.
3. 홈 화면의 Time Tipping Compass 아이콘을 누르면 독립 앱 창처럼 열립니다.

웹 앱은 휴대폰 홈 화면과 앱 목록에서 실행할 수 있으며, 오프라인 기능·알림·아이콘 같은 추가 기능을 지원할 수 있습니다. 자세한 설치 흐름은 [Chrome 웹 앱 도움말](https://support.google.com/chrome/answer/9658361?hl=ko)을 참고하세요.

## 6. APK와 홈 화면 위젯

현재 압축 파일은 **완성된 PWA 소스**이며 APK는 포함하지 않습니다. 안정적인 APK를 만들려면 먼저 영구 HTTPS 주소가 필요합니다. GitHub Pages 등으로 공개 주소를 만든 뒤, Bubblewrap 기반 Trusted Web Activity(TWA)로 APK를 생성할 수 있습니다.

```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest=https://내도메인/manifest.webmanifest
bubblewrap build
```

TWA는 내가 소유한 웹사이트와 APK의 연결을 `assetlinks.json`으로 검증해야 전체 화면으로 열립니다. 자세한 절차는 [Chrome TWA Quick Start](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)와 [Android TWA 개요](https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities)를 참고하세요.

Android의 **진짜 홈 화면 위젯**은 PWA만으로는 만들 수 없습니다. APK에 Kotlin·Jetpack Glance 등의 네이티브 위젯 코드를 추가해야 합니다. 이 앱에는 추후 `오늘 루틴 3개`, `완료율`, `루틴 완료` 버튼을 제공하는 2×2 또는 4×2 위젯을 별도 네이티브 기능으로 추가하는 방식을 권장합니다. 위젯은 앱의 핵심 정보를 한눈에 보여 주고, 버튼이나 체크로 앱을 열 수 있도록 설계하는 것이 Android 권장 방식입니다.

## 7. 주요 파일

| 파일 | 역할 |
|---|---|
| `index.html` | 앱 진입 화면 |
| `app.js` | 화면·기록·루틴·프로젝트·localStorage 로직 |
| `style.css` | 1980년대 플래너 스타일과 모바일 UI |
| `service-worker.js` | 오프라인 캐시와 PWA 업데이트 |
| `manifest.webmanifest` | 설치형 웹앱 이름·아이콘·표시 정보 |
| `server.js` | 데스크톱 로컬 실행용 정적 서버 |
| `Time_Tipping_Compass_구현구조_보고서.md` | 현재 구현 구조 보고서 |
| `Time_Tipping_Compass_개편_제안서.md` | 개편 방향과 기능 설계 제안 |

## 참고 자료

1. [Chrome Help — Use web apps](https://support.google.com/chrome/answer/9658361?hl=ko)
2. [Chrome Developers — Quick start to Trusted Web Activities](https://developer.chrome.com/docs/android/trusted-web-activity/quick-start)
3. [Android Developers — Trusted Web Activities](https://developer.android.com/develop/ui/views/layout/webapps/trusted-web-activities)
4. [Android Developers — App widgets overview](https://developer.android.com/develop/ui/views/appwidgets/overview)
