// @vitest-environment node

import { createLocalStorage } from '../helpers/createLocalStorage'

describe('taskApi integration', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unmock('@/api/client')
    vi.unmock('@/api/task.api')
    vi.stubGlobal('localStorage', createLocalStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('MSW로부터 태스크를 가져와야 한다', async () => {
    const { taskApi } = await import('@/api/task.api')
    const response = await taskApi.getAll()

    expect(response.data).toHaveLength(2)
    expect(response.data[0].title).toBe('Task 1')
  })

  it('MSW를 통해 태스크를 생성해야 한다', async () => {
    const { taskApi } = await import('@/api/task.api')
    const payload = { title: 'New task', completed: false }
    const response = await taskApi.create(payload)

    expect(response.data.title).toBe('New task')
    expect(response.data.id).toBeDefined()
    // TODO: Add update/delete assertions with MSW handlers.
  })
})
