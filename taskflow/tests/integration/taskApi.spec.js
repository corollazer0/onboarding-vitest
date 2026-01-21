// @vitest-environment node

describe('taskApi integration', () => {
  let storage

  beforeEach(() => {
    vi.resetModules()
    vi.unmock('@/api/client')
    vi.unmock('@/api/task.api')
    storage = new Map()
    vi.stubGlobal('localStorage', {
      getItem: (key) => (storage.has(key) ? storage.get(key) : null),
      setItem: (key, value) => storage.set(key, value),
      removeItem: (key) => storage.delete(key),
      clear: () => storage.clear()
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('fetches tasks from MSW', async () => {
    const { taskApi } = await import('@/api/task.api')
    const response = await taskApi.getAll()

    expect(response.data).toHaveLength(2)
    expect(response.data[0].title).toBe('Task 1')
  })

  it('creates a task via MSW', async () => {
    const { taskApi } = await import('@/api/task.api')
    const payload = { title: 'New task', completed: false }
    const response = await taskApi.create(payload)

    expect(response.data.title).toBe('New task')
    expect(response.data.id).toBeDefined()
    // TODO: Add update/delete assertions with MSW handlers.
  })
})
