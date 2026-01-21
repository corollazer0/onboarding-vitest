describe('response interceptor', () => {
  let consoleErrorSpy

  beforeEach(() => {
    vi.resetModules()
    vi.unmock('@/api/client')
    vi.unstubAllGlobals()
    localStorage.clear()
  })

  afterEach(() => {
    if (consoleErrorSpy) {
      consoleErrorSpy.mockRestore()
      consoleErrorSpy = null
    }
    vi.unstubAllGlobals()
  })

  it('clears token and redirects on 401', async () => {
    localStorage.setItem('token', 'test-token')
    vi.stubGlobal('location', { href: '' })
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const { default: apiClient } = await import('@/api/client')
    const error = { response: { status: 401 } }

    await expect(
      apiClient.interceptors.response.handlers[0].rejected(error)
    ).rejects.toBe(error)

    expect(localStorage.getItem('token')).toBeNull()
    expect(globalThis.location.href).toBe('/login')
  })

  it('logs network error when response is missing', async () => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { default: apiClient } = await import('@/api/client')
    const error = {}

    await expect(
      apiClient.interceptors.response.handlers[0].rejected(error)
    ).rejects.toBe(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('네트워크 오류가 발생했습니다.')
    // TODO: Add assertions for 403/404/500 status messages.
  })
})
