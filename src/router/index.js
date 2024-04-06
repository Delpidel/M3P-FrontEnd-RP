import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashbord.vue'
import Login from '../views/Login.vue'
import StudentRegistration from '../views/RecepcionistaViews/StudentRegistration.vue'
import StudentDocuments from '../views/RecepcionistaViews/StudentDocuments.vue';
import Exemplo from '../views/PaginaExemplo.vue'
import ListStudents from '../views/RecepcionistaViews/ListStudents.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
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
      name: 'ListStudents',
      component: ListStudents
    },
    {
      path: '/students/new',
      name: 'Novo Estudante',
      component: StudentRegistration
    },

    {
      path: '/students/:id/documents',
      name: 'student-documents',
      component: StudentDocuments,
      props: true
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
