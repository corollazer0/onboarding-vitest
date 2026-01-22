import { loadApiClient } from '../../helpers/loadApiClient'

describe('response interceptor', () => {
  let consoleErrorSpy

  beforeEach(() => {
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

  it('401이면 토큰을 삭제하고 /login으로 이동해야 한다', async () => {
    localStorage.setItem('token', 'test-token')
    vi.stubGlobal('location', { href: '' })
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    const apiClient = await loadApiClient()
    const error = { response: { status: 401 } }

    await expect(
      apiClient.interceptors.response.handlers[0].rejected(error)
    ).rejects.toBe(error)

    expect(localStorage.getItem('token')).toBeNull()
    expect(globalThis.location.href).toBe('/login')
  })

  it('response가 없으면 네트워크 에러를 로그해야 한다', async () => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const apiClient = await loadApiClient()
    const error = {}

    await expect(
      apiClient.interceptors.response.handlers[0].rejected(error)
    ).rejects.toBe(error)

    expect(consoleErrorSpy).toHaveBeenCalledWith('네트워크 오류가 발생했습니다.')
    // TODO: Add assertions for 403/404/500 status messages.
  })
})
