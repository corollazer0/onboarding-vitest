# 커밋 단위 작업 스케줄: TaskFlow 프로젝트

## 문서 정보

| 항목 | 내용 |
|------|------|
| 총 기간 | 5개월 (20주) |
| 총 커밋 수 | 약 50개 |
| 커밋 원칙 | 1기능 = 1커밋 + 1테스트 커밋 |

---

## 스케줄 범례

```
📁 프로젝트 설정
🧩 컴포넌트 구현
🔧 기능 구현
🧪 테스트 작성
📝 문서화
🔄 리팩토링
```

---

## Phase 1: 프로젝트 기초 (Week 1-2)

### Week 1: 환경 설정

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 01 | 📁 init: Vite + Vue3 프로젝트 초기화 | `npm create vite@latest`, 프로젝트 구조 이해 | 1h |
| 02 | 📁 config: ESLint + Prettier 설정 | 코드 스타일 통일, .eslintrc, .prettierrc | 1h |
| 03 | 📁 config: 환경변수 설정 (.env) | `import.meta.env`, 환경별 설정 | 1h |
| 04 | 📁 config: Vitest 초기 설정 | vitest.config.js, 테스트 환경 구성 | 2h |
| 05 | 🧪 test: Vitest 동작 확인 테스트 | describe, it, expect 기본 문법 | 1h |

```
커밋 01 상세:
- npm create vite@latest taskflow -- --template vue
- 디렉토리 구조 설명
- package.json 분석

커밋 04 상세:
- vitest.config.js 생성
- jsdom 환경 설정
- @vue/test-utils 설치
- tests/setup.js 생성

커밋 05 상세 (첫 테스트 파일):
```javascript
// tests/unit/example.spec.js
describe('Vitest 기본 테스트', () => {
  it('1 + 1은 2이다', () => {
    expect(1 + 1).toBe(2)
  })
})
```
```

### Week 2: Vue 기초 + 첫 컴포넌트

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 06 | 🧩 feat: App.vue 기본 구조 작성 | template, script setup, style | 1h |
| 07 | 🧩 feat: TaskItem 컴포넌트 생성 | props, 기본 렌더링 | 2h |
| 08 | 🧪 test: TaskItem 렌더링 테스트 | mount, wrapper.text(), wrapper.find() | 2h |
| 09 | 🧩 feat: TaskList 컴포넌트 생성 | v-for, 리스트 렌더링 | 2h |
| 10 | 🧪 test: TaskList 렌더링 테스트 | 다중 아이템 렌더링 검증 | 2h |

```
커밋 07-08 페어 예시:

// 커밋 07: TaskItem.vue
<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div class="task-item">
    <span>{{ task.title }}</span>
  </div>
</template>

// 커밋 08: TaskItem.spec.js
describe('TaskItem', () => {
  it('task.title을 렌더링해야 한다', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: { id: 1, title: '테스트 태스크', completed: false }
      }
    })
    expect(wrapper.text()).toContain('테스트 태스크')
  })
})
```

---

## Phase 2: 상태관리 (Week 3-4)

### Week 3: Pinia 도입

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 11 | 📁 config: Pinia 설치 및 설정 | createPinia, app.use(pinia) | 1h |
| 12 | 🔧 feat: task 스토어 생성 (state) | defineStore, state 정의 | 2h |
| 13 | 🧪 test: task 스토어 state 테스트 | setActivePinia, 초기 상태 검증 | 2h |
| 14 | 🔧 feat: task 스토어 getters 추가 | getters 정의, computed 스타일 | 2h |
| 15 | 🧪 test: task 스토어 getters 테스트 | getter 로직 검증 | 2h |

```
커밋 12-13 페어 예시:

// 커밋 12: stores/task.js
export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    filter: 'all'
  })
})

// 커밋 13: tests/unit/stores/task.spec.js
describe('Task Store - State', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('초기 tasks는 빈 배열이어야 한다', () => {
    const store = useTaskStore()
    expect(store.tasks).toEqual([])
  })

  it('초기 filter는 "all"이어야 한다', () => {
    const store = useTaskStore()
    expect(store.filter).toBe('all')
  })
})
```

