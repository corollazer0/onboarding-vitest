describe('request interceptor', () => {
  beforeEach(() => {
    vi.resetModules()
    vi.unmock('@/api/client')
    localStorage.clear()
  })

  it('adds Authorization header when token exists', async () => {
    localStorage.setItem('token', 'test-token')
    const { default: apiClient } = await import('@/api/client')

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {}
    })

    expect(config.headers.Authorization).toBe('Bearer test-token')
    // TODO: Assert logging when config.method and config.url are provided.
  })

  it('does not add Authorization header when token is missing', async () => {
    const { default: apiClient } = await import('@/api/client')

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      headers: {}
    })

    expect(config.headers.Authorization).toBeUndefined()
    // TODO: Assert no Authorization header when headers is undefined.
  })
})
