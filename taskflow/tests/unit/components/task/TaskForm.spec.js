import { mount } from '@vue/test-utils'
import TaskForm from '@/components/task/TaskForm.vue'

describe('TaskForm', () => {
  it('emits submit with trimmed title', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('input').setValue('  New task  ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')[0]).toEqual(['New task'])
  })

  it('shows validation state when input is empty', async () => {
    const wrapper = mount(TaskForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.input--invalid').exists()).toBe(true)
    // TODO: assert error message once UI copy is added.
  })
})
