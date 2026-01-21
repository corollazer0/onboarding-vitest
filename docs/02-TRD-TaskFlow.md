# TRD: TaskFlow - 기술 요구사항 명세서

## 문서 정보

| 항목 | 내용 |
|------|------|
| 문서 버전 | 1.0.0 |
| 작성일 | 2025-01 |
| 관련 문서 | PRD-TaskFlow v1.0.0 |
| 대상 독자 | 프론트엔드 개발팀 |

---

## 1. 시스템 아키텍처

### 1.1 전체 구조

```
┌─────────────────────────────────────────────────────────────────┐
│                         TaskFlow Architecture                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐     ┌──────────────┐     ┌──────────────┐   │
│   │   Views      │────▶│  Components  │────▶│   Composables│   │
│   │  (Pages)     │     │  (UI Parts)  │     │  (Logic)     │   │
│   └──────────────┘     └──────────────┘     └──────────────┘   │
│          │                    │                    │            │
│          ▼                    ▼                    ▼            │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    Pinia Store                           │  │
│   │   ┌─────────┐  ┌─────────┐  ┌─────────┐                │  │
│   │   │  state  │  │ getters │  │ actions │                │  │
│   │   └─────────┘  └─────────┘  └─────────┘                │  │
│   └─────────────────────────────────────────────────────────┘  │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │                    Axios Instance                        │  │
│   │   ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │  │
│   │   │  Interceptors│  │  Base URL   │  │  Headers    │    │  │
│   │   └─────────────┘  └─────────────┘  └─────────────┘    │  │
│   └─────────────────────────────────────────────────────────┘  │
│          │                                                      │
│          ▼                                                      │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │              Mock Server (MSW) / Real API                │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 디렉토리 구조

```
taskflow/
├── .env                          # 환경변수 (개발)
├── .env.production               # 환경변수 (운영)
├── .env.test                     # 환경변수 (테스트)
├── vite.config.js                # Vite 설정
├── vitest.config.js              # Vitest 설정 (분리 권장)
├── package.json
│
├── src/
│   ├── main.js                   # 앱 진입점
│   ├── App.vue                   # 루트 컴포넌트
│   │
│   ├── assets/                   # 정적 자원
│   │   └── styles/
│   │       └── main.css
│   │
│   ├── components/               # 공통 컴포넌트
│   │   ├── base/                 # 기본 UI 컴포넌트
│   │   │   ├── BaseButton.vue
│   │   │   ├── BaseInput.vue
│   │   │   └── BaseModal.vue
│   │   └── task/                 # 태스크 관련 컴포넌트
│   │       ├── TaskCard.vue
│   │       ├── TaskList.vue
│   │       └── TaskForm.vue
│   │
│   ├── composables/              # 재사용 로직
│   │   ├── useTask.js
│   │   └── useNotification.js
│   │
│   ├── views/                    # 페이지 컴포넌트
│   │   ├── HomeView.vue
│   │   ├── TaskDetailView.vue
│   │   └── AboutView.vue
│   │
│   ├── router/                   # 라우터 설정
│   │   ├── index.js              # 라우터 인스턴스
│   │   └── guards.js             # 네비게이션 가드
│   │
│   ├── stores/                   # Pinia 스토어
│   │   ├── index.js              # 스토어 설정
│   │   ├── task.js               # 태스크 스토어
│   │   └── user.js               # 사용자 스토어
│   │
│   ├── api/                      # API 관련
│   │   ├── client.js             # Axios 인스턴스
│   │   ├── interceptors.js       # 인터셉터
│   │   └── task.api.js           # 태스크 API
│   │
│   └── utils/                    # 유틸리티
│       ├── helpers.js
│       └── constants.js
│
├── tests/                        # 테스트 파일
│   ├── setup.js                  # 테스트 설정
│   │
│   ├── unit/                     # 단위 테스트
│   │   ├── components/
│   │   │   ├── base/
│   │   │   │   └── BaseButton.spec.js
│   │   │   └── task/
│   │   │       └── TaskCard.spec.js
│   │   ├── stores/
│   │   │   └── task.spec.js
│   │   ├── composables/
│   │   │   └── useTask.spec.js
│   │   └── utils/
│   │       └── helpers.spec.js
│   │
│   ├── integration/              # 통합 테스트
│   │   ├── router.spec.js
│   │   └── api.spec.js
│   │
│   └── mocks/                    # 목업 데이터/핸들러
│       ├── handlers.js           # MSW 핸들러
│       └── data.js               # 목업 데이터
│
└── docs/                         # 문서
    ├── LEARNING_GUIDE.md
    └── TEST_PATTERNS.md
