import BaseModal from '@/components/base/BaseModal.vue'
import { createWrapper } from '../../../helpers/createWrapper'

describe('BaseModal', () => {
  it('열림 상태면 슬롯 내용을 렌더링해야 한다', () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: true },
      slots: { default: 'Modal content' }
    })

    expect(wrapper.text()).toContain('Modal content')
  })

  it('닫힘 상태면 내용을 렌더링하지 않아야 한다', () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: false },
      slots: { default: 'Modal content' }
    })

    expect(wrapper.text()).not.toContain('Modal content')
  })

  it('백드롭 클릭 시 close 이벤트를 emit해야 한다', async () => {
    const wrapper = createWrapper(BaseModal, {
      props: { isOpen: true }
    })

    await wrapper.find('.modal__backdrop').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})
