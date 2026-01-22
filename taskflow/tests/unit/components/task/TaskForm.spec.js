import TaskForm from '@/components/task/TaskForm.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('TaskForm', () => {
  it('emits submit with trimmed title', async () => {
    const wrapper = createWrapper(TaskForm)

    await wrapper.find('input').setValue('  New task  ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')[0]).toEqual(['New task'])
  })

  it('shows validation state when input is empty', async () => {
    const wrapper = createWrapper(TaskForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.input--invalid').exists()).toBe(true)
    // TODO: assert error message once UI copy is added.
  })
})