```

---

## 2. 기술 스택 상세 명세

### 2.1 패키지 버전 및 설정

```json
{
  "name": "taskflow",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch",
    "lint": "eslint . --ext .vue,.js,.jsx --fix",
    "format": "prettier --write src/"
  },
  "dependencies": {
    "vue": "^3.5.2",
    "vue-router": "^4.4.0",
    "pinia": "^2.1.7",
    "axios": "^1.7.2"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.1.0",
    "@vue/test-utils": "^2.4.6",
    "vite": "^5.3.0",
    "vitest": "^3.2.4",
    "@vitest/coverage-v8": "^3.2.4",
    "@vitest/ui": "^3.2.4",
    "msw": "^2.7.0",
    "jsdom": "^26.0.0",
    "eslint": "^9.0.0",
    "eslint-plugin-vue": "^9.32.0",
    "prettier": "^3.4.0"
  }
}
```

### 2.2 Vite 설정

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
```

### 2.3 Vitest 설정

```javascript
// vitest.config.js
import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // 테스트 환경
      environment: 'jsdom',
      
      // 글로벌 API (describe, it, expect 등)
      globals: true,
      
      // 설정 파일
      setupFiles: ['./tests/setup.js'],
      
      // 포함할 테스트 파일
      include: ['tests/**/*.spec.js'],
      
      // 커버리지 설정 (Vitest 3.x)
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        include: ['src/**/*.{js,vue}'],
        exclude: [
          'src/main.js',
          'src/**/*.spec.js',
          'src/**/__mocks__/**'
        ],
        thresholds: {
          lines: 80,
          functions: 80,
          branches: 80,
          statements: 80
        }
      }
      
      // 참고: alias는 viteConfig에서 자동 상속됨
    }
  })
)
```

### 2.4 테스트 셋업 파일

```javascript
// tests/setup.js
import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, vi } from 'vitest'

// 각 테스트 전 Pinia 초기화
beforeEach(() => {
  setActivePinia(createPinia())
})

// 전역 모킹
vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

// Vue Test Utils 전역 설정
config.global.stubs = {
  teleport: true,
  transition: false
}

// 전역 컴포넌트 등록 (필요시)
// config.global.components = { ... }
```

---

## 3. 핵심 모듈 명세

### 3.1 환경변수 (.env)

```bash
# .env (개발환경)
VITE_APP_TITLE=TaskFlow
VITE_API_BASE_URL=http://localhost:8080/api
VITE_APP_VERSION=1.0.0
VITE_ENABLE_MOCK=true

# .env.test (테스트환경)
VITE_APP_TITLE=TaskFlow Test
VITE_API_BASE_URL=http://localhost:8080/api
VITE_ENABLE_MOCK=true

# .env.production (운영환경)
VITE_APP_TITLE=TaskFlow
VITE_API_BASE_URL=https://api.example.com
VITE_ENABLE_MOCK=false
```

**환경변수 사용 패턴:**
```javascript
// 환경변수 접근
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE

// 조건부 로직
if (import.meta.env.DEV) {
  console.log('개발 모드')
}

if (import.meta.env.VITE_ENABLE_MOCK === 'true') {
  // MSW 활성화
}
```

### 3.2 main.js 구조

```javascript
// src/main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { setupAxios } from './api/client'

// 앱 인스턴스 생성
const app = createApp(App)

// 플러그인 등록
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Axios 초기 설정
setupAxios()

// 전역 에러 핸들러
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
}

// 전역 프로퍼티 (필요시)
app.config.globalProperties.$appName = import.meta.env.VITE_APP_TITLE

// 마운트
app.mount('#app')

// 테스트를 위한 export
export { app, pinia, router }
```

### 3.3 Pinia 스토어 명세

```javascript
// src/stores/task.js
import { defineStore } from 'pinia'
import { taskApi } from '@/api/task.api'

export const useTaskStore = defineStore('task', {
  // State: 반응형 데이터
  state: () => ({
    tasks: [],
    currentTask: null,
    filter: 'all', // 'all' | 'completed' | 'pending'
    isLoading: false,
    error: null
  }),

  // Getters: 계산된 상태
  getters: {
    // 필터링된 태스크
    filteredTasks: (state) => {
      switch (state.filter) {
        case 'completed':
          return state.tasks.filter(t => t.completed)
        case 'pending':
          return state.tasks.filter(t => !t.completed)
        default:
          return state.tasks
      }
    },
    
    // 완료된 태스크 수
    completedCount: (state) => {
      return state.tasks.filter(t => t.completed).length
    },
    
    // ID로 태스크 찾기
    getTaskById: (state) => {
      return (id) => state.tasks.find(t => t.id === id)
    }
  },

  // Actions: 상태 변이 및 비동기 로직
  actions: {
    // 태스크 목록 조회
    async fetchTasks() {
      this.isLoading = true
      this.error = null
      try {
        const response = await taskApi.getAll()
        this.tasks = response.data
      } catch (err) {
        this.error = err.message
        throw err
      } finally {
        this.isLoading = false
      }
    },

    // 태스크 추가
    async addTask(taskData) {
      const response = await taskApi.create(taskData)
      this.tasks.push(response.data)
      return response.data
    },

    // 태스크 완료 토글
    async toggleComplete(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        await taskApi.update(taskId, { completed: task.completed })
      }
    },

    // 태스크 삭제
    async deleteTask(taskId) {
      await taskApi.delete(taskId)
      this.tasks = this.tasks.filter(t => t.id !== taskId)
    },

    // 필터 설정
    setFilter(filter) {
      this.filter = filter
    }
  }
})
```

