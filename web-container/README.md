# Web-Container

Mirco Frontend 방식으로 구성된 단위 어플리케이션을 통하여 서비스 하기 위한 웹 컨테이너 입니다.

## VSCode 확장 기능 설치

    ESLint
    Prettier - Code formatter
    PostCSS Language Support
    Tailwind CSS IntelliSense
    Tailwind Twin IntelliSense
    Tailwind Fold
    Comment Anchors

## 실행 전 확인 및 설치

소스를 다운로드 후에 최초 실행 전에 아래 항목을 확인하세요.

### `node -v`

    node.js 의 설치 여부를 확인하고, 필요하면 설치 하세요.
    node.js 버전은 v24.15.0 이상 설치하시면 됩니다. (https://nodejs.org/ko/download)

### `pnpm -v`

    pnpm 의 설치 여부를 확인하고, 필요하면 설치 하세요.
    pnpm 버전은 11.0.9 이상 설치하시면 됩니다. (npm install -g pnpm)

### `pnpm install`

    package.json 파일에 등록된 모든 종속성을 설치 합니다.
    pnpm.lock 파일이 존재하고, package.json 파일에 등록된 모든 종속성을 충족한다면
    정확한 버전이 pnpm.lock 파일에 기록되고, pnpm.lock 파일은 변경되지 않습니다다.

## 실행 (개발)

### `pnpm lint`

    ESLint(린터)를 실행 합니다.

### `pnpm lint:fix`

    ESLint(린터)를 실행하고, 자동으로 수정 가능한 코드 스타일 오류나 잠재적 에러를 수정(fix) 합니다.

### `pnpm format`

    프로젝트 내에서 정의된 코드 스타일 포맷팅(Formatting) 스크립트를 실행 합니다.

### `pnpm test`

    감시(Watch) 모드: 코드 변경 사항을 감지하여 자동으로 테스트를 다시 실행 합니다.

### `pnpm test:run`

    1회성 실행 (CI 환경용): 감시 모드를 끄고 테스트를 한 번만 실행한 후 종료 합니다.

### `pnpm test:ui`

    UI 모드: 브라우저 기반의 시각적 대시보드(Vitest UI)를 통해 테스트를 실행하고 결과를 확인 합니다.

### `pnpm dev`

    .env/.env.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm build`

    .env/.env.local 환경 파일을 적용하여여 프로젝트의 소스 코드를
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm preview`

    .env/.env.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm dev:stg`

    .env.stg/.env.stg.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm build:stg`

    .env.stg/.env.stg.local 환경 파일을 적용하여 프로젝트의 소스 코드를
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm preview:stg`

    .env.stg/.env.stg.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm dev:prd`

    .env.prd/.env.prd.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm build:prd`

    .env.prd/.env.prd.local 환경 파일을 적용하여 프로젝트의 소스 코드를
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm preview:prd`

    .env.prd/.env.prd.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

## 폴더 구조

### `config`

    환경 변수 파일 등의 config 파일들이 저장되는 폴더

### `dist`

    빌드 결과가 저장되는 폴더

### `src\app`

    전체 app 의 로직이 초기화 되는 곳으로, app 의 entry point 역할

    1. import 가능한 폴더 : components, hooks, pages, stores, styles, types, utils
    2. layout, provider, router 등으로 구성
    3. index.ts 파일에서 export 한 기능만 외부에서 import 가능

#### `src\components`

    재사용 가능하고 개별 기능을 가진 UI 구성 요소(컴포넌트)를 저장

    1. import 가능한 폴더 : hooks, stores, styles, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\hooks`

    재사용 가능하고 개별 기능을 가진 커스텀 훅 저장

    1. import 가능한 폴더 : stores, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\pages`

    라우트 구조에서 사용하는 개별 기능의 페이지 저장

    1. import 가능한 폴더 : components, hooks, stores, styles, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\stores`

    전역 상태(Zustand)와 비즈니스 로직(API 호출, 데이터 가공 및 상태 변경 로직) 저장

    1. import 가능한 폴더 : types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\styles`

    디자인과 관련된 스타일 시트(폰트, CSS, 테마 파일, 이미지 파일 등) 저장

    1. import 가능한 폴더 :
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\types`

    전역적으로 사용되는 데이터 구조, 인터페이스, 타입 정의 파일(.d.ts 또는 .ts) 저장

    1. import 가능한 폴더 :
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\utils`

    컴포넌트나 페이지에서 호출하는 재사용 가능하고 개별 기능의 공통 유틸리티 함수 저장

    1. import 가능한 폴더 :
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `tests`

    ViTest 로 작성된 테스트 파일 폴더

## 주석 - Comment Anchors

    ANCHOR - 특정 주제나 섹션을 가리키는 책갈피 역할
    TODO - 완료를 기다리는 항목
    FIXME - 버그 수정이 필요한 항목
    STUB - 생성된 기본 코드 조각에 사용
    NOTE - 특정 코드 섹션에 대한 중요 참고 사항
    REVIEW - 추가 검토가 필요한 항목
    SECTION - 코드 내부의 특정 영역을 정의하고 계층적 앵커 구조 (SECTION 밑에 TODO, FIXME 등을 배치치)
    LINK - 편집기 내에서 열 수 있는 파일 연결

## 테스트

### `Vitest`

    단위 및 통합 테스트

### `Testing Library`

    컴포넌트 테스트, 사용자의 관점에서 UI 구성 요소를 테스트

### `PlayWright `

    종단 간 테스트, Chromium, Firefox, WebKit 전반에서 클릭, 폼 제출, 내비게이션 등 실제 브라우저 사용을 시뮬레이션

### `MSW`

    테스트 및 개발에서 API 호출을 모의 기능으로 활용, 프론트엔드 동작을 불안정하거나 사용 불가능한 백엔드 서비스와 분리
