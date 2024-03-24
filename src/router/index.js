import { createRouter, createWebHistory } from 'vue-router'

import AdminDashboard  from '../views/AdminDashboard.vue'
import Login from '../views/Login.vue'
import Exemplo from '../views/PaginaExemplo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard/admin',
      name: 'AdminDashboard ',
      component: AdminDashboard 
    },

    {
      path: '/dashboard/recepcionista',
      name: 'ReceptionistDashboard ',
      component: Exemplo 
    },

    {
      path: '/dashboard/instrutor',
      name: 'InstructorDashboard ',
      component: Exemplo 
    },

    {
      path: '/dashboard/nutricionista',
      name: 'NutrictionistDashboard ',
      component: Exemplo 
    },

    {
      path: '/dashboard/aluno',
      name: 'StudentDashboard ',
      component: Exemplo 
    },

    //perfil usuário
    {
      path: '/users',
      name: 'Listagem de usuários',
      component: Exemplo
    },
    {
      path: '/users/new',
      name: 'Novo usuário',
      component: Exemplo
    },

    //perfil recepcionista
    {
      path: '/students',
      name: 'Listagem de estudantes',
      component: Exemplo
    },
    {
      path: '/students/new',
      name: 'Novo Estudante',
      component: Exemplo
    },

    //perfil instrutor
    {
      path: '/exercises',
      name: 'Exercícios',
      component: Exemplo
    },
    {
      path: '/instructor/students',
      name: 'Listagem de estudantes',
      component: Exemplo
    },

    //perfil nutricionista
    {
      path: '/active/students',
      name: 'Listagem de estudantes ativos',
      component: Exemplo
    },

    //perfil aluno
    {
      path: '/student/meal-plans',
      name: 'Planos de refeições do aluno',
      component: Exemplo
    },
    {
      path: '/student/workouts',
      name: 'Treinos do aluno',
      component: Exemplo
    }
  ]
})

export default router
