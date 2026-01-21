# AI 프롬프트 템플릿: Vitest 테스트 코드 생성

## 문서 정보

| 항목 | 내용 |
|------|------|
| 버전 | 1.0.0 |
| 목적 | AI를 활용한 테스트 코드 보일러플레이트 생성 |
| 대상 | Vue3 + Vitest 환경 |

---

## 사용 가이드

### 프롬프트 사용 원칙

1. **컨텍스트 제공**: 실제 코드를 함께 첨부하면 더 정확한 테스트 생성
2. **구체적 요청**: 테스트하고 싶은 시나리오를 명확히 기술
3. **점진적 확장**: 기본 테스트 → 엣지 케이스 → 통합 테스트 순서로 요청
4. **검토 필수**: AI 생성 코드는 반드시 리뷰 후 적용

### 프롬프트 구조

```
[역할 정의]
[컨텍스트/코드]
[요구사항]
[출력 형식]
[제약사항]
```

---

## 1. Vue 컴포넌트 테스트 프롬프트

### 1.1 기본 컴포넌트 테스트

```markdown
## 역할
당신은 Vue3와 Vitest에 전문성을 가진 시니어 프론트엔드 테스트 엔지니어입니다.

## 컨텍스트
다음은 테스트가 필요한 Vue3 컴포넌트입니다:

```vue
[여기에 컴포넌트 코드 붙여넣기]
```

## 요구사항
이 컴포넌트에 대한 단위 테스트를 작성해주세요:

1. **Props 테스트**
   - 각 prop의 기본값 확인
   - prop 타입 검증
   - required prop 누락 시 동작

2. **렌더링 테스트**
   - 기본 렌더링 확인
   - 조건부 렌더링 (v-if, v-show)
   - 리스트 렌더링 (v-for)

3. **이벤트 테스트**
   - emit 이벤트 발생 확인
   - 이벤트 페이로드 검증

4. **슬롯 테스트** (해당되는 경우)
   - default slot
   - named slot

## 출력 형식
- Vitest + @vue/test-utils 사용
- describe/it 구조로 작성
- 각 테스트에 한글 설명 주석 포함
- AAA 패턴 (Arrange-Act-Assert) 적용

## 제약사항
- Composition API 스타일 유지
- 외부 의존성은 모킹 처리
- 테스트 파일명: [ComponentName].spec.js
```

### 1.2 Props/Emit 집중 테스트

```markdown
## 역할
Vue3 컴포넌트의 인터페이스(Props/Emit) 테스트 전문가입니다.

## 컨텍스트
```vue
[컴포넌트 코드]
```

## 요구사항
Props와 Emit에 대한 상세 테스트를 작성해주세요:

### Props 테스트
| Prop명 | 타입 | 기본값 | 테스트 케이스 |
|--------|------|--------|---------------|
| [prop1] | [type] | [default] | 정상값, 경계값, 잘못된 타입 |

### Emit 테스트
| Event명 | Payload | 트리거 조건 |
|---------|---------|-------------|
| [event1] | [type] | [condition] |

## 출력 형식
```javascript
describe('[컴포넌트명] Props', () => {
  describe('prop: [propName]', () => {
    it('기본값이 올바르게 적용되어야 한다', () => {})
    it('[조건]일 때 [동작]해야 한다', () => {})
  })
})

describe('[컴포넌트명] Events', () => {
  describe('emit: [eventName]', () => {
    it('[조건]일 때 이벤트가 발생해야 한다', () => {})
  })
})
```
```

### 1.3 공통 UI 컴포넌트 테스트 (Button, Input, Modal)

```markdown
## 역할
디자인 시스템의 공통 컴포넌트 테스트 전문가입니다.

## 컨텍스트
다음 BaseButton 컴포넌트의 테스트를 작성합니다:

```vue
[BaseButton.vue 코드]
```

## 요구사항
공통 컴포넌트의 핵심 테스트 케이스:

### 접근성 테스트
- ARIA 속성 확인
- 키보드 네비게이션
- disabled 상태의 접근성

### 스타일 변형 테스트
- variant props (primary, secondary, danger 등)
- size props (sm, md, lg)
- 조합 테스트

### 인터랙션 테스트
- 클릭 이벤트
- 더블클릭 방지 (필요시)
- 로딩 상태

## 출력 형식
각 테스트 그룹별로 명확히 분리하여 작성:
- describe('접근성', () => {})
- describe('스타일 변형', () => {})
- describe('인터랙션', () => {})
```

---

## 2. Pinia 스토어 테스트 프롬프트

### 2.1 기본 스토어 테스트

