import { mount } from '@vue/test-utils'

export const createWrapper = (component, options = {}) => {
  return mount(component, options)
}
