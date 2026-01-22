import { config } from '@vue/test-utils'
import { afterAll, afterEach, beforeAll, beforeEach, vi } from 'vitest'
import { server } from './mocks/server'
import { createTestPinia } from './helpers/createTestPinia'

beforeEach(() => {
  createTestPinia()
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
