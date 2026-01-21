# Vitest 적용 계획서

## 문서 정보

| 항목 | 내용 |
|------|------|
| 프로젝트 | Vue3 + Vite v5 웹앱 테스트 환경 구축 |
| 기간 | 5개월 (상반기) |
| 목표 | TDD 문화 정착 + 테스트 자산화 |

---

## 1. 현황 분석

### 1.1 팀 역량 현황

| 구분 | 인원 | Vue 경험 | Vitest 경험 |
|------|------|----------|-------------|
| 리드 (본인) | 1명 | ✅ 숙련 | ❌ 없음 |
| 시니어 | 1명 | ✅ 숙련 | ❌ 없음 |
| 주니어 | 3명 | ❌ 없음 | ❌ 없음 |

### 1.2 기술 스택 현황

| 기술 | 현재 버전 | 테스트 도입 필요성 |
|------|----------|-------------------|
| Vue 3 | 3.5.x | 컴포넌트 테스트 필수 |
| Vite | 5.3.x | Vitest와 네이티브 통합 |
| Pinia | 2.1.x | 상태 관리 로직 검증 |
| Vue Router | 4.4.x | 라우팅 로직 검증 |
| Axios | 1.7.x | API 통신 검증 |

---

## 2. 도입 목표

### 2.1 정량적 목표

| 지표 | 목표값 | 측정 방법 |
|------|--------|----------|
| 테스트 커버리지 | 80% 이상 | Vitest coverage report |
| 핵심 로직 커버리지 | 90% 이상 | stores, utils, api |
| CI 테스트 시간 | 5분 이내 | GitHub Actions |
| 테스트 케이스 수 | 200+ | 테스트 파일 집계 |

### 2.2 정성적 목표

- 팀원 전원 Vitest 테스트 코드 작성 능력 확보
- TDD 개발 사이클 (Red → Green → Refactor) 이해
- 버그 재발 방지를 위한 회귀 테스트 문화 정착
- 리팩토링에 대한 자신감 확보

---

## 3. 단계별 적용 계획

### 3.1 Phase 1: 환경 구축 (Week 1-2)

#### 목표
Vitest가 정상 동작하는 개발 환경 구성

#### 작업 내용

| 작업 | 상세 내용 | 담당 | 산출물 |
|------|----------|------|--------|
| Vitest 설치 | 패키지 설치 및 의존성 정리 | 리드 | package.json |
| 설정 파일 작성 | vitest.config.js 작성 | 리드 | vitest.config.js |
| 테스트 셋업 | 전역 설정, 모킹 기본 | 리드 | tests/setup.js |
| VS Code 연동 | Vitest 확장 설치, 설정 | 전원 | .vscode/settings.json |
| 문서화 | 환경 구축 가이드 | 리드 | TESTING_SETUP.md |

#### vitest.config.js 표준 설정

```javascript
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: ['./tests/setup.js'],
      include: ['tests/**/*.spec.js', 'src/**/*.spec.js'],
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'lcov'],
        include: ['src/**/*.{js,vue}'],
        exclude: [
          'src/main.js',
          'src/**/*.spec.js',
          'src/**/__mocks__/**',
          'src/assets/**'
        ],
        thresholds: {
          global: {
            branches: 80,
            functions: 80,
            lines: 80,
            statements: 80
          }
        }
      }
      // 참고: alias는 viteConfig에서 자동 상속됨 (mergeConfig 사용 시)
    }
  })
)
```

#### 체크리스트

- [ ] `npm run test` 명령 정상 동작
- [ ] `npm run test:coverage` 리포트 생성
- [ ] VS Code에서 테스트 탐색기 연동
- [ ] 예제 테스트 파일 1개 이상 통과

---

### 3.2 Phase 2: 단위 테스트 기초 (Week 3-6)

#### 목표
핵심 로직에 대한 단위 테스트 작성 능력 확보

