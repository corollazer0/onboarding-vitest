import { mount } from '@vue/test-utils'
import TaskItem from '@/components/TaskItem.vue'

describe('TaskItem', () => {
  it('renders task title', () => {
    const wrapper = mount(TaskItem, {
      props: {
        task: { id: 1, title: 'Sample task', completed: false }
      }
    })

    expect(wrapper.text()).toContain('Sample task')
  })
})
