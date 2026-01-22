import TaskItem from '@/components/TaskItem.vue'
import { createWrapper } from '../../helpers/createWrapper'

describe('TaskItem', () => {
  it('태스크 제목을 렌더링해야 한다', () => {
    const wrapper = createWrapper(TaskItem, {
      props: {
        task: { id: 1, title: 'Sample task', completed: false }
      }
    })

    expect(wrapper.text()).toContain('Sample task')
  })
})
