import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

/* Configuração do vuetify */
import { createVuetify } from 'vuetify' // obrigatório
import * as components from 'vuetify/components' // obrigatório
import * as directives from 'vuetify/directives' // obrigatório
import WorkoutsStudentsList from './WorkoutsStudentsList.vue'

const vuetify = createVuetify({ // obrigatório
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill') // obrigatório

/* FIM DA CONFIGURACAO */

it("Espera-se que a tela seja renderizada", () => {
    const component = mount(WorkoutsStudentsList, {
         global: {
             plugins: [vuetify]
         }
     })
     
     expect(component).toBeTruthy()
 })
