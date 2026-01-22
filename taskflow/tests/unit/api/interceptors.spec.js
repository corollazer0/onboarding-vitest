import { loadApiClient } from '../../helpers/loadApiClient'

describe('request interceptor', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('토큰이 있으면 Authorization 헤더를 추가해야 한다', async () => {
    localStorage.setItem('token', 'test-token')
    const apiClient = await loadApiClient()

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      method: 'get',
      url: '/tasks',
      headers: {}
    })

    expect(config.headers.Authorization).toBe('Bearer test-token')
    // TODO: Assert logging when config.method and config.url are provided.
  })

  it('토큰이 없으면 Authorization 헤더를 추가하지 않아야 한다', async () => {
    const apiClient = await loadApiClient()

    const config = await apiClient.interceptors.request.handlers[0].fulfilled({
      method: 'get',
      url: '/tasks',
      headers: {}
    })

    expect(config.headers.Authorization).toBeUndefined()
    // TODO: Assert no Authorization header when headers is undefined.
  })
})
