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