```markdown
## 역할
Pinia 상태관리 테스트 전문가입니다.

## 컨텍스트
```javascript
// stores/task.js
[스토어 코드 붙여넣기]
```

## 요구사항
Pinia 스토어의 전체 테스트를 작성해주세요:

### 1. State 테스트
- 초기 상태 검증
- 상태 타입 확인

### 2. Getters 테스트
| Getter명 | 입력 상태 | 예상 출력 |
|----------|----------|----------|
| [getter1] | [state] | [result] |

### 3. Actions 테스트
| Action명 | 입력 | 예상 결과 | 사이드 이펙트 |
|----------|------|----------|---------------|
| [action1] | [input] | [result] | [side effects] |

### 4. 비동기 Action 테스트
- 성공 케이스
- 실패 케이스 (에러 핸들링)
- 로딩 상태 변화

## 출력 형식
```javascript
import { setActivePinia, createPinia } from 'pinia'
import { useTaskStore } from '@/stores/task'
import { beforeEach, describe, it, expect, vi } from 'vitest'

describe('Task Store', () => {
  let store

  beforeEach(() => {
    setActivePinia(createPinia())
    store = useTaskStore()
  })

  describe('State', () => {})
  describe('Getters', () => {})
  describe('Actions', () => {})
})
```

## 제약사항
- API 호출은 vi.mock으로 모킹
- 각 테스트는 독립적으로 실행 가능해야 함
```

### 2.2 스토어 Actions 심화 테스트

```markdown
## 역할
비동기 상태 관리 테스트 전문가입니다.

## 컨텍스트
```javascript
[스토어의 actions 부분 코드]
```

관련 API 모듈:
```javascript
[API 모듈 코드]
```

## 요구사항
각 Action에 대해 다음 시나리오 테스트:

### fetchTasks Action
1. **성공 케이스**
   - API 호출 확인
   - 응답 데이터가 state에 반영
   - isLoading 상태 변화 (true → false)

2. **실패 케이스**
   - 에러 발생 시 error state 설정
   - isLoading이 false로 복구
   - tasks는 변경되지 않음

3. **엣지 케이스**
   - 빈 배열 응답
   - 중복 호출 처리

## 출력 형식
```javascript
describe('fetchTasks', () => {
  it('성공 시 tasks를 업데이트해야 한다', async () => {
    // Arrange
    vi.mocked(taskApi.getAll).mockResolvedValue({ data: mockTasks })
    
    // Act
    await store.fetchTasks()
    
    // Assert
    expect(store.tasks).toEqual(mockTasks)
    expect(store.isLoading).toBe(false)
  })

  it('실패 시 에러 상태를 설정해야 한다', async () => {
    // ...
  })
})
```
```

---

## 3. Vue Router 테스트 프롬프트

### 3.1 라우트 설정 테스트

```markdown
## 역할
Vue Router 설정 및 네비게이션 테스트 전문가입니다.

## 컨텍스트
```javascript
// router/index.js
[라우터 설정 코드]
```

## 요구사항
라우터 설정에 대한 테스트:

### 1. 라우트 매핑 테스트
| 경로 | 컴포넌트 | name |
|------|----------|------|
| / | HomeView | Home |
| /tasks/:id | TaskDetailView | TaskDetail |

### 2. 동적 라우트 테스트
- 파라미터 추출 확인
- 잘못된 파라미터 처리

### 3. 404 처리 테스트
- 존재하지 않는 경로 접근

## 출력 형식
```javascript
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'

describe('Router', () => {
  let router

  beforeEach(async () => {
    router = createRouter({
      history: createWebHistory(),
      routes: [/* 실제 routes */]
    })
  })

  describe('라우트 매핑', () => {
    it('/ 경로는 HomeView를 렌더링해야 한다', async () => {
      router.push('/')
      await router.isReady()
      expect(router.currentRoute.value.name).toBe('Home')
    })
  })
})
```
```

### 3.2 네비게이션 가드 테스트

```markdown
## 역할
Vue Router 네비게이션 가드 테스트 전문가입니다.

## 컨텍스트
```javascript
// router/guards.js 또는 router/index.js의 가드 부분
[네비게이션 가드 코드]
```

관련 스토어:
```javascript
// stores/user.js
[인증 관련 스토어 코드]
```

## 요구사항
### beforeEach 가드 테스트
1. **인증 필요 페이지**
   - 로그인 상태: 정상 접근
   - 비로그인 상태: 리다이렉트
   - redirect query 파라미터 확인

2. **인증 불필요 페이지**
   - 로그인/비로그인 모두 접근 가능

### beforeEnter 가드 테스트
- 특정 조건 미충족 시 리다이렉트

### afterEach 가드 테스트
- 페이지 타이틀 변경 확인
- 분석 이벤트 발송 (필요시)

## 출력 형식
```javascript
describe('Navigation Guards', () => {
  describe('beforeEach - 인증 체크', () => {
    it('인증 필요 페이지에 비로그인 시 홈으로 리다이렉트', async () => {
      // 스토어 상태 설정 (비로그인)
      // 인증 필요 페이지로 이동 시도
      // 홈으로 리다이렉트 확인
    })
  })
})
```
```