### Week 4: Pinia Actions

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 16 | 🔧 feat: addTask 액션 구현 | actions, state 변이 | 2h |
| 17 | 🧪 test: addTask 액션 테스트 | 액션 호출 후 상태 검증 | 2h |
| 18 | 🔧 feat: toggleComplete 액션 구현 | 배열 내 객체 수정 | 2h |
| 19 | 🧪 test: toggleComplete 액션 테스트 | 상태 토글 검증 | 2h |
| 20 | 🔧 feat: deleteTask 액션 구현 | 배열 필터링 | 1h |
| 21 | 🧪 test: deleteTask 액션 테스트 | 삭제 후 배열 검증 | 1h |
| 22 | 🧩 refactor: TaskList를 스토어와 연결 | storeToRefs, 컴포넌트에서 스토어 사용 | 2h |

```
커밋 16-17 페어 예시:

// 커밋 16: stores/task.js (addTask 추가)
actions: {
  addTask(title) {
    const newTask = {
      id: Date.now(),
      title,
      completed: false
    }
    this.tasks.push(newTask)
    return newTask
  }
}

// 커밋 17: task.spec.js (addTask 테스트 추가)
describe('Actions - addTask', () => {
  it('새 태스크를 tasks 배열에 추가해야 한다', () => {
    const store = useTaskStore()
    
    store.addTask('새 태스크')
    
    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('새 태스크')
    expect(store.tasks[0].completed).toBe(false)
  })

  it('추가된 태스크를 반환해야 한다', () => {
    const store = useTaskStore()
    
    const result = store.addTask('테스트')
    
    expect(result.title).toBe('테스트')
    expect(result.id).toBeDefined()
  })
})
```

---

## Phase 3: 라우팅 (Week 5-6)

### Week 5: Vue Router 기본

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 23 | 📁 config: Vue Router 설치 및 기본 설정 | createRouter, createWebHistory | 2h |
| 24 | 🧩 feat: HomeView 페이지 생성 | views 디렉토리, 페이지 컴포넌트 | 1h |
| 25 | 🧩 feat: AboutView 페이지 생성 | 다중 라우트 | 1h |
| 26 | 🧪 test: 기본 라우팅 테스트 | router.push, currentRoute 검증 | 2h |
| 27 | 🔧 feat: RouterLink 네비게이션 추가 | RouterLink, RouterView | 1h |

```
커밋 23-26 시퀀스 예시:

// 커밋 23: router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

// 커밋 26: tests/unit/router/index.spec.js
describe('Router', () => {
  let router

  beforeEach(() => {
    router = createRouter({
      history: createMemoryHistory(),
      routes
    })
  })

  it('/ 경로는 Home 라우트로 매핑되어야 한다', async () => {
    router.push('/')
    await router.isReady()
    
    expect(router.currentRoute.value.name).toBe('Home')
  })
})
```

### Week 6: 동적 라우팅 + 가드

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 28 | 🧩 feat: TaskDetailView 동적 라우트 | :id 파라미터, useRoute | 2h |
| 29 | 🧪 test: 동적 라우트 파라미터 테스트 | params 추출 검증 | 2h |
| 30 | 🔧 feat: beforeEach 인증 가드 구현 | 전역 가드, meta.requiresAuth | 2h |
| 31 | 🧪 test: beforeEach 가드 테스트 | 가드 동작 검증 | 2h |
| 32 | 🔧 feat: afterEach 타이틀 변경 구현 | document.title 동적 변경 | 1h |
| 33 | 🧪 test: afterEach 가드 테스트 | 타이틀 변경 검증 | 1h |

```
커밋 30-31 페어 예시:

// 커밋 30: router/index.js (beforeEach 추가)
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Home', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

// 커밋 31: tests/unit/router/guards.spec.js
describe('beforeEach 가드', () => {
  it('인증 필요 페이지에 비로그인 시 홈으로 리다이렉트', async () => {
    const userStore = useUserStore()
    userStore.isAuthenticated = false
    
    router.push('/tasks/1')
    await router.isReady()
    
    expect(router.currentRoute.value.name).toBe('Home')
    expect(router.currentRoute.value.query.redirect).toBe('/tasks/1')
  })
})
```

---

## Phase 4: API 연동 (Week 7-8)

### Week 7: Axios 설정

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 34 | 📁 config: Axios + MSW 설치 | 패키지 설치, 기본 설정 | 1h |
| 35 | 🔧 feat: Axios 인스턴스 생성 | axios.create, baseURL, headers | 2h |
| 36 | 🧪 test: Axios 인스턴스 설정 테스트 | 설정값 검증 | 1h |
| 37 | 🔧 feat: 요청 인터셉터 구현 | 토큰 자동 첨부 | 2h |
| 38 | 🧪 test: 요청 인터셉터 테스트 | Authorization 헤더 검증 | 2h |

