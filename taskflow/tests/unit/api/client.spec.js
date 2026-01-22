import { loadApiClient } from '../../helpers/loadApiClient'

describe('apiClient', () => {
  it('sets baseURL and timeout', async () => {
    const apiClient = await loadApiClient()
    expect(apiClient.defaults.baseURL).toBe(import.meta.env.VITE_API_BASE_URL)
    expect(apiClient.defaults.timeout).toBe(10000)
  })

  it('sets default JSON headers', async () => {
    const apiClient = await loadApiClient()
    expect(apiClient.defaults.headers['Content-Type']).toBe('application/json')
  })
})
