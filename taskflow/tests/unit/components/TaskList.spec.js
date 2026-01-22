import TaskList from '@/components/TaskList.vue'
import { useTaskStore } from '@/stores/task'
import { createWrapper } from '../../helpers/createWrapper'
import { createTestPinia } from '../../helpers/createTestPinia'

describe('TaskList', () => {
  beforeEach(() => {
    createTestPinia()
  })

  it('renders multiple tasks', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'First task', completed: false },
      { id: 2, title: 'Second task', completed: true }
    ]

    const wrapper = createWrapper(TaskList)

    const items = wrapper.findAll('.task-item')
    expect(items).toHaveLength(2)
    expect(wrapper.text()).toContain('First task')
    expect(wrapper.text()).toContain('Second task')
  })
})
