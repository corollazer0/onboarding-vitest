import { vi } from 'vitest'

// 모듈 캐시를 초기화한 뒤 실제 api/client를 로드하는 헬퍼
export const loadApiClient = async () => {
  vi.resetModules()
  vi.unmock('@/api/client')
  const module = await import('@/api/client')
  return module.default
}
