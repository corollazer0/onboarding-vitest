import TaskForm from '@/components/task/TaskForm.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('TaskForm', () => {
  it('공백을 제거한 제목으로 submit 이벤트를 emit해야 한다', async () => {
    const wrapper = createWrapper(TaskForm)

    await wrapper.find('input').setValue('  New task  ')
    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.emitted('submit')[0]).toEqual(['New task'])
  })

  it('입력이 비어 있으면 검증 상태를 표시해야 한다', async () => {
    const wrapper = createWrapper(TaskForm)

    await wrapper.find('form').trigger('submit.prevent')

    expect(wrapper.find('.input--invalid').exists()).toBe(true)
    // TODO: assert error message once UI copy is added.
  })
})