### 3.4 Vue Router 명세

```javascript
// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 라우트 정의
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: '홈',
      requiresAuth: false
    }
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('@/views/TaskDetailView.vue'),
    meta: {
      title: '태스크 상세',
      requiresAuth: true
    },
    // 라우트 레벨 가드
    beforeEnter: (to, from, next) => {
      const taskId = to.params.id
      if (!taskId || isNaN(Number(taskId))) {
        next({ name: 'Home' })
      } else {
        next()
      }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About',
      requiresAuth: false
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundView.vue')
  }
]

// 라우터 인스턴스 생성
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 전역 네비게이션 가드: 인증 체크
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  if (to.meta.requiresAuth && !userStore.isAuthenticated) {
    next({ name: 'Home', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

// 전역 후처리 가드: 페이지 타이틀 설정
router.afterEach((to) => {
  const baseTitle = import.meta.env.VITE_APP_TITLE
  document.title = to.meta.title 
    ? `${to.meta.title} | ${baseTitle}` 
    : baseTitle
})

export default router
```

### 3.5 Axios 인스턴스 명세

```javascript
// src/api/client.js
import axios from 'axios'

// Axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // 토큰 추가
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 요청 로깅 (개발 모드)
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    // 성공 응답 처리
    return response
  },
  (error) => {
    // 에러 응답 처리
    const { response } = error
    
    if (response) {
      switch (response.status) {
        case 401:
          // 인증 만료 처리
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('접근 권한이 없습니다.')
          break
        case 404:
          console.error('리소스를 찾을 수 없습니다.')
          break
        case 500:
          console.error('서버 오류가 발생했습니다.')
          break
      }
    } else {
      console.error('네트워크 오류가 발생했습니다.')
    }
    
    return Promise.reject(error)
  }
)

// 초기 설정 함수 (main.js에서 호출)
export function setupAxios() {
  // 추가 설정이 필요한 경우
}

export default apiClient

// src/api/task.api.js
import apiClient from './client'

export const taskApi = {
  getAll: () => apiClient.get('/tasks'),
  getById: (id) => apiClient.get(`/tasks/${id}`),
  create: (data) => apiClient.post('/tasks', data),
  update: (id, data) => apiClient.put(`/tasks/${id}`, data),
  delete: (id) => apiClient.delete(`/tasks/${id}`)
}
```

---

## 4. 테스트 전략

### 4.1 테스트 피라미드

```
                    ┌───────────┐
                    │    E2E    │  (향후 확장)
                    │  (적음)   │
                  ┌─┴───────────┴─┐
                  │   통합 테스트   │
                  │    (중간)      │
                ┌─┴───────────────┴─┐
                │     단위 테스트     │
                │      (많음)        │
                └───────────────────┘
```

### 4.2 테스트 분류 및 범위

| 테스트 유형 | 대상 | 커버리지 목표 | 도구 |
|------------|------|--------------|------|
| 단위 테스트 | 순수 함수, 유틸리티 | 90% | Vitest |
| 컴포넌트 테스트 | Vue 컴포넌트 | 80% | @vue/test-utils |
| 스토어 테스트 | Pinia 스토어 | 85% | Vitest + Pinia |
| 라우터 테스트 | 네비게이션 가드 | 80% | Vitest + Vue Router |
| API 테스트 | Axios 호출 | 80% | Vitest + MSW |

### 4.3 테스트 파일 네이밍 규칙

```
[대상파일명].spec.js

예시:
- BaseButton.vue → BaseButton.spec.js
- task.js (스토어) → task.spec.js
- helpers.js → helpers.spec.js
```

### 4.4 테스트 작성 패턴

```javascript
// 표준 테스트 구조
describe('[카테고리] 테스트 대상', () => {
  // 공통 설정
  let wrapper
  
  beforeEach(() => {
    // 각 테스트 전 설정
  })
  
  afterEach(() => {
    // 각 테스트 후 정리
  })

  describe('기능/상황 그룹', () => {
    it('should [동작] when [조건]', () => {
      // Arrange (준비)
      // Act (실행)
      // Assert (검증)
    })
  })
})
```

