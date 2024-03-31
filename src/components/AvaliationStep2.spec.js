import { describe, expect, it} from 'vitest'
import { flushPromises, mount } from "@vue/test-utils"
import AvaliationStep02 from './AvaliationStep02.vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { concatId } from '@/utils/getComponent'

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Testa página de avaliação", () => {
    it ("Espera-se que a tela seja renderizada", () => {
        const component = mount(AvaliationStep02)
        expect(component).toBeTruthy()
    })
    it("Espera-se que exiba 4 cards na tela", async () => {

        const component = mount(AvaliationStep02, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()
        
        const cards = component.findAll(concatId('card-item'))
        
        expect(cards).toHaveLength(4)
    })

})