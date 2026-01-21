import { h } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: {
      name: 'HomePlaceholder',
      render: () => h('div', 'Home')
    }
  },
  {
    path: '/about',
    name: 'About',
    component: {
      name: 'AboutPlaceholder',
      render: () => h('div', 'About')
    }
  }
]

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
