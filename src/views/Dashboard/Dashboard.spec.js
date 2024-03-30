import { describe, expect, it, vi } from 'vitest';
import { mount } from '@vue/test-utils'
import Dashboard from './Dashbord.vue'
import DashboardAdmin from '../../components/DashboardAdmin.vue'
import DashboardReceptionist from '../../components/DashboardReceptionist.vue'
import DashboardInstructor from '../../components/DashboardInstructor.vue'
import DashboardNutritionist from '../../components/DashboardNutritionist.vue'
import DashboardStudent from '../../components/DashboardStudent.vue'

describe('Dashboard Component', () => {
  it('Deve renderizar o componente DashboardAdmin se o perfil for ADMIN', async () => {
    const localStorageMock = {
      getItem: vi.spy().andReturn('ADMIN')
    }
    global.localStorage = localStorageMock

    const wrapper = mount(Dashboard)

    expect(wrapper.findComponent(DashboardAdmin).exists()).toBe(true)
    expect(wrapper.findComponent(DashboardReceptionist).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardInstructor).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardNutritionist).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardStudent).exists()).toBe(false)
  })

  it('Deve renderizar o componente DashboardReceptionist se o perfil for RECEPCIONISTA', async () => {
    const localStorageMock = {
      getItem: vi.spy().andReturn('RECEPCIONISTA')
    }
    global.localStorage = localStorageMock

    const wrapper = mount(Dashboard)

    expect(wrapper.findComponent(DashboardAdmin).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardReceptionist).exists()).toBe(true)
    expect(wrapper.findComponent(DashboardInstructor).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardNutritionist).exists()).toBe(false)
    expect(wrapper.findComponent(DashboardStudent).exists()).toBe(false)
  })
})