#### 테스트 대상 우선순위

| 순위 | 대상 | 이유 | 목표 커버리지 |
|------|------|------|--------------|
| 1 | 유틸리티 함수 | 가장 쉬움, 성공 경험 | 95% |
| 2 | Pinia 스토어 | 핵심 비즈니스 로직 | 90% |
| 3 | 순수 함수형 Composables | 재사용 로직 | 85% |

#### 작업 내용

```
Week 3-4: 유틸리티 함수 테스트
├── helpers.js 함수별 테스트
├── validators.js 함수별 테스트
└── formatters.js 함수별 테스트

Week 5-6: Pinia 스토어 테스트
├── state 초기화 테스트
├── getters 로직 테스트
└── actions (동기/비동기) 테스트
```

#### 테스트 작성 표준

```javascript
// 파일 구조: tests/unit/[경로]/[파일명].spec.js

// 예: tests/unit/stores/task.spec.js
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/task'

describe('Task Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
  })

  describe('State', () => {
    it('초기 상태가 올바르게 설정되어야 한다', () => {
      expect(store.tasks).toEqual([])
      expect(store.isLoading).toBe(false)
    })
  })

  describe('Getters', () => {
    // ...
  })

  describe('Actions', () => {
    // ...
  })
})
```

---

### 3.3 Phase 3: 컴포넌트 테스트 (Week 7-10)

#### 목표
Vue 컴포넌트 테스트 패턴 습득

#### 테스트 대상 우선순위

| 순위 | 대상 | 이유 | 목표 커버리지 |
|------|------|------|--------------|
| 1 | Base 컴포넌트 | 재사용 빈도 높음 | 90% |
| 2 | Form 컴포넌트 | 사용자 입력 처리 | 85% |
| 3 | 비즈니스 컴포넌트 | 핵심 기능 | 80% |

#### 컴포넌트 테스트 체크리스트

```
각 컴포넌트별 필수 테스트:
□ Props 기본값 확인
□ Props 타입 검증 (필요시)
□ 이벤트 emit 확인
□ 슬롯 렌더링 확인 (해당시)
□ 조건부 렌더링 확인
□ 사용자 인터랙션 테스트
```

#### @vue/test-utils 핵심 API

```javascript
import { mount, shallowMount } from '@vue/test-utils'

// 기본 마운트
const wrapper = mount(Component, {
  props: { /* props */ },
  slots: { default: '<span>Slot Content</span>' },
  global: {
    plugins: [pinia, router],
    stubs: { ChildComponent: true },
    mocks: { $route: mockRoute }
  }
})

// 주요 assertion
expect(wrapper.text()).toContain('expected text')
expect(wrapper.find('.class').exists()).toBe(true)
expect(wrapper.findComponent(ChildComponent).exists()).toBe(true)
expect(wrapper.emitted('eventName')).toHaveLength(1)

// 인터랙션
await wrapper.find('button').trigger('click')
await wrapper.find('input').setValue('new value')
await wrapper.vm.$nextTick()
```

---

### 3.4 Phase 4: 통합 테스트 (Week 11-14)

#### 목표
여러 모듈이 함께 동작하는 시나리오 검증

#### 테스트 시나리오

| 시나리오 | 관련 모듈 | 검증 내용 |
|----------|----------|----------|
| 로그인 플로우 | Router + Store + API | 인증 → 리다이렉트 → 상태 변경 |
| 데이터 CRUD | Component + Store + API | UI 조작 → API 호출 → 상태 반영 |
| 에러 핸들링 | API + Store + Component | 에러 발생 → 상태 변경 → UI 피드백 |

#### MSW 통합

```javascript
// tests/mocks/server.js
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

export const server = setupServer(...handlers)

// tests/setup.js
import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

### 3.5 Phase 5: 자동화 및 자산화 (Week 15-20)

#### 목표
테스트 자동화 파이프라인 구축 및 팀 자산화

#### CI/CD 연동

```yaml
# .github/workflows/test.yml
name: Test

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
      
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below threshold 80%"
            exit 1
          fi
