import TaskItem from '@/components/TaskItem.vue'
import { createWrapper } from '../../helpers/createWrapper'

describe('TaskItem', () => {
  it('renders task title', () => {
    const wrapper = createWrapper(TaskItem, {
      props: {
        task: { id: 1, title: 'Sample task', completed: false }
      }
    })

    expect(wrapper.text()).toContain('Sample task')
  })
})
