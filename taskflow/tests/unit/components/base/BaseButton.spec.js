import BaseButton from '@/components/base/BaseButton.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('BaseButton', () => {
  describe('Props', () => {
    it('기본 variant는 primary이어야 한다', () => {
      const wrapper = createWrapper(BaseButton)
      expect(wrapper.classes()).toContain('btn--primary')
    })

    it('variant prop에 따라 클래스가 변경되어야 한다', () => {
      const wrapper = createWrapper(BaseButton, {
        props: { variant: 'danger' }
      })
      expect(wrapper.classes()).toContain('btn--danger')
    })

    it('disabled 상태면 클릭이 불가능해야 한다', () => {
      const wrapper = createWrapper(BaseButton, {
        props: { disabled: true }
      })
      expect(wrapper.attributes('disabled')).toBeDefined()
    })
  })

  describe('Events', () => {
    it('클릭 시 click 이벤트를 emit해야 한다', async () => {
      const wrapper = createWrapper(BaseButton)

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toHaveLength(1)
    })
  })

  describe('Slots', () => {
    it('default slot 내용을 렌더링해야 한다', () => {
      const wrapper = createWrapper(BaseButton, {
        slots: { default: '버튼 텍스트' }
      })
      expect(wrapper.text()).toBe('버튼 텍스트')
    })
  })
})
