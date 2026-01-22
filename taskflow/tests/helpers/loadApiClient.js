import { vi } from 'vitest'

export const loadApiClient = async () => {
  vi.resetModules()
  vi.unmock('@/api/client')
  const module = await import('@/api/client')
  return module.default
}
