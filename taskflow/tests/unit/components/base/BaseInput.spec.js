import BaseInput from '@/components/base/BaseInput.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('BaseInput', () => {
  it('값과 placeholder를 렌더링해야 한다', () => {
    const wrapper = createWrapper(BaseInput, {
      props: { modelValue: 'Hello', placeholder: 'Type here' }
    })

    expect(wrapper.element.value).toBe('Hello')
    expect(wrapper.attributes('placeholder')).toBe('Type here')
  })

  it('입력이 변경되면 update 이벤트를 emit해야 한다', async () => {
    const wrapper = createWrapper(BaseInput, {
      props: { modelValue: '' }
    })

    await wrapper.setValue('New value')

    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['New value'])
  })

  it('invalid가 true면 invalid 클래스를 적용해야 한다', () => {
    const wrapper = createWrapper(BaseInput, {
      props: { invalid: true }
    })

    expect(wrapper.classes()).toContain('input--invalid')
  })
})
