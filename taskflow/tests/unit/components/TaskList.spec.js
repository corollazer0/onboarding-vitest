import { mount } from '@vue/test-utils'
import TaskList from '@/components/TaskList.vue'

describe('TaskList', () => {
  it('renders multiple tasks', () => {
    const tasks = [
      { id: 1, title: 'First task', completed: false },
      { id: 2, title: 'Second task', completed: true }
    ]

    const wrapper = mount(TaskList, {
      props: { tasks }
    })

    const items = wrapper.findAll('.task-item')
    expect(items).toHaveLength(2)
    expect(wrapper.text()).toContain('First task')
    expect(wrapper.text()).toContain('Second task')
  })
})
