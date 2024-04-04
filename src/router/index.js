import { createRouter, createWebHistory } from 'vue-router'
import ListStudentWorkout from '@/views/InstructorViews/ListStudentWorkout.vue'
//import Dashboard from '../views/Dashboard.vue' 
import Login from '../views/Login.vue'
import Exemplo from '../views/PaginaExemplo.vue'
import CreateStudentWorkout from '@/views/InstructorViews/CreateStudentWorkout.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/',
      name: 'Login',
      component: Login
    },
   /* {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
*/
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
      name: 'Listagem de estudantes do instrutor',
      component: Exemplo
    },
    {
      path: '/newWorkout/:id',
      name: 'CreateWorkout',
      component: CreateStudentWorkout

    },
    {
      path: '/instructor/:id/list-workouts', 
      name: 'Listagem de treinos do aluno',
      component: ListStudentWorkout
    },
    {
      path: '/updateWorkout/:studentId/:workoutId',
      name: 'UpdateWorkout',
      component: CreateStudentWorkout
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