---

## 4. Axios/API 테스트 프롬프트

### 4.1 Axios 인스턴스 테스트

```markdown
## 역할
HTTP 클라이언트 설정 및 인터셉터 테스트 전문가입니다.

## 컨텍스트
```javascript
// api/client.js
[Axios 인스턴스 코드]
```

## 요구사항
### 1. 인스턴스 설정 테스트
- baseURL 설정 확인
- timeout 설정 확인
- 기본 헤더 설정 확인

### 2. 요청 인터셉터 테스트
- 토큰이 있을 때 Authorization 헤더 추가
- 토큰이 없을 때 헤더 없음

### 3. 응답 인터셉터 테스트
| 상태 코드 | 예상 동작 |
|-----------|----------|
| 200 | 정상 응답 반환 |
| 401 | 토큰 삭제, 로그인 페이지 이동 |
| 403 | 에러 로깅 |
| 500 | 서버 에러 메시지 |

### 4. 네트워크 에러 테스트
- 타임아웃
- 네트워크 단절

## 출력 형식
```javascript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import apiClient from '@/api/client'

describe('API Client', () => {
  describe('설정', () => {
    it('baseURL이 환경변수에서 설정되어야 한다', () => {})
  })

  describe('요청 인터셉터', () => {
    it('토큰이 있으면 Authorization 헤더를 추가해야 한다', () => {})
  })

  describe('응답 인터셉터', () => {
    it('401 에러 시 토큰을 삭제하고 로그인으로 리다이렉트', () => {})
  })
})
```

## 제약사항
- MSW 또는 vi.mock을 사용한 API 모킹
- localStorage 모킹 필요
- window.location 모킹 필요
```

### 4.2 API 모듈 테스트 (with MSW)

```markdown
## 역할
MSW를 활용한 API 통합 테스트 전문가입니다.

## 컨텍스트
```javascript
// api/task.api.js
[API 모듈 코드]
```

MSW 핸들러:
```javascript
// tests/mocks/handlers.js
[MSW 핸들러 코드 - 없으면 생성 요청]
```

## 요구사항
각 API 메서드에 대한 통합 테스트:

### CRUD 테스트
| 메서드 | HTTP | 엔드포인트 | 테스트 케이스 |
|--------|------|-----------|--------------|
| getAll | GET | /tasks | 목록 반환, 빈 목록 |
| getById | GET | /tasks/:id | 존재하는 ID, 없는 ID |
| create | POST | /tasks | 생성 성공, 유효성 실패 |
| update | PUT | /tasks/:id | 업데이트 성공 |
| delete | DELETE | /tasks/:id | 삭제 성공 |

## 출력 형식
```javascript
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'
import { taskApi } from '@/api/task.api'

const server = setupServer(/* handlers */)

describe('Task API', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  describe('getAll', () => {
    it('모든 태스크 목록을 반환해야 한다', async () => {
      const result = await taskApi.getAll()
      expect(result.data).toHaveLength(2)
    })
  })
})
```
```

---

## 5. main.js / 초기화 로직 테스트 프롬프트

### 5.1 앱 초기화 테스트

```markdown
## 역할
Vue 앱 초기화 및 플러그인 설정 테스트 전문가입니다.

## 컨텍스트
```javascript
// main.js
[main.js 코드]
```

## 요구사항
앱 초기화 과정 테스트:

### 1. 플러그인 등록 확인
- Pinia 등록
- Vue Router 등록
- 커스텀 플러그인 등록

### 2. 전역 설정 확인
- errorHandler 설정
- globalProperties 설정

### 3. 환경별 설정 확인
- 개발 모드 설정
- 프로덕션 모드 설정

## 출력 형식
```javascript
import { describe, it, expect, vi } from 'vitest'

// main.js를 모듈로 테스트하기 위한 리팩토링 필요
// createApp 함수를 export하여 테스트 가능하게

describe('App Initialization', () => {
  it('Pinia가 앱에 등록되어야 한다', () => {})
  it('Router가 앱에 등록되어야 한다', () => {})
  it('전역 에러 핸들러가 설정되어야 한다', () => {})
})
```

## 참고
main.js 테스트를 위해 다음과 같이 리팩토링을 권장합니다:

```javascript
// main.js
export function createAppInstance() {
  const app = createApp(App)
  // ... 설정
  return { app, pinia, router }
}

// 실제 마운트는 조건부로
if (!import.meta.env.TEST) {
  const { app } = createAppInstance()
  app.mount('#app')
}
```
```

