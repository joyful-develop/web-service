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
    Auto Import - ES6, TS, JSX, TSX

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

유지보수와 확장성을 고려해 기능(Feature) 또는 도메인 단위로 폴더를 구성

### `config`

    환경 변수 파일 등의 config 파일들이 저장되는 폴더

### `dist`

    빌드 결과가 저장되는 폴더

### `src\assets`

    이미지, 폰트, 아이콘 등의 정적 파일

    1. import 가능한 폴더 :

#### `src\components`

    전역 공용 UI 컴포넌트

    1. import 가능한 폴더 : assets, hooks, services, store, styles, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

#### `src\features`

    기능(도메인)별 전용 컴포넌트, 커스텀 훅, API 호출/비즈니스 로직, TypeScript 인터페이스, Vitest 테스트 파일  등을 저장

    1. import 가능한 폴더 : assets, components, hooks, services, store, styles, types, utils
    2. 기능 / 도메인 별 (권한, 사용자) components, hooks, services, types, tests 폴더 포함
    3. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\hooks`

    전역 공통 커스텀 훅

    1. import 가능한 폴더 : assets, services, store, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\layouts`

    페이지 공통 레이아웃

    1. import 가능한 폴더 : assets, components, features, hooks, services, store, styles, types, utils
    2. header, footer, sideBar, menuBat 등 포함
    3. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\mocks`

    MSW 의 외부 api 역할을 하는 요청 핸들러

### `src\pages`

    라우팅에 대응하는 페이지 단위 컴포넌트

    1. import 가능한 폴더 : assets, components, features, hooks, services, store, styles, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\services`

    전역 공통 외부 API 호출/비즈니스 로직

    1. import 가능한 폴더 : assets, store, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\store`

    전역 상태 관리 (Zustand)

    1. import 가능한 폴더 : assets, types, utils
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\styles`

    Tailwind CSS 전역 설정 파일 또는 전역 CSS

    1. import 가능한 폴더 : assets
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\types`

    전역 TypeScript 인터페이스 및 타입 선언 (*.d.ts)

    1. import 가능한 폴더 :
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

### `src\utils`

    날짜 포맷팅 등 순수 유틸리티 함수

    1. import 가능한 폴더 :
    2. index.ts 파일에서 export 한 기능만 외부에서 import 가능

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

## 개발 시 SSL 적용

## hosts 파일 수정

    127.0.0.1 testDev.joyful.com
    127.0.0.1 testDevLocal.joyful.com
    127.0.0.1 testStg.joyful.com
    127.0.0.1 testStgLocal.joyful.com
    127.0.0.1 test.joyful.com
    127.0.0.1 testLocal.joyful.com

## 명명 규칙

- 일반 폴더/파일: 소문자 카멜케이스 (예: components, hooks, utils, api-client.ts)
- React 컴포넌트: 파스칼케이스 (예: UserProfile.tsx, AuthForm.tsx)
- 라우트 기반 파일/폴더: 소문자 카멜케이스 사용 권장 (예: src/routes/about/index.tsx)

1. 파일 및 폴더 이름
   - 컴포넌트 (Components): PascalCase (UserProfile.tsx, NavigationDrawer.tsx)
   - 기타 파일 (유틸, 타입, 훅 등): kebab-case (api-client.ts, use-auth.ts, types.ts)
   - 폴더 (Directory): kebab-case (components, hooks, store)
   - Entry 포인트: Vite 기본 규칙에 따라 루트 파일은 main.tsx 또는 main.ts를 사용합니다.
2. 컴포넌트 내부 코드
   - 컴포넌트 함수: PascalCase (const UserProfile = () => {...})
   - 일반 변수 및 함수: camelCase (const userId = 123;, const fetchData = () => {...})
   - 상수 (Constants): UPPER_SNAKE_CASE (const MAX_COUNT = 10;)
   - boolean 변수: is, has, should 등의 접두사 사용 (const isVisible = true;)
3. TypeScript 타입 규칙
   - 인터페이스 (Interface): 접두사 I를 붙이지 않는 것이 최근 TypeScript 커뮤니티의 표준입니다. PascalCase만 사용 (interface User { ... })
   - 타입 별칭 (Type Alias): PascalCase (type UserID = string;)
   - 제네릭 (Generics): 의미 있는 단어를 사용하되, 단일 문자가 필요할 땐 T, U, K 순으로 사용 (function identity<T>(arg: T): T)
4. Vite 환경변수
   - 사용자 정의 환경 변수: 반드시 VITE\_ 접두사를 사용해야 합니다 (const apiUrl = import.meta.env.VITE_API_URL;)
   - 변수 명명: UPPER_SNAKE_CASE (VITE_APP_TITLE)

src/
├── app/ # 1. 앱 진입점 및 전역 설정 레이어
│ ├── layouts/ # 공통 레이아웃 관리
│ │ ├── components/ # 레이아웃 독점 UI 부품
│ │ │ ├── Header.tsx # GNB 및 다국어 셀렉터
│ │ │ └── Footer.tsx # 하단 푸터
│ │ └── RootLayout.tsx # 레이아웃 조립 및 다국어 최초 로딩 차단
│ ├── providers/ # 전역 프로바이더
│ │ └── AppProvider.tsx # QueryClient, 전역 상태 관리 컨텍스트 감싸기
│ ├── routes/ # 라우팅 정의
│ │ └── router.tsx # createBrowserRouter 기반 라우터 설정
│ ├── styles/ # 글로벌 스타일
│ │ └── main.css # Tailwind 지시어 및 디자인 토큰
│ ├── App.tsx # Provider + Router 주입
│ └── main.tsx # ReactDOM 초기화 및 MSW 개발용 실행
│
├── features/ # 2. 도메인(기능) 중심 레이어
│ ├── products/ # 예: 상품 기능 모듈
│ │ ├── **tests**/ # 상품 기능 전용 테스트
│ │ │ ├── ProductList.test.tsx
│ │ │ └── useGetProducts.test.ts
│ │ ├── api/ # 상품 전용 React Query 훅
│ │ │ └── useGetProducts.ts
│ │ ├── components/ # 상품 도메인 종속 컴포넌트
│ │ │ ├── ProductCard.tsx
│ │ │ └── ProductList.tsx
│ │ ├── types/ # 상품 도메인 전용 타입
│ │ │ └── product.types.ts
│ │ └── index.ts # 외부 노출용 Public API (ProductListPage 등)
│ └── ...
│
├── shared/ # 3. 앱 전역 공통 자원 레이어
│ ├── components/ # 범용 UI 컴포넌트 (Button, Input, Spinner 등)
│ │ └── Button/
│ │ ├── Button.tsx
│ │ └── Button.test.tsx
│ ├── hooks/ # 순수 유틸 훅 (useDebounce 등)
│ ├── lib/ # 서드파티 라이브러리 커스텀 설정
│ │ ├── axios.ts # Axios 인스턴스 (인터셉터 포함)
│ │ └── queryClient.ts # React Query의 QueryClient 인스턴스
│ ├── utils/ # 순수 헬퍼 함수
│ │ ├── date.ts # 날짜 포맷터
│ │ └── cn.ts # 클래스 병합 유틸 (clsx + tailwind-merge)
│ ├── types/ # 전역 공통 타입
│ │ └── api.types.ts # 공통 API 응답 구조
│ │
│ └── i18n/ # 🌐 [공통 다국어 영역]
│ ├── **tests**/ # 다국어 로직 테스트
│ │ └── useTranslation.test.ts
│ ├── api/ # DB 다국어 호출 함수
│ │ └── fetchTranslations.ts
│ ├── store/ # 언어 상태 관리 Zustand 스토어
│ │ └── useI18nStore.ts
│ ├── hooks/ # 컴포넌트용 t 함수 제공 훅
│ │ └── useTranslation.ts
│ └── types/ # 다국어 전역 타입
│ └── i18n.types.ts
│
└── testing/ # 4. 전역 테스트 및 모킹 인프라 레이어
├── mocks/ # MSW (Mock Service Worker) 관련 설정
│ ├── handlers/ # API 엔드포인트별 가짜 핸들러
│ │ ├── i18nHandlers.ts # DB 다국어 API 모크
│ │ └── productHandlers.ts
│ ├── browser.ts # 로컬 개발 서버용 MSW 구동체
│ ├── server.ts # Vitest 테스트용 MSW 구동체
│ └── index.ts
├── setup.ts # Vitest 환경 전역 실행 전 세팅 리스너
└── test-utils.tsx # React Query + Router가 통합된 customRender
