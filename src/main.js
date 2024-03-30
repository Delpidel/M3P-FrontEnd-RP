import './assets/main.css'

import '@mdi/font/css/materialdesignicons.css'


import VCalendar from 'v-calendar';
import 'v-calendar/style.css';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi'
  },
})

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
})

// Adiciona um interceptor para incluir o token de autenticação em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

const app = createApp(App)
app.config.globalProperties.$axios = api

app.use(router).use(vuetify).use(VCalendar)



app.mount('#app')