```

#### 테스트 자산 목록

| 자산 | 내용 | 형태 |
|------|------|------|
| 테스트 템플릿 | 각 유형별 테스트 보일러플레이트 | 파일 템플릿 |
| 테스트 헬퍼 | 공통 테스트 유틸리티 | tests/helpers/ |
| 목 데이터 | 표준 테스트 데이터 | tests/fixtures/ |
| 테스트 가이드 | 팀 테스트 작성 가이드 | docs/TESTING.md |
| AI 프롬프트 | 테스트 생성용 프롬프트 | docs/PROMPTS.md |

---

## 4. 고효용 테스트 케이스 발굴

### 4.1 ROI 높은 테스트 대상

```
투자 대비 효과가 높은 테스트 순위:

1위: 유틸리티/헬퍼 함수 (90% 이상 커버 권장)
    - 작성 쉬움, 유지보수 쉬움
    - 다양한 곳에서 재사용되어 영향도 높음

2위: Pinia 스토어 Actions (85% 이상 커버 권장)
    - 비즈니스 로직의 핵심
    - 버그 발생 시 영향 범위 넓음

3위: API 통신 레이어 (80% 이상 커버 권장)
    - 외부 시스템과의 계약 검증
    - 에러 핸들링 시나리오 중요

4위: 공통 UI 컴포넌트 (80% 이상 커버 권장)
    - 재사용 빈도 높음
    - 회귀 버그 방지 효과 큼

5위: Router Guards (필수 시나리오만)
    - 보안/권한 관련 중요 로직
    - 실패 시 심각한 문제 발생
```

### 4.2 테스트 작성 우선순위 매트릭스

```
                    버그 발생 확률 높음
                           ▲
                           │
    ┌──────────────────────┼──────────────────────┐
    │                      │                      │
    │   우선순위: 중       │   우선순위: 최상    │
    │   - Form 컴포넌트    │   - 인증 로직       │
    │   - 날짜 처리        │   - 결제 로직       │
    │                      │   - API 에러 처리   │
    │                      │                      │
────┼──────────────────────┼──────────────────────┼──── 영향 범위 넓음
    │                      │                      │
    │   우선순위: 낮       │   우선순위: 높      │
    │   - 스타일 변형      │   - 유틸리티 함수   │
    │   - 정적 컴포넌트    │   - 스토어 로직     │
    │                      │   - 공통 컴포넌트   │
    │                      │                      │
    └──────────────────────┼──────────────────────┘
                           │
                           ▼
                    버그 발생 확률 낮음
