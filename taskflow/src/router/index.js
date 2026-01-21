import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
      requiresAuth: false
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
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('@/views/TaskDetailView.vue'),
    meta: {
      title: 'Task Detail',
      requiresAuth: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export function createAuthGuard(options = {}) {
  const getIsAuthenticated = options.getIsAuthenticated ?? (() => false)

  return (to, from, next) => {
    const isAuthenticated = getIsAuthenticated()

    if (to.meta.requiresAuth && !isAuthenticated) {
      next({ name: 'Home', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  }
}

const authGuard = createAuthGuard()
router.beforeEach(authGuard)

router.afterEach((to) => {
  const baseTitle = import.meta.env.VITE_APP_TITLE || 'TaskFlow'
  document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle
})

export default router