```
커밋 37-38 페어 예시:

// 커밋 37: api/client.js (요청 인터셉터)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 커밋 38: tests/unit/api/client.spec.js
describe('요청 인터셉터', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('토큰이 있으면 Authorization 헤더를 추가해야 한다', async () => {
    localStorage.setItem('token', 'test-token')
    
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {}
    })
    
    expect(config.headers.Authorization).toBe('Bearer test-token')
  })

  it('토큰이 없으면 Authorization 헤더가 없어야 한다', async () => {
    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {}
    })
    
    expect(config.headers.Authorization).toBeUndefined()
  })
})
```

### Week 8: API 연동 + 에러 처리

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 39 | 🔧 feat: 응답 인터셉터 구현 | 에러 코드별 처리 | 2h |
| 40 | 🧪 test: 응답 인터셉터 테스트 | 401, 500 에러 처리 검증 | 2h |
| 41 | 🔧 feat: taskApi 모듈 구현 | CRUD API 메서드 | 2h |
| 42 | 📁 config: MSW 핸들러 작성 | http.get, http.post 등 | 2h |
| 43 | 🧪 test: taskApi MSW 통합 테스트 | API 호출 검증 | 3h |
| 44 | 🔧 refactor: task 스토어 API 연동 | 비동기 actions | 2h |
| 45 | 🧪 test: task 스토어 비동기 액션 테스트 | 성공/실패 케이스 | 3h |

---

## Phase 5: 공통 컴포넌트 (Week 9-10)

### Week 9: Base 컴포넌트

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 46 | 🧩 feat: BaseButton 컴포넌트 | props, slots, emit | 2h |
| 47 | 🧪 test: BaseButton 테스트 | 클릭, disabled, variants | 2h |
| 48 | 🧩 feat: BaseInput 컴포넌트 | v-model, validation | 2h |
| 49 | 🧪 test: BaseInput 테스트 | v-model 동작, 이벤트 | 2h |
| 50 | 🧩 feat: BaseModal 컴포넌트 | Teleport, 조건부 렌더링 | 2h |
| 51 | 🧪 test: BaseModal 테스트 | 열기/닫기, slot | 2h |

```
커밋 46-47 페어 예시:

// 커밋 46: components/base/BaseButton.vue
<script setup>
defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'danger'].includes(v)
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const handleClick = (event) => {
  emit('click', event)
}
</script>

<template>
  <button
    :class="['btn', `btn-${variant}`]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

// 커밋 47: tests/unit/components/base/BaseButton.spec.js
describe('BaseButton', () => {
  describe('Props', () => {
    it('기본 variant는 primary이어야 한다', () => {
      const wrapper = mount(BaseButton)
      expect(wrapper.classes()).toContain('btn-primary')
    })

    it('variant prop에 따라 클래스가 변경되어야 한다', () => {
      const wrapper = mount(BaseButton, {
        props: { variant: 'danger' }
      })
      expect(wrapper.classes()).toContain('btn-danger')
    })

    it('disabled 상태면 클릭이 불가능해야 한다', () => {
      const wrapper = mount(BaseButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('Events', () => {
    it('클릭 시 click 이벤트를 emit해야 한다', async () => {
      const wrapper = mount(BaseButton)
      
      await wrapper.trigger('click')
      
      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('Slots', () => {
    it('default slot 내용을 렌더링해야 한다', () => {
      const wrapper = mount(BaseButton, {
        slots: { default: '버튼 텍스트' }
      })
      expect(wrapper.text()).toBe('버튼 텍스트')
    })
  })
})
```

### Week 10: 통합 + 리팩토링

| 순서 | 커밋 메시지 | 학습 포인트 | 예상 시간 |
|------|------------|------------|----------|
| 52 | 🧩 feat: TaskForm 컴포넌트 (통합) | 여러 Base 컴포넌트 조합 | 3h |
| 53 | 🧪 test: TaskForm 통합 테스트 | 폼 제출, 유효성 검사 | 3h |
| 54 | 🔄 refactor: 테스트 헬퍼 함수 추출 | 테스트 유틸리티 모듈화 | 2h |
| 55 | 📝 docs: 테스트 패턴 문서화 | 팀 테스트 가이드 작성 | 2h |
| 56 | config: happy-dom test environment | add happy-dom dependency, env setup | 1h |
| 57 | config: split jsdom/happy-dom tests | env-specific config/scripts | 2h |
| 58 | test: happy-dom localStorage | use real localStorage in happy-dom | 2h |
| 59 | test: localize test names + helper/mocks comments | add Korean comments and rename it() titles | 2h |
| 60 | docs: test environment selection guide + smoke check | add guide and smoke script | 2h |

