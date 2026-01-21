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
    component: () => import('@/views/AboutView.vue'),
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('@/views/TaskDetailView.vue'),
    meta: {
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

export default router
