import { createPinia, setActivePinia } from 'pinia'
import { taskApi } from '@/api/task.api'
import { useTaskStore } from '@/stores/task'

vi.mock('@/api/task.api', () => ({
  taskApi: {
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn()
  }
}))

describe('Task Store - State', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('초기 tasks는 빈 배열이어야 한다', () => {
    const store = useTaskStore()
    expect(store.tasks).toEqual([])
  })

  it('초기 filter는 "all"이어야 한다', () => {
    const store = useTaskStore()
    expect(store.filter).toBe('all')
  })
})

describe('Task Store - Getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('필터가 all이면 모든 태스크를 반환해야 한다', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]

    store.filter = 'all'

    expect(store.filteredTasks).toHaveLength(2)
  })

  it('필터가 completed이면 완료된 태스크만 반환해야 한다', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]

    store.filter = 'completed'

    expect(store.filteredTasks).toEqual([
      { id: 2, title: 'Task 2', completed: true }
    ])
  })

  it('필터가 pending이면 미완료 태스크만 반환해야 한다', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]

    store.filter = 'pending'

    expect(store.filteredTasks).toEqual([
      { id: 1, title: 'Task 1', completed: false }
    ])
  })

  it('completedCount는 완료된 태스크 수를 계산해야 한다', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true },
      { id: 3, title: 'Task 3', completed: true }
    ]

    expect(store.completedCount).toBe(2)
  })

  it('getTaskById는 id에 해당하는 태스크를 반환해야 한다', () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]

    expect(store.getTaskById(2)).toEqual({
      id: 2,
      title: 'Task 2',
      completed: true
    })
  })
})

describe('Task Store - Actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    taskApi.create.mockReset()
    taskApi.update.mockReset()
    taskApi.delete.mockReset()
  })

  it('addTask는 태스크를 tasks 배열에 추가해야 한다', async () => {
    const store = useTaskStore()
    taskApi.create.mockResolvedValue({
      data: { id: 1, title: 'New task', completed: false }
    })

    await store.addTask('New task')

    expect(store.tasks).toHaveLength(1)
    expect(store.tasks[0].title).toBe('New task')
    expect(store.tasks[0].completed).toBe(false)
  })

  it('addTask는 추가된 태스크를 반환해야 한다', async () => {
    const store = useTaskStore()
    taskApi.create.mockResolvedValue({
      data: { id: 2, title: 'Return task', completed: false }
    })

    const result = await store.addTask('Return task')

    expect(result.title).toBe('Return task')
    expect(result.id).toBeDefined()
  })

  it('toggleComplete는 태스크 완료 상태를 토글해야 한다', async () => {
    const store = useTaskStore()
    store.tasks = [{ id: 1, title: 'Task', completed: false }]
    taskApi.update.mockResolvedValue({ data: { success: true } })

    await store.toggleComplete(1)

    expect(store.tasks[0].completed).toBe(true)
  })

  it('deleteTask는 태스크를 tasks 배열에서 제거해야 한다', async () => {
    const store = useTaskStore()
    store.tasks = [
      { id: 1, title: 'Task 1', completed: false },
      { id: 2, title: 'Task 2', completed: true }
    ]
    taskApi.delete.mockResolvedValue({ data: { success: true } })

    await store.deleteTask(1)

    expect(store.tasks).toEqual([
      { id: 2, title: 'Task 2', completed: true }
    ])
  })
})
