# AGENTS.md

이 프로젝트는 Notion을 CMS로 사용하는 Nobelium 템플릿 기반의 개인 블로그
JavaScript, Next.js 14 (Pages Router), Tailwind CSS, Notion 콘텐츠 렌더링을 위한 `react-notion-x` 사용

## 빌드 / 린트 / 개발

- 패키지 매니저: pnpm v10.28.2

```sh
pnpm install          # 의존성 설치
pnpm dev              # 개발 서버 시작 (next dev)
pnpm build            # 프로덕션 빌드 (next build) + sitemap 생성(postbuild)
pnpm lint             # ESLint 검사 (next lint)
```

## 프로젝트 구조

```
pages/            Next.js Pages Router (SSG/ISR 페이지, API 라우트)
components/       React 컴포넌트 (Header, Footer, BlogPost, Post 등)
lib/              유틸리티, Notion API 클라이언트, React 컨텍스트
lib/notion/       Notion 데이터 페칭 (getAllPosts, getPageProperties 등)
lib/server/       서버 전용 코드 (config 로더, Notion API 인스턴스)
layouts/          페이지 레이아웃 컴포넌트 (search)
assets/i18n/      국제화(JSON) 리소스
styles/           전역 CSS 및 Notion 전용 스타일 오버라이드
public/           정적 자산 (파비콘, 폰트)
patches/          pnpm 패치 파일 (react-notion-x, notion-utils)
```

## 아키텍처

- **프레임워크**: Next.js 14 (Pages Router, App Router 미사용)
- **렌더링**: 대부분 페이지에서 ISR (`revalidate: 1`) 사용, 검색 페이지는 SSG
- **CMS**: Notion을 헤드리스 CMS로 사용 (`notion-client`, `react-notion-x`)
- **스타일링**: Tailwind CSS v3 유틸리티 + 전역 CSS 오버라이드
- **다크 모드**: 클래스 기반 (`darkMode: 'class'` — `tailwind.config.js`)
- **상태 관리**: React Context (`useConfig`, `useLocale`, `useTheme`)
- **배포**: Vercel (`vercel.json`에 URL/폰트 캐시 설정)

### 주요 설정 파일

- `blog.config.js` — 블로그 메타데이터, 외형, 통합(Notion, 애널리틱스, 댓글)
- `next.config.js` — Next.js 설정 (이미지 도메인, transpilePackages 등)
- `tailwind.config.js` — Tailwind 확장 (색상, 폰트 패밀리)
- `consts.js` — 폰트 스택 상수 (`FONTS_SANS`, `FONTS_SERIF`)

### 환경 변수

- `NOTION_PAGE_ID` — Notion 데이터베이스 페이지 ID (필수)
- `NOTION_ACCESS_TOKEN` — Notion API 토큰 (선택, 비공개 페이지 접근 시 필요)
- 로컬 환경에서는 `.env.local`에서 로드되며, 배포 환경에서는 vercel 환경변수로 관리됨

## 코드 스타일

### 형식화(포맷)

- **2칸 들여쓰기** (`.editorconfig`로 관리)
- **작은따옴표** 사용 (문자열, import 등)
- **세미콜론 없음** 문장 끝에 세미콜론을 사용하지 않음
- **후행 쉼표 없음**
- **LF 줄바꿈** (`.editorconfig`로 관리)
- **UTF-8 인코딩**, 라인 끝 공백 제거, 파일 말미에 개행 삽입
- Prettier는 설정되어 있지 않음, 포맷은 EditorConfig + ESLint 규칙에 의존함

### import 사용 규칙

- 프로젝트 내부 모듈은 `@/` 별칭 사용 (예: `@/components/Header`, `@/lib/config`)
    - 별칭은 `jsconfig.json`에 정의되어 있음
- 동일 `lib/notion/` 디렉터리 내부에서는 상대경로(`./`) 사용
- 권장 import 순서(프로젝트 관습):
    1. 프로젝트 내부 import (`@/lib/...`, `@/components/...`)
    2. 서드파티 import (`next/...`, `react`, `notion-utils` 등)
    3. 상대경로 import (`./...`)
