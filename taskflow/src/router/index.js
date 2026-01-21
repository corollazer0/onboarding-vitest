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
  },
  {
    path: '/tasks/:id',
    name: 'TaskDetail',
    component: () => import('@/views/TaskDetailView.vue')
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