---

## 6. 유틸리티 함수 테스트 프롬프트

### 6.1 순수 함수 테스트

```markdown
## 역할
순수 함수 단위 테스트 전문가입니다.

## 컨텍스트
```javascript
// utils/helpers.js
[유틸리티 함수 코드]
```

## 요구사항
각 함수에 대한 철저한 테스트:

### 테스트 매트릭스
| 함수명 | 정상 입력 | 경계값 | 잘못된 입력 | 예외 상황 |
|--------|----------|--------|------------|----------|
| [func1] | ✓ | ✓ | ✓ | ✓ |

### 각 함수별 테스트 케이스
1. **정상 케이스**: 예상대로 동작
2. **경계값**: 최소/최대, 빈 값, null/undefined
3. **에러 케이스**: 잘못된 타입, 범위 초과

## 출력 형식
```javascript
describe('[함수명]', () => {
  describe('정상 케이스', () => {
    it.each([
      { input: [1, 2], expected: 3 },
      { input: [0, 0], expected: 0 },
    ])('$input을 입력하면 $expected를 반환해야 한다', ({ input, expected }) => {
      expect(functionName(...input)).toBe(expected)
    })
  })

  describe('경계값', () => {
    it('빈 배열 입력 시 0을 반환해야 한다', () => {})
  })

  describe('에러 케이스', () => {
    it('null 입력 시 에러를 던져야 한다', () => {
      expect(() => functionName(null)).toThrow()
    })
  })
})
```
```

---

## 7. 통합 테스트 프롬프트

### 7.1 컴포넌트 + 스토어 통합

```markdown
## 역할
Vue 컴포넌트와 Pinia 스토어 통합 테스트 전문가입니다.

## 컨텍스트
컴포넌트:
```vue
[컴포넌트 코드]
```

스토어:
```javascript
[스토어 코드]
```

## 요구사항
컴포넌트가 스토어와 올바르게 상호작용하는지 테스트:

### 1. 데이터 바인딩
- 스토어 state가 컴포넌트에 표시
- state 변경 시 UI 업데이트

### 2. 액션 호출
- 사용자 인터랙션 → 스토어 액션 호출
- 액션 결과가 UI에 반영

### 3. Getters 활용
- computed 스타일 데이터 표시

## 출력 형식
```javascript
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TaskList from '@/components/TaskList.vue'
import { useTaskStore } from '@/stores/task'

describe('TaskList + TaskStore 통합', () => {
  it('스토어의 tasks를 렌더링해야 한다', () => {
    const wrapper = mount(TaskList, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              task: { tasks: [{ id: 1, title: 'Test' }] }
            }
          })
        ]
      }
    })
    
    expect(wrapper.text()).toContain('Test')
  })

  it('태스크 삭제 버튼 클릭 시 deleteTask 액션 호출', async () => {
    // ...
  })
})
```
```

---

## 8. 빠른 참조 프롬프트

### 8.1 한 줄 프롬프트 템플릿

```markdown
## 빠른 컴포넌트 테스트
"다음 Vue3 컴포넌트의 Vitest 테스트를 작성해줘. props, emit, 렌더링 테스트 포함: [코드]"

## 빠른 스토어 테스트
"다음 Pinia 스토어의 테스트를 작성해줘. state, getters, actions 모두 포함하고 API는 모킹: [코드]"

## 빠른 라우터 테스트
"다음 Vue Router 설정의 네비게이션 가드 테스트를 작성해줘. 인증 체크 포함: [코드]"

## 빠른 API 테스트
"다음 Axios API 모듈의 테스트를 MSW로 작성해줘. 성공/실패 케이스 포함: [코드]"

## 테스트 케이스 추가
"기존 테스트에 다음 시나리오를 추가해줘: [시나리오 설명]. 기존 테스트: [코드]"

## 테스트 리팩토링
"다음 테스트 코드를 더 가독성 좋게 리팩토링해줘. it.each 활용, 중복 제거: [코드]"
```

---

## 부록: 프롬프트 체크리스트

### 좋은 프롬프트의 조건

- [ ] 역할이 명확히 정의되어 있는가?
- [ ] 실제 코드가 포함되어 있는가?
- [ ] 테스트 범위가 구체적인가?
- [ ] 출력 형식이 명시되어 있는가?
- [ ] 제약사항이 포함되어 있는가?

### 프롬프트 개선 팁

1. **구체적인 예시 제공**: 원하는 테스트 스타일의 예시 1-2개 포함
2. **테스트 우선순위 명시**: High/Medium/Low로 구분
3. **기존 테스트 패턴 참조**: 팀의 기존 테스트 코드 스타일 공유
4. **점진적 요청**: 기본 → 엣지케이스 → 통합 순서로 확장