```

### 4.3 Vue/Vite 환경 특화 테스트 케이스

#### 권장 테스트 패턴

| 패턴 | 대상 | 효용 |
|------|------|------|
| Props Validation | 모든 컴포넌트 | 타입 안정성 확보 |
| Emit Testing | 이벤트 발생 컴포넌트 | 부모-자식 통신 검증 |
| v-model Testing | 폼 컴포넌트 | 양방향 바인딩 검증 |
| Slot Rendering | 레이아웃 컴포넌트 | 컴포지션 검증 |
| Async Action Testing | Pinia 스토어 | 비동기 로직 검증 |
| Route Guard Testing | 보호된 라우트 | 접근 제어 검증 |
| Interceptor Testing | Axios | 요청/응답 전처리 검증 |

#### 피해야 할 테스트 패턴

| 패턴 | 이유 | 대안 |
|------|------|------|
| 스타일 테스트 | 변경 잦음, 유지보수 어려움 | Visual Regression 도구 |
| 구현 상세 테스트 | 리팩토링 시 깨짐 | 행위 기반 테스트 |
| 과도한 스냅샷 | 의미 없는 변경 많음 | 선별적 사용 |
| 100% 커버리지 추구 | ROI 낮음 | 80% 타겟 |

---

## 5. 리스크 관리

### 5.1 예상 리스크 및 대응

| 리스크 | 영향 | 확률 | 대응 방안 |
|--------|------|------|----------|
| 학습 곡선 | 일정 지연 | 높음 | AI 활용, 페어 프로그래밍 |
| 테스트 유지보수 부담 | 생산성 저하 | 중간 | 테스트 리팩토링 주기 설정 |
| 기존 코드 테스트 어려움 | 커버리지 미달 | 높음 | 테스트 가능한 구조로 점진적 리팩토링 |
| 팀원 동기 저하 | 참여도 감소 | 중간 | 작은 성취 경험, 가시적 성과 공유 |

### 5.2 마일스톤별 검증 기준

| 마일스톤 | 기간 | 검증 기준 | 실패 시 대응 |
|----------|------|----------|-------------|
| 환경 구축 | Week 2 | 테스트 실행 성공 | 외부 지원 요청 |
| 기초 테스트 | Week 6 | 커버리지 50% | 범위 축소, 일정 조정 |
| 컴포넌트 테스트 | Week 10 | 커버리지 70% | 우선순위 재조정 |
| 통합 테스트 | Week 14 | 핵심 시나리오 통과 | 범위 축소 |
| 자동화 완료 | Week 20 | CI/CD 동작 | 수동 프로세스 유지 |

---

## 6. 팀 역할 분담

### 6.1 역할 정의

| 역할 | 담당자 | 책임 |
|------|--------|------|
| 테스트 아키텍트 | 리드 | 전략 수립, 표준 정의, 리뷰 |
| 테스트 멘토 | 시니어 | 주니어 지도, 코드 리뷰 |
| 테스트 작성자 | 전원 | 테스트 코드 작성 |

### 6.2 온보딩 지원 체계

```
Week 1-2: 전체 세션
├── Vue3 기초 워크샵 (리드 주도)
└── Vitest 기초 워크샵 (리드 주도)

Week 3-6: 페어 프로그래밍
├── 시니어 + 주니어 A
├── 리드 + 주니어 B
└── 순환 페어링

Week 7-10: 점진적 독립
├── 주간 코드 리뷰 세션
└── 슬랙 채널 질의응답

Week 11-20: 자율 + 리뷰
├── PR 기반 코드 리뷰
└── 월간 회고
```

---

## 7. 성과 측정

### 7.1 주간 체크 항목

- [ ] 신규 테스트 케이스 수
- [ ] 커버리지 변화율
- [ ] 테스트 실행 시간
- [ ] 테스트 실패율

### 7.2 월간 리포트 항목

| 항목 | 측정 방법 |
|------|----------|
| 테스트 커버리지 추이 | coverage-summary.json |
| 버그 감소율 | 이슈 트래커 |
| 테스트 작성 속도 | 커밋 분석 |
| 팀 만족도 | 설문 조사 |

### 7.3 최종 성과 지표

```
목표 달성 기준:

✅ 커버리지 80% 이상
✅ 핵심 로직 테스트 100% 완료
✅ CI/CD 파이프라인 동작
✅ 팀원 전원 테스트 작성 가능
✅ 테스트 가이드 문서화 완료
```

---

## 부록: 참고 자료

### 공식 문서

| 주제 | 링크 |
|------|------|
| Vitest | https://vitest.dev/ |
| Vue Test Utils | https://test-utils.vuejs.org/ |
| Pinia Testing | https://pinia.vuejs.org/cookbook/testing.html |
| MSW | https://mswjs.io/ |

### 추천 학습 자료

| 자료 | 유형 | 대상 |
|------|------|------|
| Vue Mastery Testing Course | 영상 | 전체 |
| Testing Vue.js Components with Jest | 책 | 심화 |
| Vitest GitHub Examples | 코드 | 실습 |
