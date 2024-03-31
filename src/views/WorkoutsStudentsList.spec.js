import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

/* Configuração do vuetify */
import { createVuetify } from 'vuetify' // obrigatório
import * as components from 'vuetify/components' // obrigatório
import * as directives from 'vuetify/directives' // obrigatório
import WorkoutsStudentsList from './WorkoutsStudentsList.vue'
import WorkoutsStudentsService from '@/services/WorkoutsStudentsService'

const vuetify = createVuetify({ // obrigatório
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill') // obrigatório

/* FIM DA CONFIGURACAO */


describe("Tela Treinos por estudante",() => {

    vi.spyOn(WorkoutsStudentsService,'workoutsByStudentList').mockResolvedValue([
        {
            "student_id": 5,
            "name": "Henrique Douglas",
            "workouts": {
                "SEGUNDA": [],
                "DOMINGO": [],
                "QUARTA": []
            }
        }
    ])   
}
)

it("Espera-se que a tela seja renderizada", () => {
    const component = mount(WorkoutsStudentsList, {
         global: {
             plugins: [vuetify]
         }
     })
     
     expect(component).toBeTruthy()
 })
 

 it("Espera-se que exiba 2 cards na tela", async () => { // Marcar la función como async
    const component = mount(WorkoutsStudentsList, {
         global: {
             plugins: [vuetify]
         }
     })

     await flushPromises()

     const cards = component.findAll("[data-test='card-item']");
     
     expect(cards).toHaveLength(2)
 })

 