---

## 5. 핵심 테스트 케이스 명세

### 5.1 컴포넌트 테스트 케이스

| 컴포넌트 | 테스트 케이스 | 우선순위 |
|----------|--------------|----------|
| BaseButton | props 렌더링, 클릭 이벤트, disabled 상태 | High |
| BaseInput | v-model 동작, validation, placeholder | High |
| BaseModal | 열기/닫기, slot 렌더링, 외부 클릭 닫기 | Medium |
| TaskCard | 태스크 정보 표시, 완료 토글, 삭제 버튼 | High |
| TaskList | 목록 렌더링, 빈 상태, 필터링 | High |
| TaskForm | 입력 검증, 제출, 리셋 | High |

### 5.2 스토어 테스트 케이스

| 스토어 | 테스트 케이스 | 우선순위 |
|--------|--------------|----------|
| task.state | 초기 상태 확인 | High |
| task.getters | filteredTasks 필터링 동작 | High |
| task.getters | completedCount 계산 | Medium |
| task.actions | fetchTasks 성공/실패 | High |
| task.actions | addTask 추가 및 상태 반영 | High |
| task.actions | toggleComplete 상태 변경 | High |
| task.actions | deleteTask 삭제 및 상태 반영 | High |

### 5.3 라우터 테스트 케이스

| 대상 | 테스트 케이스 | 우선순위 |
|------|--------------|----------|
| routes | 기본 라우트 매핑 | High |
| beforeEach | 인증 필요 페이지 접근 제어 | High |
| beforeEnter | TaskDetail 파라미터 검증 | Medium |
| afterEach | 페이지 타이틀 업데이트 | Low |

### 5.4 API 테스트 케이스

| 대상 | 테스트 케이스 | 우선순위 |
|------|--------------|----------|
| apiClient | 기본 설정 (baseURL, timeout) | High |
| request interceptor | 토큰 헤더 추가 | High |
| response interceptor | 401 에러 처리 | High |
| response interceptor | 네트워크 에러 처리 | Medium |
| taskApi | CRUD 각 메서드 호출 | High |

---

## 6. MSW (Mock Service Worker) 설정

### 6.1 핸들러 정의

```javascript
// tests/mocks/handlers.js
import { http, HttpResponse } from 'msw'

const mockTasks = [
  { id: 1, title: 'Task 1', completed: false },
  { id: 2, title: 'Task 2', completed: true }
]

export const handlers = [
  // GET /api/tasks
  http.get('/api/tasks', () => {
    return HttpResponse.json(mockTasks)
  }),

  // POST /api/tasks
  http.post('/api/tasks', async ({ request }) => {
    const body = await request.json()
    const newTask = { id: Date.now(), ...body }
    return HttpResponse.json(newTask, { status: 201 })
  }),

  // PUT /api/tasks/:id
  http.put('/api/tasks/:id', async ({ params, request }) => {
    const body = await request.json()
    return HttpResponse.json({ id: Number(params.id), ...body })
  }),

  // DELETE /api/tasks/:id
  http.delete('/api/tasks/:id', ({ params }) => {
    return HttpResponse.json({ success: true })
  })
]

// 에러 시나리오 핸들러
export const errorHandlers = [
  http.get('/api/tasks', () => {
    return HttpResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    )
  })
]
```

### 6.2 테스트에서 MSW 사용

```javascript
// tests/setup.js (추가)
import { setupServer } from 'msw/node'
import { handlers } from './mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

---

## 7. 개발 환경 요구사항

### 7.1 필수 도구

| 도구 | 버전 | 용도 |
|------|------|------|
| Node.js | 18.x 이상 | 런타임 |
| npm/pnpm | 최신 | 패키지 관리 |
| VS Code | 최신 | IDE |
| Vue DevTools | 최신 | 디버깅 |

### 7.2 권장 VS Code 확장

```json
{
  "recommendations": [
    "Vue.volar",
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "vitest.explorer",
    "Vue.vscode-typescript-vue-plugin"
  ]
}
```

---

## 8. 배포 및 CI/CD (참고)

### 8.1 테스트 자동화 스크립트

```yaml
# .github/workflows/test.yml (참고용)
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run test:coverage
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

---

## 부록: 참고 자료

| 주제 | 링크 |
|------|------|
| Vue 3 공식 문서 | https://vuejs.org/ |
| Vitest 공식 문서 | https://vitest.dev/ |
| Vue Test Utils | https://test-utils.vuejs.org/ |
| Pinia | https://pinia.vuejs.org/ |
| Vue Router | https://router.vuejs.org/ |
| MSW | https://mswjs.io/ |
