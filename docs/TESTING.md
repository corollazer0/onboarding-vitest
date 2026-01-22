# 테스트 가이드

## 목표
- 테스트는 읽기 쉽고 안정적이며 행위 중심으로 작성한다.
- 구현 세부보다 공개된 동작을 우선한다.
- Arrange-Act-Assert 구조를 지킨다.

## 구조
- `tests/unit/`: 단위 테스트와 컴포넌트 테스트.
- `tests/integration/`: 모듈 간 흐름 테스트(API + 스토어 + 라우터).
- `tests/helpers/`: 공통 테스트 유틸리티.
- `tests/mocks/`: MSW 핸들러와 서버 셋업.
- `tests/setup.js`: 전역 테스트 셋업(Pinia, MSW, Vue Test Utils).

## 네이밍
- 테스트 파일은 `*.spec.js`로 작성한다.
- `describe`는 테스트 대상(컴포넌트/모듈) 이름을 사용한다.
- `it`은 행위 문장으로 작성한다.

## 테스트 환경 선택 가이드
- 기본 환경은 `jsdom`이며 UI/컴포넌트 테스트에 적합하다.
- `happy-dom`은 가볍고 빠른 DOM 구현이며, 실제 `localStorage`를 제공한다.
- DOM이 필요 없는 로직은 `// @vitest-environment node`를 사용한다.

### 선택 기준
- Vue 컴포넌트 렌더링/이벤트 중심 테스트: `jsdom`
- 간단한 DOM 동작 확인, 속도 우선 테스트: `happy-dom`
- DOM이 전혀 필요 없는 모듈 테스트: `node`

### 테스트 위치
- happy-dom 전용 테스트는 `tests/happy-dom/`에 둔다.

## 셋업과 헬퍼
- `tests/setup.js`에서 공통 셋업을 수행하고, 테스트마다 Pinia를 초기화한다.
- 헬퍼는 `tests/helpers/`에 위치한다.
  - `createWrapper`: Vue 컴포넌트 mount 공통화
  - `createTestPinia`: 테스트용 Pinia 인스턴스 생성 및 활성화
  - `loadApiClient`: 모듈 캐시를 초기화한 뒤 api/client 재로드
  - `createLocalStorage`: Node 환경용 localStorage 스텁

## 모킹 규칙
- API 통합 테스트는 MSW 사용을 우선한다.
- `location`, `localStorage` 등 전역 객체는 `vi.stubGlobal`로 모킹하고
  `afterEach`에서 `vi.unstubAllGlobals`로 정리한다.
- 임시 테스트나 불완전한 케이스는 `TODO`로 개선점을 남긴다.

## 테스트 패턴
- 테스트 하나에 하나의 행위를 검증한다.
- 동적 UI에 대한 스냅샷 테스트는 필요할 때만 사용한다.
- Vue 업데이트가 필요한 경우 `await`를 사용한다.

## 스모크 체크
- 스모크 체크는 환경 설정이 정상인지 빠르게 검증하는 최소 테스트다.
- 이 프로젝트에서는 jsdom/happy-dom 환경이 모두 실행되는지 확인한다.

## 명령어
- `npm run test`: jsdom 기준 전체 테스트 실행
- `npm run test:jsdom`: jsdom 환경 테스트 실행
- `npm run test:happy-dom`: happy-dom 환경 테스트 실행
- `npm run test:smoke`: jsdom + happy-dom 스모크 체크
- `npm run test:watch`: watch 모드
- `npm run test:ui`: Vitest UI
- `npm run test:coverage`: 커버리지 리포트 생성

## 체크리스트 (커밋 기준)
- 테스트가 로컬에서 통과하는가?
- 새로 만든 spec 파일이 최소 1회 실행되었는가?
- 모킹과 전역 객체가 테스트 사이에서 정리되는가?
