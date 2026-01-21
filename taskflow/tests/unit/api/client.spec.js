describe('apiClient', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unmock('@/api/client')
  })

  it('sets baseURL and timeout', async () => {
    const { default: apiClient } = await import('@/api/client')
    expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL)
    expect(apiClient.defaults.timeout).toBe(10000)
  })

  it('sets default JSON headers', async () => {
    const { default: apiClient } = await import('@/api/client')
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
