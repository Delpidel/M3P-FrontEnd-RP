import { flushPromises, mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { concatId } from '@/utils/tests/getComponent'
import { createRouter, createWebHistory } from 'vue-router'; 

import UpdateWorkout from './UpdateWorkout.vue';
import UpdateWorkoutService from '@/services/InstructorServices/UpdateWorkoutService';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/update-workout/:workoutId',
      component: UpdateWorkout,
    },
  ],
});

const vuetify = createVuetify({
  components,
  directives,
});
global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de Atualização de treino', () => {
 
  vi.spyOn(UpdateWorkoutService, 'updateWorkout').mockResolvedValue({ success: true });

  it('Espera-se que a tela seja renderizada', async () => {
    const component = mount(UpdateWorkout, {
      global: {
        plugins: [vuetify],
      },
    });

    await flushPromises();

    expect(component.exists()).toBe(true);
  });

  it('Espera-se que seja enviada corretamente a submissão do formulário', async () => {
    const component = mount(UpdateWorkout, {
      global: {
        plugins: [vuetify, router], 
        mocks: {
          $route: {
            params: {
              id: '1', 
            },
          },
        },
      },
    });

    await flushPromises();

    component.getComponent(concatId('selected-exercise')).setValue(1);
    component.getComponent(concatId('repetitions-input')).setValue(10);
    component.getComponent(concatId('weight-input')).setValue(20.0);
    component.getComponent(concatId('break-input')).setValue(30);
    component.getComponent(concatId('day-input')).setValue('SEGUNDA');
    component.getComponent(concatId('observations-input')).setValue('Observações do treino');

    await component.find(concatId('submission-input')).trigger('submit');

    await flushPromises();

    expect(UpdateWorkoutService.updateWorkout).toBeCalled();
  });

  it('Espera-se uma mensagem de erro ao não enviar corretamente o formulário', async () => {
    vi.spyOn(UpdateWorkoutService, 'updateWorkout').mockRejectedValue();

    const component = mount(UpdateWorkout, {
        global: {
          plugins: [vuetify, router], 
          mocks: {
            $route: {
              params: {
                id: '1', 
              },
            },
          },
        },
      });
  
      await flushPromises();
  
      component.getComponent(concatId('selected-exercise')).setValue(1);
      component.getComponent(concatId('repetitions-input')).setValue("");
      component.getComponent(concatId('weight-input')).setValue(20.0);
      component.getComponent(concatId('break-input')).setValue(30);
      component.getComponent(concatId('day-input')).setValue('SEGUNDA');
      component.getComponent(concatId('observations-input')).setValue('Observações do treino');
  
      await component.find(concatId('submission-input')).trigger('submit');
  
      await flushPromises();
      expect(component.text()).toContain('repetitions must be a `number` type, but the final value was: `NaN` (cast from the value `""`).');
    });
})
