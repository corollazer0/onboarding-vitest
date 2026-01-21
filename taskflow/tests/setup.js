import { config } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'
import { server } from './mocks/server'

beforeEach(() => {
  setActivePinia(createPinia())
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

vi.mock('@/api/client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  }
}))

config.global.stubs = {
  teleport: true,
  transition: false
}
