import { describe, it, expect, vi } from "vitest";
import ListMeals from './ListMeals.vue'
import { flushPromises, mount } from "@vue/test-utils";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import MealService from "@/services/MealService";
import { concatId } from "@/utils/tests/getComponent";

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela lista de refeições", () => {

    vi.spyOn(MealService, 'GetMealStudent')
        .mockResolvedValue([
            {
                "id": 1,
                "meal_plan_id": 10,
                "title": "Jantar",
                "description": "Sopa de Legumes",
                "hour": "18:00:00",
                "day": "SEGUNDA",
                "student_id": 3,
                "student": {
                    "id": 3,
                    "name": "guilherme",
                }
            }
            
        ])

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(ListMeals, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera que exiba a quantidade de linhas na tabela corretamente", async () => {
        const component = mount(ListMeals, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        expect(component.findAll(concatId("row-table"))).toHaveLength(3)
    })

})
