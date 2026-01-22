import BaseInput from '@/components/base/BaseInput.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('BaseInput', () => {
  it('renders value and placeholder', () => {
    const wrapper = createWrapper(BaseInput, {
      props: { modelValue: 'Hello', placeholder: 'Type here' }
    })

    expect(wrapper.element.value).toBe('Hello')
    expect(wrapper.attributes('placeholder')).toBe('Type here')
  })

  it('emits update when input changes', async () => {
    const wrapper = createWrapper(BaseInput, {
      props: { modelValue: '' }
    })

    await wrapper.setValue('New value')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New value'])
  })

  it('applies invalid class when invalid is true', () => {
    const wrapper = createWrapper(BaseInput, {
      props: { invalid: true }
    })

    expect(wrapper.classes()).toContain('input--invalid')
  })
})
