import { createPinia, setActivePinia } from 'pinia'

// 테스트마다 새로운 Pinia 인스턴스를 활성화하기 위한 헬퍼
export const createTestPinia = () => {
  const pinia = createPinia()
  setActivePinia(pinia)
  return pinia
}