---

## Phase 6: 실무 적용 준비 (Week 11-20)

### Week 11-12: 고급 테스트 패턴

| 커밋 메시지 | 학습 포인트 |
|------------|------------|
| 🧪 test: Snapshot 테스트 도입 | toMatchSnapshot, 컴포넌트 회귀 테스트 |
| 🧪 test: 테이블 기반 테스트 | it.each, 다양한 입력 케이스 |
| 🧪 test: 비동기 테스트 심화 | waitFor, findBy, 타이밍 이슈 |
| 📁 config: 커버리지 임계값 설정 | 80% 커버리지 강제 |

### Week 13-16: 실무 프로젝트 적용

| 주차 | 목표 | 작업 내용 |
|------|------|----------|
| 13 | 실무 프로젝트 분석 | 테스트 대상 선정, 우선순위 결정 |
| 14 | 환경 구축 | 실무 프로젝트에 Vitest 설정 |
| 15 | 핵심 로직 테스트 | 유틸리티, 스토어 테스트 작성 |
| 16 | 컴포넌트 테스트 | 공통 컴포넌트 테스트 작성 |

### Week 17-20: 테스트 자산화

| 주차 | 목표 | 작업 내용 |
|------|------|----------|
| 17 | 테스트 템플릿 정리 | 팀 공용 테스트 템플릿 |
| 18 | CI/CD 연동 | 자동 테스트 실행 파이프라인 |
| 19 | 문서화 완료 | 테스트 가이드, 베스트 프랙티스 |
| 20 | 회고 및 개선 | 프로세스 회고, 다음 단계 계획 |

---

## 커밋 메시지 컨벤션

### 타입

| 타입 | 용도 |
|------|------|
| feat | 새로운 기능 추가 |
| fix | 버그 수정 |
| test | 테스트 추가/수정 |
| refactor | 코드 리팩토링 |
| docs | 문서 작성/수정 |
| config | 설정 파일 변경 |
| style | 코드 포맷팅 |

### 형식

```
[이모지] [타입]: [간단한 설명]

[상세 설명 (선택)]

학습 포인트:
- [포인트 1]
- [포인트 2]
```

### 예시

```
🧩 feat: TaskItem 컴포넌트 생성

- props로 task 객체를 받아 렌더링
- completed 상태에 따른 스타일 적용

학습 포인트:
- defineProps로 props 정의
- class 바인딩 (:class)
- 조건부 스타일링
```

---

## 브랜치 전략

```
main (항상 안정적인 상태)
  └── develop (개발 통합 브랜치)
        ├── feature/phase1-setup
        ├── feature/phase2-pinia
        ├── feature/phase3-router
        ├── feature/phase4-api
        └── feature/phase5-components
```

### 머지 규칙

1. feature → develop: PR 필수, 테스트 통과
2. develop → main: 팀 리뷰 후 머지

---

## 체크리스트

### 각 커밋 전 확인

- [ ] 테스트가 모두 통과하는가?
- [ ] 커밋 메시지가 컨벤션을 따르는가?
- [ ] 학습 포인트가 명시되어 있는가?
- [ ] 코드에 적절한 주석이 있는가?

### 각 Phase 완료 시 확인

- [ ] 해당 Phase의 모든 커밋 완료
- [ ] 테스트 커버리지 목표 달성
- [ ] 팀원 코드 리뷰 완료
- [ ] 다음 Phase 준비 완료

---

## 일일 학습 루틴 제안

```
09:00-09:30  데일리 스크럼 (진행상황 공유)
09:30-11:30  기능 구현 (페어 프로그래밍 권장)
11:30-12:00  테스트 작성
12:00-13:00  점심
13:00-14:30  테스트 작성 계속
14:30-15:00  코드 리뷰
15:00-17:00  피드백 반영 및 리팩토링
17:00-18:00  문서화 및 커밋 정리
```
