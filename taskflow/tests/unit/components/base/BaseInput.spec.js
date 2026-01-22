import { mount } from '@vue/test-utils'
import BaseInput from '@/components/base/BaseInput.vue'

describe('BaseInput', () => {
  it('renders value and placeholder', () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: 'Hello', placeholder: 'Type here' }
    })

    expect(wrapper.element.value).toBe('Hello')
    expect(wrapper.attributes('placeholder')).toBe('Type here')
  })

  it('emits update when input changes', async () => {
    const wrapper = mount(BaseInput, {
      props: { modelValue: '' }
    })

    await wrapper.setValue('New value')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New value'])
  })

  it('applies invalid class when invalid is true', () => {
    const wrapper = mount(BaseInput, {
      props: { invalid: true }
    })

    expect(wrapper.classes()).toContain('input--invalid')
  })
})
