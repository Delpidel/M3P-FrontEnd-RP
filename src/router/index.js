import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashbord.vue'
import Login from '../views/Login.vue'
import Avaliation from '../views/UnitaryAvaliation.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    /*{
      path: '/home',
      name: 'home',
      component: Home
    },*/
    {
      path: '/avaliation',
      name: 'avaliation',
      component: Avaliation
    }
  ]
})

export default router
