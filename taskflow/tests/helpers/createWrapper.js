import { mount } from '@vue/test-utils'

// 테스트에서 mount 호출을 공통화하는 헬퍼
export const createWrapper = (component, options = {}) => {
  return mount(component, options)
}
