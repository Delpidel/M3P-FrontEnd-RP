import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import StudentMealPlans from '@/views/StudentMealPlans.vue'

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
      path: '/students/meal_plans',
      name: 'studentMealPlans',
      component: StudentMealPlans
    },
  ]
})

export default router
