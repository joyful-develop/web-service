# Web-Container

Mirco Frontend 방식으로 구성된 단위 어플리케이션을 통하여 서비스 하기 위한 웹 컨테이너 입니다.

## VSCode 확장 기능 설치

    ESLint
    Prettier - Code formatter
    PostCSS Language Support
    Tailwind CSS IntelliSense
    Tailwind Twin IntelliSense
    Tailwind Fold

## 실행 전 확인 및 설치

소스를 다운로드 후에 최초 실행 전에 아래 항목을 확인하세요.

### `node -v`

    node.js 의 설치 여부를 확인하고, 필요하면 설치 하세요.\
    node.js 버전은 v24.15.0 이상 설치하시면 됩니다. (https://nodejs.org/ko/download)

### `pnpm -v`

    pnpm 의 설치 여부를 확인하고, 필요하면 설치 하세요.\
    pnpm 버전은 11.0.9 이상 설치하시면 됩니다. (npm install -g pnpm)

### `pnpm install`

    package.json 파일에 등록된 모든 종속성을 설치 합니다.\
    pnpm.lock 파일이 존재하고, package.json 파일에 등록된 모든 종속성을 충족한다면\
    정확한 버전이 pnpm.lock 파일에 기록되고, pnpm.lock 파일은 변경되지 않습니다다.

## 실행 (개발)

### `pnpm run lint`

    ESLint(린터)를 실행 합니다.

### `pnpm run lint:fix`

    ESLint(린터)를 실행하고, 자동으로 수정 가능한 코드 스타일 오류나 잠재적 에러를 수정(fix) 합니다.

### `pnpm run format`

    프로젝트 내에서 정의된 코드 스타일 포맷팅(Formatting) 스크립트를 실행 합니다.

### `pnpm run dev`

    .env/.env.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm run build`

    .env/.env.local 환경 파일을 적용하여여 프로젝트의 소스 코드를\
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm run preview`

    .env/.env.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm run dev:stg`

    .env.stg/.env.stg.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm run build:stg`

    .env.stg/.env.stg.local 환경 파일을 적용하여 프로젝트의 소스 코드를\
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm run preview:stg`

    .env.stg/.env.stg.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm run dev:prd`

    .env.prd/.env.prd.local 환경 파일을 적용한 개발용 서버(Development Server)를 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

### `pnpm run build:prd`

    .env.prd/.env.prd.local 환경 파일을 적용하여 프로젝트의 소스 코드를\
    실제 서비스 환경(Production)에서 실행 가능한 최적화된 파일(JS, CSS, HTML)로 변환 합니다.

### `pnpm run preview:prd`

    .env.prd/.env.prd.local 환경 파일을 적용하여 빌드된 프로젝트(프로덕션 환경)를 로컬에서 미리 실행 합니다.\
    코드를 실시간으로 반영하는 핫 리로딩(Hot Reloading) 기능을 제공 됩니다.

## 폴더 구조

### `config`

    환경 변수 파일 등의 config 파일들이 저장되는 폴더

### `dist`

    빌드 결과가 저장되는 폴더

### `public`

    index.html과 같은 정적 파일들이 저장되는 폴더
    컴파일이 필요 없는 파일들이 위치하는 폴더

### `src\assets`

    정적 파일 모음 폴더 (이미지 파일, 아이콘 파일, 폰트 파일, CSS 또는 SCSS 등 스타일 파일)

#### `src\components`

    공통 컴포넌트 폴더

### `src\hooks`

    커스텀 훅 폴더

### `src\pages`

    페이지별 폴더 (Dashboard, Setting 등)

### `src\store`

    전역 상태 관리 폴더

### `src\types`

    타입 관련 파일들을 모아둔 폴더

### `src\utils`

    공통 유틸리티 함수 폴더

### `types`

    타입 관련 파일들을 모아둔 폴더
