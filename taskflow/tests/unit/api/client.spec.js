import { loadApiClient } from '../../helpers/loadApiClient'

describe('apiClient', () => {
  it('baseURL과 timeout을 설정해야 한다', async () => {
    const apiClient = await loadApiClient()
    expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL)
    expect(apiClient.defaults.timeout).toBe(10000)
  })

  it('기본 JSON 헤더를 설정해야 한다', async () => {
    const apiClient = await loadApiClient()
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
