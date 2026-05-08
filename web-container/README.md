# Web-Container Master

Mirco Frontend 방식으로 구성된 단위 어플리케이션을 통하여 서비스 하기 위한 웹 컨테이너 입니다.

## 폴더 구조

### `config`

    - webpack, typescript 등의 config 파일들이 저장되는 폴더

### `dist`

    - webpack 빌드 결과가 저장되는 폴더

### `public`

    - index.html과 같은 정적 파일들이 저장되는 폴더
    - 컴파일이 필요 없는 파일들이 위치하는 폴더

### `src\app`

    - 전체 app 의 로직이 초기화 되는 곳으로, app 의 entry point 역할.
        1. 사용 가능 : shared, entities, features, widgets, pages
        2. index.ts 파일에서 외부에서 사용하는 기능들만 export
        3. 프로바이더, 라우터, 전역 스타일, 타입 등

#### `src\entities`

    - 도메인 모델(데이터 영역)과 관련된 모든 것을 저장. (도메인 모델, 상태 관리, API 통신 등)
        1. 사용 가능 : shared
        2. index.ts 파일에서 외부에서 사용하는 기능들만 export
        3. API 모듈, 상태 관리, 타입 정의

### `src\features`

    - 특정 기능을 구현하는데 필요한 모든 것을 저장. (독립적인 비즈니스 로직과 UI 포함)
        1. 사용 가능 : shared, entities
        2. index.ts 파일에서 외부에서 사용하는 기능들만 export
        3. API 통신 모듈, 상태 관리, 타입 정의, UI 컴포넌트, 유틸리티 함수, 기타 필요한 리소스 등

### `src\pages`

    - 라우트 구조에서 사용하는 app 페이지를 저장.
        1. 사용 가능 : shared, entities, features, widgets
        2. index.ts 파일에서 외부에서 사용하는 기능들만 export
        3. ui(전용 하위 컴포넌트들), hooks(전용 커스텀 훅), 기타 필요한 리소스(css 등) 등

### `src\shared`

    - 특정한 비즈니스 로직에 종속되지 않고 재사용 가능한 컴포넌트와 유틸리티들을 저장
        1. 사용 가능 : 없음
        2. index.ts 파일에서 외부에서 사용하는 컴포넌트들만 export
        3. 커스텀 훅, 스타일 파일, 타입 정의, 컴포넌트 (Button, Input 등), 유틸리티 함수

### `src\widgets`

    - 재사용 가능한 UI 구성 요소를 저장. (페이지에서 사용하는 재사용 가능한 구성 요소)
        1. 사용 가능 : shared, entities, features
        2. index.ts 파일에서 외부에서 사용하는 컴포넌트들만 export
        3. 컴포넌트, 스타일, 전용 라이브리리(util) 등

## VSCode 확장 기능 설치

    - ESLint
    - Prettier - Code formatter
    - PostCSS Language Support
    - Tailwind CSS IntelliSense
    - Tailwind Twin IntelliSense
    - Tailwind Fold

## 실행 전 확인

소스를 다운로드 후에 최초 실행 전에 아래 항목을 확인하세요.

### `node -v`

node.js 의 설치 여부를 확인하고, 필요하면 설치 하세요.\
node.js 설치 시에는 최신 버전을 설치하시면 됩니다.

### `npm -v`

npm 의 설치 여부를 확인하고, 필요하면 설치 하세요.\
npm 설치 시에는 최신 버전을 설치하시면 됩니다.

### `yarn -v`

yarn 의 설치 여부를 확인하고, 필요하면 설치 하세요.\
yarn 설치 시에는 최신 버전을 설치하시면 됩니다.

### `yarn install`

package.json 파일에 등록된 모든 종속성을 설치 합니다.\
yarn.lock 파일이 존재하고, package.json 파일에 등록된 모든 종속성을 충족한다면\
정확한 버전이 yarn.lock 파일에 기록되고, yarn.lock 파일은 변경되지 않습니다다.

## 실행 (개발)

### `단위 어플리케이션 모두두 실행`

통합할 단위 어플리케이션을 모두 webpack 개발 서버에서 실행합니다.\
실행될 때에는 webpack.config.common.js + webpack.config.dev.js 를 사용합니다.

### `yarn start`

웹 컨테이너 어플리케이션을 운영 환경과 유사한 webpack 개발 서버에서 실행 합합니다.\
실행될 때에는 webpack.config.common.js + webpack.config.dev.js 를 사용합니다.

## 실행 (운영)

### `단위 어플리케이션 모두 실행`

통합할 단위 어플리케이션을 모두 실행합니다.\
실행될 때에는 webpack.config.common.js + webpack.config.prod.js 를 사용합니다.

### `단위 어플리케이션 모두 실행`

통합할 단위 어플리케이션을 모두 실행합니다.\
실행될 때에는 webpack.config.common.js + webpack.config.prod.js 를 사용합니다.
