import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/HomeVideo.vue'
import Login from '../views/Login.vue'
import ExemploDate from '../views/ExemploDate.vue'

import ExemploDateWithRange from '../views/ExemploDateWithRange.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/exemplo-data',
      name: 'ExemploDate',
      component: ExemploDate
    },
    {
      path: '/exemplo-data-com-range',
      name: 'ExemploDateWithRange',
      component: ExemploDateWithRange
    }
  ]
})

export default router