- import 순서는 ESLint 규칙으로 엄격히 강제되지는 않음, 수정하는 파일의 기존 패턴 따름.

### 모듈 시스템

- 애플리케이션 코드(컴포넌트, 페이지, lib)는 **ES 모듈**(`import`/`export`) 사용함.
- 설정 파일(예: `next.config.js`, `postcss.config.js`, `consts.js`, `blog.config.js`)은 CommonJS(`module.exports`/`require`)
  사용함.

### React 컴포넌트 관례

- **함수 컴포넌트만** 사용함 (클래스 컴포넌트 금지).
- 화살표 함수와 `function` 선언 둘 다 사용하므로 파일 내 기존 패턴 따름.
- 기존에 PropTypes를 사용하는 파일에 새 props를 추가할 경우 PropTypes도 함께 추가함(모든 컴포넌트에서 필수 아님).
- 컴포넌트는 파일 하단에서 `export default` 하거나 선언부에서 `export default function` 사용함.
- 무거운 블록은 `next/dynamic`으로 지연 로드함 (코드 블록, 머메이드, PDF 뷰어 등).
- 조건부 클래스 조합에는 `classnames`를 `cn`으로 임포트해 사용함.

### 명명 규칙

- 컴포넌트: PascalCase 파일명/컴포넌트명 (예: `BlogPost.js`)
- 유틸/라이브러리: camelCase 파일명 (예: `getAllPosts.js`)
- 설정 파일: kebab-case 또는 dot-notation (`blog.config.js` 등)
- 상수: UPPER_SNAKE_CASE (`FONTS_SANS`, `FONTS_SERIF`)
- React 컨텍스트 훅: `useX` 패턴 (`useConfig()`, `useTheme()`)
- 서버 측에서 불러온 블로그 설정은 `BLOG`로 사용되는 관습 있음

### 에러 처리

- 코드베이스 전반에 걸쳐 명시적 에러 처리(`try/catch`)는 최소화되어 있음.
- Notion API 호출 에러는 대부분 잡지 않고 Next.js의 에러 경계나 빌드 실패로 전달됨.
- 간단한 진단 메시지는 `console.log`로 남기는 관습 있음.
- Notion 응답과 같이 불확실한 값에는 옵셔널 체이닝(`?.`)과 널 병합 연산자(`??`) 사용해 안전하게 접근함.

### CSS / 스타일링

- JSX 내부에는 Tailwind 유틸리티 클래스를 우선 사용함.
- 전역 스타일은 `styles/globals.css`에 두며 `@tailwind` 지시문과 `@font-face` 선언 포함함.
- Notion 블록 전용 스타일은 `styles/notion.css`에서 오버라이드함.
- 다크 모드는 Tailwind의 `dark:` 변형 사용해 구현함.

### 데이터 페칭

- Notion 기반 콘텐츠는 `getStaticProps`와 ISR(`revalidate: 1`)로 제공함.
- 동적 경로는 `getStaticPaths`와 `fallback: true` 사용함.
- Notion 데이터 관련 유틸은 `lib/notion/` 하위에 모아져 있음.

## 린팅

ESLint는 `next/core-web-vitals` 확장만 사용함 (`.eslintrc.json`). 추가 룰이나
플러그인 없음. 린트 실행은 `pnpm lint`임.

## 패치된 의존성

`patches/` 디렉터리에 pnpm 패치가 포함되어 있음:

- `react-notion-x@6.16.0.patch`
- `notion-utils@6.16.0.patch`

패키지를 업그레이드할 때 패치가 깨질 수 있으므로 주의 필요.

## 주석 / 국제화

- 코드 주석은 한국어로 작성
- UI 문자열 국제화는 `assets/i18n/`에 위치한 JSON 파일을 사용
- 기본 로케일은 `ko-KR`이며 타임존은 `Asia/Seoul` 임
