import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount, flushPromises } from '@vue/test-utils';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import DashboardInstructor from './DashboardInstructor.vue';

const vuetify = createVuetify({
  components,
  directives,
});

global.ResizeObserver = require('resize-observer-polyfill');

const mockLocalStorage = {
  getItem: vi.fn(),
};
global.localStorage = mockLocalStorage;

beforeEach(() => {
  vi.mock('axios', () => ({
    default: {
      get: vi.fn(() => Promise.resolve({ data: { registered_students: 5, registered_exercises: 10 } })),
    },
  }));
});

describe('DashboardInstructor', () => {
  it('deve montar o componente', () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    expect(wrapper.exists()).toBeTruthy();
  });

  it('deve renderizar textos estáticos corretamente', () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    expect(wrapper.find('.text-h5').text()).toContain('ALUNOS');
    expect(wrapper.find('.text-h5').text()).toContain('CADASTRADOS');
  
    const exercisesTextContent = wrapper.findAll('.text-h5').at(1).text();
    expect(exercisesTextContent).toContain('EXERCÍCIOS');
    expect(exercisesTextContent).toContain('CADASTRADOS');
  });

  it('deve atualizar o número de alunos e exercícios cadastrados após chamada da API', async () => {
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router: {
            push: vi.fn(),
          },
        },
      },
    });

    await flushPromises();

    const registeredStudentsText = wrapper.find('[data-test="registeredStudents"]').text();
    expect(registeredStudentsText).toContain('5');
    const registeredExercisesText = wrapper.find('[data-test="registeredExercises"]').text();
    expect(registeredExercisesText).toContain('10');
  });

  it('deve redirecionar para a página correta ao clicar nos botões ADICIONAR', async () => {
    const $router = {
      push: vi.fn(),
    };
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router,
        },
      },
    });
  
    await wrapper.find('[data-test="add-students-button"]').trigger('click');
    expect($router.push).toHaveBeenCalledWith('/instructor/students');
  
    await wrapper.find('[data-test="add-exercises-button"]').trigger('click');
    expect($router.push).toHaveBeenCalledWith('/exercises');
  });

  it('deve redirecionar para a página correta ao clicar nos respectivos cards', async () => {
    const $router = {
      push: vi.fn(),
    };
    const wrapper = mount(DashboardInstructor, {
      global: {
        plugins: [vuetify],
        mocks: {
          $router,
        },
      },
    });
  
    await wrapper.find('[data-test="students-card"]').trigger('click');
    expect($router.push).toHaveBeenCalledWith('/instructor/students');
  
    await wrapper.find('[data-test="exercises-card"]').trigger('click');
    expect($router.push).toHaveBeenCalledWith('/exercises');
  });
  
});
