import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

import ExercisesList from './ExercisesList.vue'
import ExerciseService from "@/services/ExerciseService";
import { concatId } from "@/utils/tests/getComponent";

describe("Tela de listagem de exercícios", () => {

    vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue([
            {
                "id": 1,
                "description": "Supino"
            },
            {
                "id": 2,
                "description": "Halter"
            },
            {
                "id": 3,
                "description": "Jump"
            }
        ])

    it("Espera-se que a tela seja renderizada", () => {

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera-se que seja enviado corretamente a submissão do exercício", async () => {

        const spyCreateExercise = vi.spyOn(ExerciseService, 'createExercises').mockResolvedValue({})

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        component.getComponent(concatId("input-description")).setValue("Halter Alternado")
        component.getComponent(concatId("submit-button")).trigger("submit")

        expect(spyCreateExercise).toBeCalledWith({
            "description": "Halter Alternado"
        })
    })

    it("Espera-se que mostre um erro ao enviar o formulário sem a descrição do exercício", async () => {

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        component.getComponent(concatId("submit-button")).trigger("submit")

        await flushPromises()

        expect(component.text()).toContain("Por favor, digite o nome do exercício.")
    })

    it("Espera-se exiba na tela os nomes dos exercícios", async () => {
        const mockedExercises = [
            { "id": 1, "description": "Supino" },
            { "id": 2, "description": "Halter" },
            { "id": 3, "description": "Jump" }
        ]
        vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue(mockedExercises)

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        const renderedDescriptions = component.findAll(concatId("exercise-description"))

        mockedExercises.forEach(exercise => {
            expect(renderedDescriptions.filter(description => description.text() === exercise.description)).toBeTruthy();
        });

    })

})