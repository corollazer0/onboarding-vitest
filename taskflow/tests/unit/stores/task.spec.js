import { createPinia, setActivePinia } from 'pinia'
import { useTaskStore } from '@/stores/task'

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
