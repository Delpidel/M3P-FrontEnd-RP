
import { flushPromises, mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'

/* Configuração do vuetify */
import { createVuetify } from 'vuetify' // obrigatório
import * as components from 'vuetify/components' // obrigatório
import * as directives from 'vuetify/directives' // obrigatório

const vuetify = createVuetify({ // obrigatório
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill') // obrigatório

import Meal from './Meal.vue'
import MealService from '@/services/MealService'

describe("Tela cadastro de refeições", () => {

    vi.spyOn(MealService, 'getMealPlans').mockResolvedValue([
        {
            id: 1,
            description: 'emagrecer'
        },
        {
            id: 2,
            description: 'hipertrofia'
        }
    ])

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(Meal, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera-se que os dados do formulário sejam enviados", async () => {

        const spyCreateMeal = vi.spyOn(MealService, 'CreateMeal').mockResolvedValue({})

        const component = mount(Meal, {
            global: {
                plugins: [vuetify]
            },
            data() {
                return {
                    tab: 'one'
                }
            } 
        })

        await flushPromises()

        component.getComponent("[data-test='input-plan']").setValue("1")
        component.getComponent("[data-test='input-hour']").setValue("12:00:00")
        component.getComponent("[data-test='input-title']").setValue("almoço")
        component.getComponent("[data-test='input-description']").setValue("baião")

        component.getComponent("[data-test='submit-button']").trigger("submit")

        expect(spyCreateMeal).toBeCalled()
        
    })

   
})
